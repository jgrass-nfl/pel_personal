import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'

export class MainMode extends GameMode
{
  constructor(pelClient: PelClient) {
    super(pelClient);
  }

  enter() {
    this.buildMainUI();
  }
  update() {
  }
  exit() {
  }
  
  buildMainUI() {
    this.pelClient.clearPane();
    let mainDiv = Uib.buildDiv("main",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("mode_header", "Main"),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'editQuizes', "Edit Quizes"),
        Uib.buildDiv("login_entry", ""),
        Uib.buildButton("login_button", this, 'editMatches', "Edit matches"),
      ),
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'hostMatch', "Host match"),
        Uib.buildDiv("login_entry", ""),
        Uib.buildButton("login_button", this, 'playQuiz', "Play Quiz")
      ),
      Uib.buildDiv("spacer_header", ""),
      Uib.buildDiv("pel_one_row",
        Uib.buildButton("login_button", this, 'signOut', "Sign Out")
      ),
    );

    this.appDiv.append(mainDiv);
  }
  editQuizes() {
    this.pelClient.enterCreateQuiz();
  }
  editMatches() {
    this.pelClient.enterEditMatches();
  }
  hostMatch() {
    this.pelClient.enterHostMatch();
  }
  playQuiz() {
    this.pelClient.enterPlayQuiz();
  }

  signOut() {
    this.pelClient.signOut();
  }
}
