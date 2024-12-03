import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'

import { buildCallback } from './utils.ts'

class QuizQuestionUI {
  containerDiv!: HTMLDivElement;
  question!: HTMLTextAreaElement;
  ans1!: HTMLInputElement;
  ans2!: HTMLInputElement;
  ans3!: HTMLInputElement;
  ans4!: HTMLInputElement;
  checkList: HTMLInputElement[];
  checkIndex: number;
  questionDBId: string | null;

  constructor() {
    this.checkIndex = 0;
    this.checkList = [];
    this.questionDBId = null;
  }
  checkToggle(index: number) {
    for (let ind = 0; ind < this.checkList.length; ++ind) {
      if (ind == index) {
        this.checkList[ind].checked = true;
      } else {
        this.checkList[ind].checked = false;
      }
    }
    this.checkIndex = index;
  }
}

export class EditQuizesMode extends GameMode
{
  quizListDiv!: HTMLDivElement;
  quizList: any[];
  quizPageList: string[];
  currentQuizPage: number;
  quizNameInput!: HTMLInputElement;
  questionListDiv!: HTMLDivElement;
  currentQuizId: string | null;
  questionUIList: QuizQuestionUI[];
  questionDeleteList: string[];
  
  constructor(pelClient: PelClient) {
    super(pelClient);
    this.quizList = [];
    this.quizPageList = [];
    this.currentQuizPage = 0;
    this.currentQuizId = null;
    this.questionUIList = [];
    this.questionDeleteList = [];
  }

  enter() {
    this.buildCreateQuizUI();
    this.quizPageList = [];
    this.currentQuizPage = 0;
  }
  update() {
  }
  exit() {
  }
  
  buildCreateQuizUI() {
    this.pelClient.clearPane();

    this.quizListDiv = Uib.buildDiv("pel_text", "");

    let mainDiv = Uib.buildDiv("main",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("mode_header", "Create Quiz"),
      this.quizListDiv,
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'newQuiz', "New Quiz"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'backToMain', "Exit")),
    );

    this.appDiv.append(mainDiv);

    this.loadQuizes();
  }
  async loadQuizes() {
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

    this.buildQuizList();
  }
  buildQuizList() {
    // Build the quiz entries
    this.quizListDiv.innerHTML = "";

    for (let ind = 0; ind < this.quizList.length; ++ind) {
      let quizEntry = Uib.buildDiv("quizEntry",
        Uib.buildDiv("quiz_title", this.quizList[ind].title),
        Uib.buildDiv("quiz_title", ""),
        Uib.buildIndexButton("quiz_button", this, 'editQuiz', ind, "Edit"));

        this.quizListDiv.append(quizEntry);
    }
  }
  buildQuestion(questionListDiv: HTMLDivElement) {
    let quizQuestionUI = new QuizQuestionUI();

    quizQuestionUI.question = Uib.buildTextArea("quiz_question", 3);
    quizQuestionUI.ans1 = Uib.buildInput("answer_input", "text", 40);
    quizQuestionUI.ans2 = Uib.buildInput("answer_input", "text", 40);
    quizQuestionUI.ans3 = Uib.buildInput("answer_input", "text", 40);
    quizQuestionUI.ans4 = Uib.buildInput("answer_input", "text", 40);

    for (let checkInd = 0; checkInd < 4; ++checkInd) {
      quizQuestionUI.checkList.push(Uib.buildRadio("answer_radio", quizQuestionUI, 'checkToggle', checkInd));
    }

    quizQuestionUI.containerDiv = Uib.buildDiv("question_box",
      Uib.buildDiv("question_field",
        Uib.buildSpan("login_text", "Question"),
        quizQuestionUI.question,
        Uib.buildButtonCB("login_button", buildCallback(this, 'questionUp', quizQuestionUI), "Move Up"),
        Uib.buildButtonCB("login_button", buildCallback(this, 'questionDown', quizQuestionUI), "Move Down"),
        Uib.buildButtonCB("login_button", buildCallback(this, 'questionDelete', quizQuestionUI), "Delete")),
      Uib.buildDiv("answer_field",
        Uib.buildSpan("login_text", "Answer 1"),
        quizQuestionUI.ans1,
        quizQuestionUI.checkList[0],
        Uib.buildSpan("login_text", ""),
        Uib.buildSpan("login_text", "Answer 2"),
        quizQuestionUI.ans2,
        quizQuestionUI.checkList[1]),
      Uib.buildDiv("answer_field",
        Uib.buildSpan("login_text", "Answer 3"),
        quizQuestionUI.ans3,
        quizQuestionUI.checkList[2],
        Uib.buildSpan("login_text", ""),
        Uib.buildSpan("login_text", "Answer 4"),
        quizQuestionUI.ans4,
        quizQuestionUI.checkList[3]));
    
    questionListDiv.append(quizQuestionUI.containerDiv);

    return quizQuestionUI;
  }
  newQuiz() {
    this.currentQuizId = null;
    this.questionDeleteList = [];
    this.buildQuizUI(0);
  }
  async editQuiz(quizIndex: number) {
    // Load the questions
    let curQuiz = this.quizList[quizIndex];
    this.currentQuizId = curQuiz.id;
    this.questionDeleteList = [];

    const { data: quizQuestions, errors } = await this.pelClient.dbClient.models.Question.list({
      filter: {
        quizId : { eq: this.currentQuizId }
      }
    });

    // Build the UI
    this.buildQuizUI(quizQuestions.length);
    // Populate the UI
    this.quizNameInput.value = curQuiz.title;
    for (let ind = 0; ind < quizQuestions.length; ++ind) {
      let questionOrder = quizQuestions[ind].orderInd;
      this.setQuestionUI(quizQuestions[ind], this.questionUIList[questionOrder]);
    }
  }
  buildQuizUI(numQuestions: number) {
    this.pelClient.clearPane();

    this.quizNameInput = Uib.buildInput("login_input", "text", 40);

    this.questionListDiv = Uib.buildDiv("pel_text", "");

    let mainDiv = Uib.buildDiv("main",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("mode_header", "Create Quiz"),
      Uib.buildDiv("quiz_name_field",
        Uib.buildSpan("login_text", "Quiz Name"),
        this.quizNameInput),
      this.questionListDiv,
      Uib.buildDiv("pel_one_row",
        Uib.buildButton("login_button", this, 'addQuestion', "Add Question")),
      Uib.buildDiv("spacer_header", "")
    );

    if (this.currentQuizId == null) {
      let createActions = Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'createUpdateQuiz', "Create"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'cancelCreate', "Cancel"));
      mainDiv.append(createActions);
    } else {
      let createActions = Uib.buildDiv("pel_three_row",
        Uib.buildButton("login_button", this, 'createUpdateQuiz', "Update"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'cancelCreate', "Cancel"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'deleteQuiz', "Delete"),
      );
      mainDiv.append(createActions);
    }

    this.appDiv.append(mainDiv);

    this.questionUIList = [];
    for (let ind = 0; ind < numQuestions; ++ind) {
      this.questionUIList.push(this.buildQuestion(this.questionListDiv));
    }
  }
  addQuestion() {
    this.questionUIList.push(this.buildQuestion(this.questionListDiv));
  }
  setQuestionUI(quizQuestion: any, questionUI: QuizQuestionUI) {
    questionUI.question.value = quizQuestion.prompt;
    questionUI.ans1.value = quizQuestion.ans1;
    questionUI.ans2.value = quizQuestion.ans2;
    questionUI.ans3.value = quizQuestion.ans3;
    questionUI.ans4.value = quizQuestion.ans4;
    questionUI.checkIndex = quizQuestion.correct;
    for (let ind = 0; ind < questionUI.checkList.length; ++ind) {
      questionUI.checkList[ind].checked = (ind == quizQuestion.correct);
    }
    questionUI.questionDBId = quizQuestion.id;
  }

  async createUpdateQuiz() {
    if (this.currentQuizId == null) {
      const { errors, data: newQuiz } = await this.pelClient.dbClient.models.Quiz.create({
        title: this.quizNameInput.value,
      });

      console.log("Write Quiz " + newQuiz.id);
    } else {
      const { errors, data: newQuiz } = await this.pelClient.dbClient.models.Quiz.update({
        id: this.currentQuizId,
        title: this.quizNameInput.value,
      });

      console.log("Update Quiz " + newQuiz.id);
    }
    if (this.currentQuizId != null) {
      // Save the questions
      for (let ind = 0; ind < this.questionUIList.length; ++ind) {
        let questionUI = this.questionUIList[ind];
        this.createUpdateQuestion(this.currentQuizId, ind, questionUI);
      }
    }
    // Remove the delete question list
    for (let questionID in this.questionDeleteList) {
      const { data: deleteQuestion, errors } = await this.pelClient.dbClient.models.Question.delete({
        id: questionID,
      });
      console.log("Deleted question " + deleteQuestion.id);
    }
    this.questionDeleteList = [];
    // Move back the main quiz UI
    this.buildCreateQuizUI();
  }
  async createUpdateQuestion(inQuizId: string, inOrderInd: number, quizQuestionUI: QuizQuestionUI) {
    if (quizQuestionUI.questionDBId != null) {
      const { errors, data: newQuestion } = await this.pelClient.dbClient.models.Question.update({
        id: quizQuestionUI.questionDBId,
        quizId: inQuizId,
        orderInd: inOrderInd,
        prompt: quizQuestionUI.question.value,
        ans1: quizQuestionUI.ans1.value,
        ans2: quizQuestionUI.ans2.value,
        ans3: quizQuestionUI.ans3.value,
        ans4: quizQuestionUI.ans4.value,
        correct: quizQuestionUI.checkIndex,
      });

      console.log("Update question " + newQuestion.id);
    } else {
      const { errors, data: newQuestion } = await this.pelClient.dbClient.models.Question.create({
        quizId: inQuizId,
        orderInd: inOrderInd,
        prompt: quizQuestionUI.question.value,
        ans1: quizQuestionUI.ans1.value,
        ans2: quizQuestionUI.ans2.value,
        ans3: quizQuestionUI.ans3.value,
        ans4: quizQuestionUI.ans4.value,
        correct: quizQuestionUI.checkIndex,
      });

      console.log("Wrote question " + newQuestion.id);
    }
  }
  updateQuestion(inQuizId: string, inOrderInd: number, quizQuestionUI: QuizQuestionUI) {
    this.pelClient.dbClient.models.Question.create({
      quizId: inQuizId,
      orderInd: inOrderInd,
      prompt: quizQuestionUI.question.value,
      ans1: quizQuestionUI.ans1.value,
      ans2: quizQuestionUI.ans2.value,
      ans3: quizQuestionUI.ans3.value,
      ans4: quizQuestionUI.ans4.value,
      correct: quizQuestionUI.checkIndex,
    })
  }
  cancelCreate() {
    this.buildCreateQuizUI();
  }
  async deleteQuiz() {
    // Delete all the questions
    for (let ind = 0; ind < this.questionUIList.length; ++ind) {
      let questionUI = this.questionUIList[ind];
      if (questionUI.questionDBId != null) {
        const { data: deleteQuestion, errors } = await this.pelClient.dbClient.models.Question.delete({
            id: questionUI.questionDBId,
          });
          console.log("Deleted question " + deleteQuestion.id);
      }
    }
    // Delete the quiz
    if (this.currentQuizId != null) {
      const { data: deleteQuiz, errors } = await this.pelClient.dbClient.models.Quiz.delete({
        id: this.currentQuizId,
      });
      console.log("Deleted question " + deleteQuiz.id);
    }

    this.buildCreateQuizUI();
  }
  questionUp(questionUI: QuizQuestionUI) {
    let ind = this.questionUIList.indexOf(questionUI);
    if (ind == -1) {
      return;
    }
    if (ind == 0) {
      return;
    }
    this.switchQuestion(this.questionUIList[ind], this.questionUIList[ind - 1]);
  }
  questionDown(questionUI: QuizQuestionUI) {
    let ind = this.questionUIList.indexOf(questionUI);
    if (ind == -1) {
      return;
    }
    if (ind == (this.questionUIList.length - 1)) {
      return;
    }
    this.switchQuestion(this.questionUIList[ind], this.questionUIList[ind + 1]);
  }
  switchQuestion(q1: QuizQuestionUI, q2: QuizQuestionUI) {
    let h : string | null;
    let n : number;

    // yuck
    h = q1.question.value;    q1.question.value = q2.question.value;      q2.question.value = h;
    h = q1.ans1.value;        q1.ans1.value = q2.ans1.value;              q2.ans1.value = h;
    h = q1.ans2.value;        q1.ans2.value = q2.ans2.value;              q2.ans2.value = h;
    h = q1.ans3.value;        q1.ans3.value = q2.ans3.value;              q2.ans3.value = h;
    h = q1.ans4.value;        q1.ans4.value = q2.ans4.value;              q2.ans4.value = h;

    h = q1.questionDBId;      q1.questionDBId = q2.questionDBId;          q2.questionDBId = h;

    n = q1.checkIndex;        q1.checkIndex = q2.checkIndex;              q2.checkIndex = n;

    for (let ind = 0; ind < q1.checkList.length; ++ind) {
      q1.checkList[ind].checked = (ind == q1.checkIndex);
    }

    for (let ind = 0; ind < q2.checkList.length; ++ind) {
      q2.checkList[ind].checked = (ind == q2.checkIndex);
    }
  }
  async questionDelete(questionUI: QuizQuestionUI) {
    // Add the question delete list
    if (questionUI.questionDBId != null) {
      this.questionDeleteList.push(questionUI.questionDBId);
        console.log("Added to question deleted list " + questionUI.questionDBId);
    }
    // Remove the entry from the UI
    questionUI.containerDiv.remove();
    // Remove the entry from the question UI list
    let ind = this.questionUIList.indexOf(questionUI);
    this.questionUIList.splice(ind, 1);
  }

  backToMain() {
    this.pelClient.enterMain();
  }
}
