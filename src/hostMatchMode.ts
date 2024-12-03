import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'

class AnswerRecord {
  answer: number;
  time: Date;

  constructor(answer: number, time: Date) {
    this.answer = answer;
    this.time = time;
  }
}

class PlayerEntry {
  matchPlayerInstanceId: string;    // Also use as the index
  playerId: string;
  subId: string;
  inMatch: boolean;
  numCorrectAnswers: number;
  answers: AnswerRecord[];
  playerUIDiv: HTMLDivElement;
  playerNameDiv: HTMLDivElement;
  playerStatusDiv: HTMLDivElement;


  constructor(matchPlayerInstanceId: string, playerId: string, subId: string) {
    this.matchPlayerInstanceId = matchPlayerInstanceId;
    this.playerId = playerId;
    this.subId = subId;
    this.inMatch = true;
    this.answers = [];
    this.numCorrectAnswers = 0;

    this.playerNameDiv = Uib.buildDiv("match_player_name", this.subId);
    this.playerStatusDiv = Uib.buildDiv("match_player_status", "--");
    this.playerUIDiv = Uib.buildDiv("match_player_entry",
        this.playerNameDiv,
        Uib.buildSpan("login_text", ""),
        this.playerStatusDiv
    );
  }
}

class StageUI {
  stageContainer: HTMLDivElement;
  stageButton: HTMLButtonElement;

  constructor(stageContainer: HTMLDivElement, stageButton: HTMLButtonElement) {
    this.stageContainer = stageContainer;
    this.stageButton = stageButton;
    this.stageButton.disabled = true;
  }
  setActive() {
    this.stageButton.disabled = false;
    this.stageContainer.style.backgroundColor = "#add8e6";
  }
  setInactive() {
    this.stageButton.disabled = true;
    this.stageContainer.style.backgroundColor = "#d3d3d3";
  }
};

const c_start_stream_stage_id = 1000;
const c_start_quiz_stage_id = 1001;

const c_end_stage_id = 2000;

const c_num_pre_stages = 2;

const c_default_answer_time = 3.0;
const c_answer_buffer_ms = 500;


export class HostMatchMode extends GameMode
{
  hostContent!: HTMLDivElement;
  // Selected quiz
  selectedQuizId!: string;
  matchNameInput!: HTMLInputElement;
  matchAnswerTime!: HTMLInputElement;
  matchStartDate!: HTMLInputElement;
  matchStartTime!: HTMLInputElement;
  // Match list
  matchList: any[];
  matchPageList: string[];
  currentMatchPage: number;
  // Host Match
  streamStart: Date | null;
  matchStreamDelay!: HTMLInputElement;
  matchStreamTime!: HTMLSpanElement;
  currentMatch: any;
  currentQuiz: any;
  questionList: any[];
  questionTimeStamps: number[];
  questionListDiv!: HTMLDivElement;
  stageUIList: StageUI[];
  playerList: { [id: string]: PlayerEntry};
  playerInMatchUIList!: HTMLDivElement;
  playerOutOfMatchUIList!: HTMLDivElement;
  matchPlayInstanceSub: any;
  matchPlayResponseSub: any;
  currentMatchStream: any;

  constructor(pelClient: PelClient) {
    super(pelClient);
    this.matchList = [];
    this.matchPageList = [];
    this.currentMatchPage = 0;

    this.questionList = [];
    this.questionTimeStamps = [];
    this.stageUIList = [];

    this.matchPlayInstanceSub = null;
    this.matchPlayResponseSub = null;

    this.streamStart = null;

    this.playerList = { };
  }

  enter() {
    this.buildMainUI();
    
    // Look at the current quiz state to decide what to do
    this.buildMatchList();
  }
  update() {
    let timeStamp = this.getStreamTimeStamp();
    if (timeStamp < 0) {
      // Invalid time stamp
      return;
    }
    let timeStampSeconds = timeStamp / 1000.0;
    let timeStampString = timeStampSeconds.toFixed(1);

    this.matchStreamTime.innerHTML = timeStampString;
  }
  getStreamTimeStamp() {
    // The timestamp is in miliseconds 
    if (this.streamStart != null) {
      let curTime = new Date();
      let deltaTime = curTime.getTime() - this.streamStart.getTime();
      return deltaTime;
    }
    return -1;
  }
  exit() {
    this.unsubscribe();
  }
  
  buildMainUI() {
    this.pelClient.clearPane();

    this.hostContent = Uib.buildDiv("pel_text", "Loading...");

    let mainDiv = Uib.buildDiv("main",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("mode_header", "Host Quiz"),
      Uib.buildDiv("spacer_header", ""),
      this.hostContent
    );

    this.appDiv.append(mainDiv);
  }
  buildMatchList() {
    this.loadMatches(this.hostContent);
  }
  async loadMatches(listDiv: HTMLDivElement) {
    let nextMatchPageToken: string | null = null;
    if (this.currentMatchPage > 0) {
      nextMatchPageToken = this.matchPageList[this.currentMatchPage - 1];
    }
    const {
      data: matchList,
      nextMatchPage,
      errors
    } = await this.pelClient.dbClient.models.Match.listByStart({
      matchState: "open",
      limit: 10,
      sortDirection: 'ASC',     // DESC / ASC
      nextToken: nextMatchPageToken
    });
    this.matchPageList[this.currentMatchPage] = nextMatchPage;
    this.matchList = matchList;

    this.fillMatchListUI(listDiv);
  }
  fillMatchListUI(listDiv: HTMLDivElement) {
    // Build the match entries
    listDiv.innerHTML = "";

    for (let ind = 0; ind < this.matchList.length; ++ind) {
      let quizEntry = Uib.buildDiv("matchEntry",
        Uib.buildDiv("quiz_title", this.matchList[ind].name),
        Uib.buildDiv("quiz_title", ""),
        Uib.buildDiv("quiz_title", this.matchDateString(this.matchList[ind].start)),
        Uib.buildDiv("quiz_title", ""),
        Uib.buildIndexButton("quiz_button", this, 'hostMatch', ind, "Host"));

        listDiv.append(quizEntry);
    }
    listDiv.append(Uib.buildDiv("spacer_header", ""));
    let actionBar = Uib.buildDiv("pel_one_row",
      Uib.buildButton("login_button", this, 'backToMain', "Exit"));
    listDiv.append(actionBar);
  }
  matchDateString(dateString: string) {
    let curTime = new Date(dateString);
    let curDateString = curTime.getMonth() + "/" + curTime.getDate();
    let curTimeString = curTime.getHours() + ":" + curTime.getMinutes().toString().padStart(2, '0');

    return curDateString + " -- " + curTimeString;
  }
  cancelHost() {
    this.streamStart = null;
    this.matchStreamTime.innerHTML = "0.0";
    this.unsubscribe();
    this.buildMatchList();
  }
  // Select a match
  async hostMatch(ind: number) {
    this.currentMatch = this.matchList[ind];

    // Get the quiz for the name
    const { data: curQuiz, errors: getQuizErrors } = await this.pelClient.dbClient.models.Quiz.get({
      id: this.currentMatch.quizId
    });
    this.pelClient.dbErrorHandler("Get Quiz", getQuizErrors);
    this.currentQuiz = curQuiz;

    // Get the questions
    const { data: quizQuestions, errors: getQuestionErrors } = await this.pelClient.dbClient.models.Question.list({
      filter: {
        quizId : { eq: this.currentQuiz.id }
      }
    });
    this.pelClient.dbErrorHandler("Get Questons", getQuestionErrors);
    this.questionList = quizQuestions;
    this.questionList.sort((a: any, b: any) => { return a.orderInd - b.orderInd; });
    this.questionTimeStamps = [];

    this.buildHostUI();
  }
  buildHostUI() {
    this.hostContent.innerHTML = "";

    // Quiz name
    // Stages
    // Start (open to players)
    // Closed (no new players)
    // Q1 .. QN
    // End
    // Player list (Sorted by still in on top)
    // Number in / out

    // Build the Host panel UI
    this.questionListDiv = Uib.buildDiv("pel_text", "");

    let startStreamNextButton = Uib.buildIndexButton("login_button", this, 'nextStage', c_start_stream_stage_id, "Start Stream");
    let startStreamStage = Uib.buildDiv("stage_field",
      Uib.buildSpan("stage_text", "Start Video Stream"),
      Uib.buildDiv("spacer_header", ""),
      startStreamNextButton);

    let startQuizNextButton = Uib.buildIndexButton("login_button", this, 'nextStage', c_start_quiz_stage_id, "Start Match");
    let startQuizStage = Uib.buildDiv("stage_field",
      Uib.buildSpan("stage_text", "Start Match"),
      Uib.buildDiv("spacer_header", ""),
      startQuizNextButton);

    let endNextButton = Uib.buildIndexButton("login_button", this, 'nextStage', c_end_stage_id, "Show");
    let endStage = Uib.buildDiv("stage_field",
      Uib.buildSpan("stage_text", "End"),
      Uib.buildDiv("spacer_header", ""),
      endNextButton);

    this.matchStreamDelay = Uib.buildInput("login_input", "text", 40);
    this.matchStreamDelay.value = "10.0";

    this.matchStreamTime = Uib.buildSpan("match_info_time", "0.0");
  
    let hostMatchDiv = Uib.buildDiv("pel_text",
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Match Name"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", this.currentMatch.name)),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Match start "),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", this.matchDateString(this.currentMatch.start))),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Quiz"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", this.currentQuiz.title)),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Answer time (sec)"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", (this.currentMatch.answerTime / 1000).toFixed(1))),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Stream Delay"),
        Uib.buildSpan("match_info_field", ""),
        this.matchStreamDelay),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Stream time"),
        Uib.buildSpan("match_info_field", ""),
        this.matchStreamTime),
      Uib.buildDiv("spacer_header", ""),

      // Stages
      startStreamStage,
      startQuizStage,
      this.questionListDiv,
      endStage,

      // Exit
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'resetMatch', "Reset"),
        Uib.buildDiv("login_entry", ""),
        Uib.buildButton("login_button", this, 'cancelHost', "Exit"),
      ),
    );

    // The player panel UI
    this.playerInMatchUIList = Uib.buildDiv("match_player_list", "");
    this.playerOutOfMatchUIList = Uib.buildDiv("match_player_list", "");

    let hostPanel = Uib.buildDiv("match_panel",
      hostMatchDiv,
      Uib.buildDiv("login_entry", ""),
      Uib.buildDiv("login_entry",
        this.playerInMatchUIList,
        Uib.buildDiv("pel_vert_spacer", ""),
        this.playerOutOfMatchUIList)
    );

    // Build the Stage UI list (for tracking your current stage in the UI)
    this.stageUIList = [];

    this.stageUIList.push(new StageUI(startStreamStage, startStreamNextButton));
    this.stageUIList.push(new StageUI(startQuizStage, startQuizNextButton));
    for (let id = 0; id < this.questionList.length; ++id) {
      this.buildQuestionEntry(id);
    }
    this.stageUIList.push(new StageUI(endStage, endNextButton));

    // Set the first stage (start video stream) active
    this.stageUIList[0].setActive();

    // Add UI to the host content
    this.hostContent.append(hostPanel);
  }
  buildQuestionEntry(id: number) {
    let curQuestion = this.questionList[id];

    let showQuestionButton = Uib.buildIndexButton("login_button", this, 'nextStage', id,
        "Show Q" + (id + 1));
    showQuestionButton.disabled = true;

    let ansFields = [];
    ansFields.push(Uib.buildSpan("host_answer_text", curQuestion.ans1));
    ansFields.push(Uib.buildSpan("host_answer_text", curQuestion.ans2));
    ansFields.push(Uib.buildSpan("host_answer_text", curQuestion.ans3));
    ansFields.push(Uib.buildSpan("host_answer_text", curQuestion.ans4));

    ansFields[curQuestion.correct].style.backgroundColor = "#0ebf35";

    let questionEntry = Uib.buildDiv("host_question_box",
        Uib.buildSpan("host_question_field",
          Uib.buildSpan("login_text", "Qu"),
          Uib.buildSpan("host_question_text", curQuestion.prompt),
          Uib.buildSpan("login_text", ""),
          showQuestionButton),
        Uib.buildDiv("host_answer_field",
          Uib.buildSpan("login_text", "A1"),
          ansFields[0],
          Uib.buildSpan("login_text", ""),
          Uib.buildSpan("login_text", "A2"),
          ansFields[1]),
        Uib.buildDiv("host_answer_field",
          Uib.buildSpan("login_text", "A3"),
          ansFields[2],
          Uib.buildSpan("login_text", ""),
          Uib.buildSpan("login_text", "A4"),
          ansFields[3])
    );
    this.questionListDiv.append(questionEntry);

    this.stageUIList.push(new StageUI(questionEntry, showQuestionButton));
  }
  nextStage(stageId: number) {
    if (stageId == c_start_stream_stage_id) {
      this.stageUIList[0].setInactive();
      this.stageUIList[1].setActive();
      this.hostStartStreamEvent();
    } else if (stageId == c_start_quiz_stage_id) {
      this.stageUIList[1].setInactive();
      this.stageUIList[2].setActive();
      this.hostStartQuizEvent();
    } else if (stageId == c_end_stage_id) {
      this.stageUIList[this.stageUIList.length - 1].setInactive();
      this.hostEndEvent();
    } else {
      this.stageUIList[stageId + c_num_pre_stages].setInactive();
      this.hostQuestionEvent(stageId);
    }
  }
  async clearMatchInfo(name: string, schema: any, clearMatchId: any) {
    let success = true;
    const { data: items, listErrors } = await schema.list({
      filter: {
        matchId : { eq: clearMatchId }
      }
    });
    if ((listErrors != null) && (listErrors.length > 0)) {
      console.log("List (" + name + ") Error: " + listErrors[0].message);
      throw new Error(listErrors[0].message);
      return;
    }
    if (items == null)
    { 
      return;
    }
    for (let item of items) {
      const { data: deletedItem, errors } = await schema.delete({
        id: item.id,
      });
      if ((errors != null) && (errors.length > 0)) {
        console.log("Delete (" + name + ") Error: " + errors[0].message);
        success = false;
      }
      console.log(name + " Deleted " + deletedItem.id);
    }
    if (!success) {
      throw new Error("Delete " + name + " failure");
    }
  }

  async resetMatch() {
    // Clear all of the match info
    // This should reset the match like it never happened

    // Clear the match video stream
    this.clearMatchInfo("MatchVideoStream", this.pelClient.dbClient.models.MatchVideoStream, this.currentMatch.id);
    // Clear the MatchQuestions for the match
    this.clearMatchInfo("MatchQuestion", this.pelClient.dbClient.models.MatchQuestion, this.currentMatch.id);
    // Clear the MatchAnswers for the match
    this.clearMatchInfo("MatchAnswer", this.pelClient.dbClient.models.MatchAnswer, this.currentMatch.id);
    // Clear the MatchPlayInstances for the match
    this.clearMatchInfo("MatchPlayInstance", this.pelClient.dbClient.models.MatchPlayInstance, this.currentMatch.id);
    // Clear the MatchPlayerResponse for the match
    this.clearMatchInfo("MatchPlayerResponse", this.pelClient.dbClient.models.MatchPlayerResponse, this.currentMatch.id);

    // Then cancel out
    this.cancelHost();
  }
  async hostStartStreamEvent() {
    // Send a MatchVideoStrem
    // Here we send a special MatchQuestion that asks everyone to join.  This creates
    // a match play instance for them which is then used for answering questions from
    // that point on
    let curTime = new Date();
    let curTimeString = curTime.toISOString();
    this.streamStart = curTime;

    let delaySecondsString = this.matchStreamDelay.value;
    let delaySeconds = Number.parseFloat(delaySecondsString);
    let delayMilliseconds = Math.floor(delaySeconds * 1000);

    const { errors, data: matchStream } = await this.pelClient.dbClient.models.MatchVideoStream.create({
      matchId: this.currentMatch.id,
      streamState: "active",
      start: curTimeString,
      streamDelay: delayMilliseconds
    });
    if ((errors != null) && (errors.length > 0)) {
      console.log("Error: " + errors[0].message);
      throw new Error(errors[0].message);
    }
    this.currentMatchStream = matchStream;
    console.log("Host Stream Start " + matchStream.id);
    // Subscribe to the Match Play Instance
    this.matchPlayInstanceSub = this.pelClient.dbClient.models.MatchPlayInstance.onCreate({
      filter: {
        matchId: { eq: this.currentMatch.id },
      },
    }).subscribe({
      next: (matchPlayInstance: any) => this.newPlayerAdded(matchPlayInstance),
      error: (error: any) => console.warn(error),
    });
    // Subscribe to the Match Player Response
    this.matchPlayResponseSub = this.pelClient.dbClient.models.MatchPlayerResponse.onCreate({
      filter: {
        matchId: { eq: this.currentMatch.id },
      },
    }).subscribe({
      next: (matchPlayResponse: any) => this.playerResponse(matchPlayResponse),
      error: (error: any) => console.warn(error),
    });
  }
  async hostStartQuizEvent() {
    // Here we send a special MatchQuestion that asks everyone to join.  This creates
    // a match play instance for them which is then used for answering questions from
    // that point on
    const { errors, data: matchQuestion } = await this.pelClient.dbClient.models.MatchQuestion.create({
      matchId: this.currentMatch.id,
      questionIndex: -1,
      timeStamp: this.getStreamTimeStamp(),
      prompt: "Ready?",
      ans1: "Yes!",
    });
    if ((errors != null) && (errors.length > 0)) {
      console.log("Error: " + errors[0].message);
      throw new Error(errors[0].message);
    }
    console.log("Host Quiz Start " + matchQuestion.id);
  }
  async hostEndEvent() {
    const { errors, data: matchStream } = await this.pelClient.dbClient.models.MatchVideoStream.update({
      id: this.currentMatchStream.id,
      streamState: "finished"
    });
    if ((errors != null) && (errors.length > 0)) {
      console.log("Error hostEndEvent(): " + errors[0].message);
      throw new Error(errors[0].message);
    }
    this.streamStart = null;
    console.log("Host Stream closed " + matchStream.id);
  }
  async hostQuestionEvent(questionId: number) {
    // Send the question across
    let curQuestion = this.questionList[questionId];
    let curTimeStamp = this.getStreamTimeStamp();

    this.questionTimeStamps[questionId] = curTimeStamp;

    const { errors: matchQuestionErrors, data: matchQuestion } = await this.pelClient.dbClient.models.MatchQuestion.create({
      matchId: this.currentMatch.id,
      timeStamp: curTimeStamp,
      questionIndex: questionId,
      prompt: curQuestion.prompt,
      ans1: curQuestion.ans1,
      ans2: curQuestion.ans2,
      ans3: curQuestion.ans3,
      ans4: curQuestion.ans4,
    });
    if ((matchQuestionErrors != null) && (matchQuestionErrors.length > 0)) {
      console.log("Error: " + matchQuestionErrors[0].message);
      throw new Error(matchQuestionErrors[0].message);
    }
    console.log("Question " + matchQuestion.prompt);
    // Wait X seconds and then send the answer
    let timer = setInterval(() => {
      this.hostAnswerEvent(questionId);
      clearInterval(timer);
    }, this.currentMatch.answerTime);

    // Don't do this until the timer has elapsed
    this.stageUIList[questionId + c_num_pre_stages + 1].setActive();
  }
  async hostAnswerEvent(questionId: number) {
    let curQuestion = this.questionList[questionId];

    const { errors: matchAnswerErrors, data: matchAnswer } =
        await this.pelClient.dbClient.models.MatchAnswer.create({
            matchId: this.currentMatch.id,
            timeStamp: this.getStreamTimeStamp(),
            questionIndex: questionId,
            correct: curQuestion.correct,
        });
    if ((matchAnswerErrors != null) && (matchAnswerErrors.length > 0)) {
      console.log("Error: " + matchAnswerErrors[0].message);
      throw new Error(matchAnswerErrors[0].message);
    }
    console.log("Answer " + matchAnswer.correct);
  }
  newPlayerAdded(matchPlayInstance: any) {
    let playerEntry = new PlayerEntry(matchPlayInstance.id, matchPlayInstance.playerId, matchPlayInstance.subId);
    this.playerList[playerEntry.matchPlayerInstanceId] = playerEntry;
    this.playerInMatchUIList.append(playerEntry.playerUIDiv);
  }
  playerResponse(matchPlayResponse: any) {
    let playerEntry = this.playerList[matchPlayResponse.matchPlayInstanceId];
    if (playerEntry == null) {
      return;
    }
    if (this.streamStart == null) {
      return;
    }
    // Calculate the time stamp
    let responseTimeDate = new Date(matchPlayResponse.responseTime);
    let answerTimeStamp = responseTimeDate.getTime() - (this.streamStart.getTime() + this.currentMatchStream.streamDelay);
    console.log("Response " + playerEntry.subId + " Que #" + matchPlayResponse.questionIndex + " Answer= " + matchPlayResponse.answer + " TimeStamp = " + answerTimeStamp);
      //" Time = " + matchPlayResponse.responseTime);
    playerEntry.answers[matchPlayResponse.questionIndex] = new AnswerRecord(matchPlayResponse.answer, matchPlayResponse.responseTime);
    let curQuestion = this.questionList[matchPlayResponse.questionIndex];
    let questionTimeStamp = this.questionTimeStamps[matchPlayResponse.questionIndex];
    let deadlineTimeStamp = questionTimeStamp + this.currentMatch.answerTime + c_answer_buffer_ms;

    let questionIdOneBase = matchPlayResponse.questionIndex + 1;

    if ((matchPlayResponse.answer == curQuestion.correct) &&
        (answerTimeStamp >= questionTimeStamp) &&
        (answerTimeStamp <= deadlineTimeStamp))
    {
      ++playerEntry.numCorrectAnswers;
      if (playerEntry.inMatch)
      {
        playerEntry.playerStatusDiv.innerHTML = playerEntry.numCorrectAnswers + "/" + questionIdOneBase;
      }
    }
    else
    {
      if (playerEntry.inMatch) {
        playerEntry.inMatch = false;
        playerEntry.playerUIDiv.remove();
        this.playerOutOfMatchUIList.append(playerEntry.playerUIDiv);

        playerEntry.playerStatusDiv.innerHTML = "Out Q" + questionIdOneBase + "(" + matchPlayResponse.answer + ")";
      }
    }
  }
  unsubscribe() {
    if (this.matchPlayInstanceSub != null) {
      this.matchPlayInstanceSub.unsubscribe();
      this.matchPlayInstanceSub = null;
    }
    if (this.matchPlayResponseSub != null) {
      this.matchPlayResponseSub.unsubscribe();
      this.matchPlayResponseSub = null;
    }
  }
  backToMain() {
    this.pelClient.enterMain();
  }
}
