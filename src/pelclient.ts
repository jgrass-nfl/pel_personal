import { GameMode } from './gameMode.ts'
import { LoginMode } from './loginMode.ts'
import { MainMode } from './mainMode.ts'
import { EditQuizesMode } from './editQuizesMode.ts'
import { EditMatchesMode } from './editMatchesMode.ts'
import { HostMatchMode } from './hostMatchMode.ts'
import { PlayQuizMode } from './playQuizMode.ts'

import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

export class PelClient
{
  dbClient: any;
  appDiv: HTMLDivElement;

  userName: string;
  userId: string;

  curMode: GameMode | null;

  loginMode: LoginMode;
  mainMode: MainMode;
  editQuizesMode: EditQuizesMode;
  editMatchesMode: EditMatchesMode;
  hostMatchMode: HostMatchMode;
  playQuizMode: PlayQuizMode;

  constructor() {
    this.userName = "";
    this.userId = "";
    
    // Set up the database
    Amplify.configure(outputs);
    this.dbClient = generateClient<Schema>();

    // Set up the modes
    this.appDiv = document.getElementById("app_pane") as HTMLDivElement;

    this.curMode = null;
    this.loginMode = new LoginMode(this);
    this.mainMode = new MainMode(this);
    this.editQuizesMode = new EditQuizesMode(this);
    this.editMatchesMode = new EditMatchesMode(this);
    this.hostMatchMode = new HostMatchMode(this);
    this.playQuizMode = new PlayQuizMode(this);
  }

  switchMode(newMode: GameMode) {
    if (this.curMode != null) {
      this.curMode.exit();
    }
    this.curMode = newMode;
    this.curMode.enter();
  }

  init() {
    this.switchMode(this.loginMode);
    this.loginMode.enter();
  }
  update() {
    if (this.curMode != null) {
      this.curMode.update();
    }
  }
  clearPane() {
    this.appDiv.innerHTML = "";
  }
  // dispatches
  enterMain() {
    this.switchMode(this.mainMode);
  }
  enterCreateQuiz() {
    this.switchMode(this.editQuizesMode);
  }
  enterEditMatches() {
    this.switchMode(this.editMatchesMode);
  }
  enterHostMatch() {
    this.switchMode(this.hostMatchMode);
  }
  enterPlayQuiz() {
    this.switchMode(this.playQuizMode);
  }
  signOut() {
    this.loginMode.signOut();
  }

  dbErrorHandler(context: string, dbErrors: any) {
    if (dbErrors == null) {
      return;
    }
    for (let dbError of dbErrors) {
      console.log(context + " DB Error: " + dbError.message);
    }
    throw new Error(context + " DB Error: " + dbErrors[0].message);
  }
}
