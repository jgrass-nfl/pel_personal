import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'
import { buildCallback } from './utils.ts'

const c_random_names = [
  "Agatha Quiztie",             "Risky Quizness",         "Merry Quizmass",
  "You're A Quizzard Harry",    "Quizpicable Me",         "Designated Quizzers",
  "Whiskeypedia",               "Quiztopher Walken",      "Know it Ales",
  "E For Idiot",                "The Wise Quackers",      "Phil and the Blanks",
  "The Quiz-inator",            "Let's Get Quizzical",    "Brain or Shine",
];

export class PlayQuizMode extends GameMode
{
  playerIdInput!: HTMLInputElement;
  clientContent!: HTMLDivElement;
  streamCreateSub: any;
  streamUpdateSub: any;
  streamDeleteSub: any;
  streamingMatch!: HTMLDivElement;
  currentMatchVideoStream: any;
  currentMatchVideoStreamStart: Date | null;
  currentMatch: any;
  playerId: string;
  matchPlayInstanceId: string;
  matchStreamTime!: HTMLSpanElement;
  statusLabelDiv!: HTMLDivElement;
  quizContent!: HTMLDivElement;
  matchQuestionSub: any;
  matchAnswerSub: any;
  questionTimerLabel!: HTMLDivElement;
  answerButtons: HTMLButtonElement[];
  playerAnswer: number;
  matchQuestionQueue: any[];
  matchAnswerQueue: any[];
  currentQuestionIndex: number;
  currentQuestionTimeStamp: number;
  questionSecondsLeft: number;
  inMatch: boolean;
  numCorrentAnswers: number;

  constructor(pelClient: PelClient) {
    super(pelClient);
    this.playerId = "";
    this.matchPlayInstanceId = "";
    this.currentMatchVideoStreamStart = null;
    this.answerButtons = [];
    this.playerAnswer = -1;
    this.matchQuestionQueue = [];
    this.matchAnswerQueue = [];
    this.currentQuestionIndex = -1;
    this.currentQuestionTimeStamp = -1;
    this.questionSecondsLeft = 0;
    this.inMatch = true;
    this.numCorrentAnswers = 0;
  }

  enter() {
    this.playerId = c_random_names[Math.floor(Math.random() * c_random_names.length)];

    this.buildMainUI();

    this.buildActiveMatchList();

    this.subscribeToActiveStreams();
    this.addCurrentActiveStreams();
  }
  update() {
    if (this.currentMatchVideoStreamStart == null)
    {
      return ;
    }
    // Show the timestamp string
    let timeStamp = this.getStreamTimeStamp();
    let timeStampSeconds = timeStamp / 1000.0;
    let timeStampString = timeStampSeconds.toFixed(1);
    this.matchStreamTime.innerHTML = timeStampString;
    // Check to display any questions
    if (this.matchQuestionQueue.length > 0) {
      if (timeStamp >= this.matchQuestionQueue[0].timeStamp) {
        let newQuestion = this.matchQuestionQueue[0];
        this.matchQuestionQueue.splice(0, 1);
        this.currentQuestionIndex = newQuestion.questionIndex;
        this.currentQuestionTimeStamp = newQuestion.timeStamp;
        this.displayQuestion(newQuestion);
      }
    }
    // Display the question timer
    if (this.currentQuestionTimeStamp != -1) {
      let secondsLeft = Math.floor((this.currentMatch.answerTime - (timeStamp - this.currentQuestionTimeStamp)) / 1000);
      if (secondsLeft < 0) {
        secondsLeft = 0;
      }
      if (secondsLeft != this.questionSecondsLeft) {
        this.questionSecondsLeft = secondsLeft;
        this.questionTimerLabel.innerHTML = this.questionSecondsLeft.toString();
      }
    }
    // Check to display the answer
    if (this.matchAnswerQueue.length > 0) {
      if (timeStamp >= this.matchAnswerQueue[0].timeStamp) {
        let newAnswer = this.matchAnswerQueue[0];
        this.matchAnswerQueue.splice(0, 1);
        this.displayAnswer(newAnswer);
      }
    }
  }
  getStreamTimeStamp() {
    // The timestamp is in miliseconds 
    if (this.currentMatchVideoStreamStart == null)
    {
      throw new Error("Invalid access to stream time stamp");
      return 0;
    }
  
    let curTime = new Date();
    let deltaTime = curTime.getTime() - this.currentMatchVideoStreamStart.getTime();
    deltaTime -= this.currentMatchVideoStream.streamDelay;
    return deltaTime;
  }
  exit() {
  }
  
  buildMainUI() {
    this.clientContent = Uib.buildDiv("pel_text", "");

    this.playerIdInput = Uib.buildInput("login_input", "text", 40);
    this.playerIdInput.value = this.playerId;

    this.pelClient.clearPane();
    let mainDiv = Uib.buildDiv("main",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("mode_header", "Play Quiz"),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Player ID"),
        this.playerIdInput),
      Uib.buildDiv("spacer_header", ""),
      this.clientContent,
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_one_row",
        Uib.buildButton("login_button", this, 'backToMain', "Exit")),
    );

    this.appDiv.append(mainDiv);
  }
  buildActiveMatchList() {
    this.clientContent.innerHTML = "";

    this.streamingMatch = Uib.buildDiv("pel_text", "");
    this.clientContent.append(this.streamingMatch);
  }
  subscribeToActiveStreams() {
    this.streamCreateSub = this.pelClient.dbClient.models.MatchVideoStream.onCreate({
      filter: {
        streamState: { eq: "active" },
      },
    }).subscribe({
      next: (data: any) => this.newStreamAdded(data),
      error: (error: any) => console.warn(error),
    });
  }
  async addCurrentActiveStreams() {
    const { data: matchVideoStreams } = await this.pelClient.dbClient.models.MatchVideoStream.list({
      filter: {
        streamState: { eq: "active" },
      }
    });

    for (let matchVideoStream of matchVideoStreams) {
      this.addActiveStream(matchVideoStream);
    }
  }
  newStreamAdded(matchVideoStream: any)
  {
    this.addActiveStream(matchVideoStream);
  }
  async addActiveStream(matchVideoStream: any) {
    // Get the match for the name
    const { data: curMatch, errors } = await this.pelClient.dbClient.models.Match.get({
      id: matchVideoStream.matchId
    });
    this.pelClient.dbErrorHandler("Match Get", errors);

    let joinMatchButton = Uib.buildButtonCB("login_button", 
        buildCallback(this, 'joinMatch', matchVideoStream), "Join");

    let newStreamDiv = Uib.buildDiv("client_match_list",
      Uib.buildSpan("stage_text", curMatch.name),
      Uib.buildDiv("spacer_header", ""),
      joinMatchButton);

      this.streamingMatch.append(newStreamDiv);
  }
  async joinMatch(matchVideoStream: any) {
    this.unsubscribeCreate();
    this.currentMatchVideoStream = matchVideoStream;
    this.playerId = this.playerIdInput.value;
    this.playerIdInput.readOnly = true;
    this.inMatch = true;
    this.numCorrentAnswers = 0;
    // Get the match
    const { data: curMatch, matchErrors } = await this.pelClient.dbClient.models.Match.get({
      id: matchVideoStream.matchId
    });
    this.pelClient.dbErrorHandler("Match Get", matchErrors);
    this.currentMatch = curMatch;

    // Add the player instance
    const { data: matchPlayInstance, matchPlayInstanceErrors } = await this.pelClient.dbClient.models.MatchPlayInstance.create({
      matchId: this.currentMatch.id,
      playerId: this.pelClient.userId,
      subId: this.playerId,
    });
    this.pelClient.dbErrorHandler("Create MatchPlayInstance", matchPlayInstanceErrors);
    this.matchPlayInstanceId = matchPlayInstance.id;

    // Subscribe to the Match Question from the host
    this.matchQuestionSub = this.pelClient.dbClient.models.MatchQuestion.onCreate({
      filter: {
        matchId: { eq: this.currentMatch.id },
      },
    }).subscribe({
      next: (matchQuestion: any) => this.onQuestionFromHost(matchQuestion),
      error: (error: any) => console.warn(error),
    });
    // Subscribe to the Match Answer from the host
    this.matchAnswerSub = this.pelClient.dbClient.models.MatchAnswer.onCreate({
      filter: {
        matchId: { eq: this.currentMatch.id },
      },
    }).subscribe({
      next: (matchAnswer: any) => this.onAnswerFromHost(matchAnswer),
      error: (error: any) => console.warn(error),
    });
    // Build the client match interface
    this.quizContent = Uib.buildDiv("pel_text", "Waiting...");

    this.clientContent.innerHTML = "";

    this.matchStreamTime = Uib.buildSpan("match_info_time", "0.0");

    this.statusLabelDiv = Uib.buildDiv("mode_header", "Welcome!  We're waiting for the first question.");

    let playMatchDiv = Uib.buildDiv("pel_text",
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Match Name"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", this.currentMatch.name)),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Answer time (sec)"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", (this.currentMatch.answerTime / 1000).toFixed(1))),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Stream Delay"),
        Uib.buildSpan("match_info_field", ""),
        Uib.buildSpan("match_info_text", (this.currentMatchVideoStream.streamDelay / 1000).toFixed(1))),
      Uib.buildDiv("match_info_field",
        Uib.buildSpan("match_info_field", "Stream time"),
        Uib.buildSpan("match_info_field", ""),
        this.matchStreamTime),
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("spacer_header", ""),
      this.statusLabelDiv,
      Uib.buildDiv("spacer_header", ""),
      this.quizContent);

      this.clientContent.append(playMatchDiv);

      // Start the timer
      this.currentMatchVideoStreamStart = new Date(this.currentMatchVideoStream.start);
  }
  onQuestionFromHost(matchQuestion: any) {
    this.matchQuestionQueue.push(matchQuestion);
  }
  displayQuestion(matchQuestion: any) {
    // Build the question, answers, and timer
    this.quizContent.innerHTML = "";

    // Questions and timer
    this.questionTimerLabel = Uib.buildDiv("client_time_value", "0");
    this.questionSecondsLeft = 0;

    let questionText = "Question " + (this.currentQuestionIndex + 1);

    let questionArea = Uib.buildDiv("client_question_area",
        Uib.buildDiv("client_question_box",
          Uib.buildDiv("client_question_number", questionText),
          Uib.buildDiv("client_question_text", matchQuestion.prompt)),
        Uib.buildDiv("spacer_header", ""),
        Uib.buildDiv("client_timer_box",
          Uib.buildDiv("client_time_label", "Time Left"),
          this.questionTimerLabel));

    this.quizContent.append(questionArea);

    // Answer buttons
    this.playerAnswer = -1;
    this.answerButtons = [];

    this.answerButtons.push(Uib.buildIndexButton("client_answer_button", this, 'sendClientAnswer', 0, matchQuestion.ans1));
    if ((matchQuestion.ans2 == null) || (matchQuestion.ans2 === "")) {
      // One answer
      this.quizContent.append(Uib.buildDiv("client_answer_one_area", this.answerButtons[0]));
    } else {
      this.answerButtons.push(Uib.buildIndexButton("client_answer_button", this, 'sendClientAnswer', 1, matchQuestion.ans2));
      this.quizContent.append(Uib.buildDiv("client_answer_two_area",
          this.answerButtons[0],
          Uib.buildDiv("spacer_header", ""),
          this.answerButtons[1]
        ));
      if (!((matchQuestion.ans3 == null) || (matchQuestion.ans3 === ""))) {
        this.answerButtons.push(Uib.buildIndexButton("client_answer_button", this, 'sendClientAnswer', 2, matchQuestion.ans3));
        if ((matchQuestion.ans2 == null) || (matchQuestion.ans2 === "")) {
          // Three answers
          this.quizContent.append(Uib.buildDiv("client_answer_one_area", this.answerButtons[2]));    
        } else {
          // Four answers
          this.answerButtons.push(Uib.buildIndexButton("client_answer_button", this, 'sendClientAnswer', 3, matchQuestion.ans4));
          this.quizContent.append(Uib.buildDiv("client_answer_two_area",
              this.answerButtons[2],
              Uib.buildDiv("spacer_header", ""),
              this.answerButtons[3]
            ));    
        }
      }
    }
  }
  async sendClientAnswer(selectedAnswer: number) {
    if (this.currentQuestionIndex == -1) {
      this.statusLabelDiv.innerHTML = "Great! Everyone gets this first one right.";
      this.answerButtons[0].style.backgroundColor = "#0ebf35";
      return;
    }
    
    let callTime = new Date();

    this.playerAnswer = selectedAnswer;
    // Lock and color the buttons
    for (let ind = 0; ind < this.answerButtons.length; ++ind) {
      this.answerButtons[ind].disabled = true;
      if (ind != selectedAnswer) {       
        this.answerButtons[ind].style.backgroundColor = "#d3d3d3";
      }
    }

    const { errors, data: result } =
        await this.pelClient.dbClient.queries.clientAnswerFn({
          matchId: this.currentMatch.id,
          matchPlayInstanceId: this.matchPlayInstanceId,
          questionIndex: this.currentQuestionIndex,
          answer: selectedAnswer,
        });
    console.log("Result: " + result);
    this.pelClient.dbErrorHandler("Call clientAnswerFn", errors);

    let returnTime = new Date();

    let responseTime = returnTime.getTime() - callTime.getTime();
    console.log("responseTime: " + responseTime);
  }
  onAnswerFromHost(matchAnswer: any) {
    this.matchAnswerQueue.push(matchAnswer);
  }
  displayAnswer(matchAnswer: any) {
    for (let ind = 0; ind < this.answerButtons.length; ++ind) {
      this.answerButtons[ind].disabled = true;
      if (ind == matchAnswer.correct) {
        if (this.playerAnswer == matchAnswer.correct) {
          // Bright green - YOU GOT IT!
          this.answerButtons[ind].style.backgroundColor = "#0ebf35";
        } else {
          // Dark green - Sorry
          this.answerButtons[ind].style.backgroundColor = "#116122";
        }
      } else {
        if (ind == this.playerAnswer) {
          // Dark red - Incorrect player answer
          this.answerButtons[ind].style.backgroundColor = "#780707";
        } else {
          // Incorrect answer that you didn't select - gray
          this.answerButtons[ind].style.backgroundColor = "#d3d3d3";
        }
      }
    }
    // Change the game state
    if (this.playerAnswer == matchAnswer.correct) {
      ++this.numCorrentAnswers;
      if (this.inMatch) {
        this.statusLabelDiv.innerHTML = "That's right.  Fantastic, you're " + this.numCorrentAnswers + " for " + (this.currentQuestionIndex + 1);
      } else {
        this.statusLabelDiv.innerHTML = "You're out of the running but you've still gotten " + this.numCorrentAnswers + " out of " + (this.currentQuestionIndex + 1);
      }
    } else {
      this.inMatch = false;
      this.statusLabelDiv.innerHTML = "Oh, too bad!  Your now " + this.numCorrentAnswers + " out of " + (this.currentQuestionIndex + 1);
    }
  }
  unsubscribeCreate() {
    if (this.streamCreateSub != null) {
      this.streamCreateSub.unsubscribe();
      this.streamCreateSub = null;
    }
  }
  unsubscribe() {
    this.unsubscribeCreate();
    if (this.matchQuestionSub != null) {
      this.matchQuestionSub.unsubscribe();
      this.matchQuestionSub = null;
    }
    if (this.matchAnswerSub != null) {
      this.matchAnswerSub.unsubscribe();
      this.matchAnswerSub = null;
    }
  }
  backToMain() {
    this.unsubscribe();
    this.pelClient.enterMain();
  }
}
