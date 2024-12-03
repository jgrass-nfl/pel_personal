import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'

const c_default_answer_time = 3.0;

export class EditMatchesMode extends GameMode
{
  hostContent!: HTMLDivElement;
  // Quiz selection
  quizList: any[];
  quizPageList: string[];
  currentQuizPage: number;
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

  // The current match
  currentMatch: any;
  currentQuiz: any;

  // Host Match
/*  streamStart: Date | null;
  matchStreamDelay!: HTMLInputElement;
  matchStreamTime!: HTMLSpanElement;
  questionList: any[];
  questionListDiv!: HTMLDivElement;
  stageUIList: StageUI[];
  playerList: { [id: string]: PlayerEntry};
  playerUIList!: HTMLDivElement;
  matchPlayInstanceSub: any;
  matchPlayResponseSub: any;
  currentMatchStream: any;*/

  constructor(pelClient: PelClient) {
    super(pelClient);
    this.quizList = [];
    this.quizPageList = [];
    this.currentQuizPage = 0;
    this.matchList = [];
    this.matchPageList = [];
    this.currentMatchPage = 0;

/*    this.questionList = [];
    this.stageUIList = [];

    this.matchPlayInstanceSub = null;
    this.matchPlayResponseSub = null;

    this.streamStart = null;

    this.playerList = { }; */
  }

  enter() {
    this.buildMainUI();
    
    // Look at the current quiz state to decide what to do
    this.buildMatchList();
  }
  update() {
  }
  exit() {
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
        Uib.buildIndexButton("quiz_button", this, 'selectMatch', ind, "Edit"));

        listDiv.append(quizEntry);
    }
    listDiv.append(Uib.buildDiv("spacer_header", ""));
    let actionBar = Uib.buildDiv("pel_two_row",
      Uib.buildButton("login_button", this, 'newMatch', "New Match"),
      Uib.buildDiv("login_entry", ""),          
      Uib.buildButton("login_button", this, 'backToMain', "Exit"));
    listDiv.append(actionBar);
  }
  matchDateString(dateString: string) {
    let curTime = new Date(dateString);
    let curDateString = curTime.getMonth() + "/" + curTime.getDate();
    let curTimeString = curTime.getHours() + ":" + curTime.getMinutes().toString().padStart(2, '0');

    return curDateString + " -- " + curTimeString;
  }
  newMatch() {
    this.buildQuizList();
  }
  buildQuizList() {
    this.hostContent.innerHTML = "Loading quizes...";

    this.loadQuizes(this.hostContent);
  }
  async loadQuizes(listDiv: HTMLDivElement) {
    let nextQuizPageToken: string | null = null;
    if (this.currentQuizPage > 0) {
      nextQuizPageToken = this.quizPageList[this.currentQuizPage - 1];
    }
    const {
      data: quizList,
      nextQuizPage, // Repeat this API call with the nextToken until the returned nextToken is `null`
      errors
    } = await this.pelClient.dbClient.models.Quiz.list({
      limit: 10,
      nextToken: nextQuizPageToken
    });
    this.quizPageList[this.currentQuizPage] = nextQuizPage;
    this.quizList = quizList;

    this.fillQuizListUI(listDiv);
  }
  fillQuizListUI(listDiv: HTMLDivElement) {
    // Build the quiz entries
    listDiv.innerHTML = "";

    listDiv.append(Uib.buildDiv("mode_header", "Select quiz to host:"));

    for (let ind = 0; ind < this.quizList.length; ++ind) {
      let quizEntry = Uib.buildDiv("quizEntry",
        Uib.buildDiv("quiz_title", this.quizList[ind].title),
        Uib.buildDiv("quiz_title", ""),
        Uib.buildIndexButton("quiz_button", this, 'selectQuizForMatch', ind, "Select"));

        listDiv.append(quizEntry);
    }
  }
  selectQuizForMatch(quizIndex: number) {
    let curQuiz = this.quizList[quizIndex];
    this.selectedQuizId = curQuiz.id;

    let curTime = new Date();
    let curDateString = curTime.getMonth() + "/" + curTime.getDate() + "/" + curTime.getFullYear();
    let curTimeString = curTime.getHours() + ":" + curTime.getMinutes().toString().padStart(2, '0');

    this.hostContent.innerHTML = "";

    this.matchNameInput = Uib.buildInput("login_input", "text", 40);
    this.matchAnswerTime = Uib.buildInput("login_input", "text", 40);
    this.matchStartDate = Uib.buildInput("login_input", "text", 40);
    this.matchStartTime = Uib.buildInput("login_input", "text", 40);

    this.matchAnswerTime.value = c_default_answer_time.toFixed(1);
    this.matchStartDate.value = curDateString;
    this.matchStartTime.value = curTimeString;

    let hostMatchDiv = Uib.buildDiv("login_region",
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Quiz"),
        curQuiz.title),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match Name"),
        this.matchNameInput),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match Answer time (Sec)"),
        this.matchAnswerTime),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match start date (MM/DD/YYYY)"),
        this.matchStartDate),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match start time (HH:MM)"),
        this.matchStartTime),
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'createMatch', "Create Match"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'cancelHost', "Cancel")),
      Uib.buildDiv("login_entry", "")
    );

    this.hostContent.append(hostMatchDiv);
  }
  async createMatch() {
    let dateValues = this.matchStartDate.value.split("/");
    let timeValues = this.matchStartTime.value.split(":");
    let curTime = new Date(
        Number.parseInt(dateValues[2]), Number.parseInt(dateValues[0]), Number.parseInt(dateValues[1]), 
        Number.parseInt(timeValues[0]), Number.parseInt(timeValues[1]));
    let curTimeString = curTime.toISOString();
    let answerTime = Number.parseFloat(this.matchAnswerTime.value);
    if (answerTime == 0) {
      answerTime = c_default_answer_time;
    }
    answerTime = Math.floor(answerTime * 1000);

    const { errors, data: newMatch } = await this.pelClient.dbClient.models.Match.create({
      matchState: "open",
      name: this.matchNameInput.value,
      start: curTimeString,
      quizId: this.selectedQuizId,
      answerTime: answerTime,
    });

    console.log("State: " + newMatch.matchState + "Name: " + newMatch.name + "Start: " + newMatch.start);

    this.buildMatchList();
  }
  // Select a match
  async selectMatch(ind: number) {
    this.currentMatch = this.matchList[ind];

    // Get the quiz for the name
    const { data: curQuiz, errors } = await this.pelClient.dbClient.models.Quiz.get({
      id: this.currentMatch.quizId
    });

    this.currentQuiz = curQuiz;

    this.buildMatchUI();
  }
  buildMatchUI() {
    let curTime = new Date(this.currentMatch.start);
    let curDateString = curTime.getMonth() + "/" + curTime.getDate() + "/" + curTime.getFullYear();
    let curTimeString = curTime.getHours() + ":" + curTime.getMinutes().toString().padStart(2, '0');;

    this.hostContent.innerHTML = "";

    this.matchNameInput = Uib.buildInput("login_input", "text", 40);
    this.matchAnswerTime = Uib.buildInput("login_input", "text", 40);
    this.matchStartDate = Uib.buildInput("login_input", "text", 40);
    this.matchStartTime = Uib.buildInput("login_input", "text", 40);

    this.matchNameInput.value = this.currentMatch.name;
    this.matchStartDate.value = curDateString;
    this.matchStartTime.value = curTimeString;
    if (this.currentMatch.answerTime == null) {
      this.matchAnswerTime.value = c_default_answer_time.toFixed(1);
    } else {
      let answerSeconds = this.currentMatch.answerTime / 1000;
      this.matchAnswerTime.value = answerSeconds.toFixed(1);
    }

    let hostMatchDiv = Uib.buildDiv("login_region",
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Quiz"),
        this.currentQuiz.title),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match Name"),
        this.matchNameInput),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match Answer time (Sec)"),
        this.matchAnswerTime),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match start date (MM/DD/YYYY)"),
        this.matchStartDate),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Match start time (HH:MM)"),
        this.matchStartTime),
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_three_row",
        Uib.buildButton("login_button", this, 'backMatch', "Back"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'updateMatch', "Update"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'deleteMatch', "Delete")),
    );

    this.hostContent.append(hostMatchDiv);
  }
  backMatch() {
    this.buildMatchList();
  }
  async updateMatch() {
    let dateValues = this.matchStartDate.value.split("/");
    let timeValues = this.matchStartTime.value.split(":");
    let curTime = new Date(
        Number.parseInt(dateValues[2]), Number.parseInt(dateValues[0]), Number.parseInt(dateValues[1]), 
        Number.parseInt(timeValues[0]), Number.parseInt(timeValues[1]));
    let curTimeString = curTime.toISOString()
    let answerTime = Number.parseFloat(this.matchAnswerTime.value);
    if (answerTime == 0) {
      answerTime = c_default_answer_time;
    }
    answerTime = Math.floor(answerTime * 1000);

    const { errors, data: newMatch } = await this.pelClient.dbClient.models.Match.update({
      id: this.currentMatch.id,
      name: this.matchNameInput.value,
      start: curTimeString,
      answerTime: answerTime,
    });

    console.log("State: " + newMatch.matchState + "Name: " + newMatch.name + "Start: " + newMatch.start);

    this.buildMatchList();

  }
  async deleteMatch() {
    let matchId = this.currentMatch.id;
    const { data: deleteMatch, errors } = await this.pelClient.dbClient.models.Match.delete({
      id: matchId,
    });
    console.log("Deleted match " + deleteMatch.name);

    this.buildMatchList();
  }
  backToMain() {
    this.pelClient.enterMain();
  }
}
