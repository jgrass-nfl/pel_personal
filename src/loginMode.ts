import { autoSignIn } from "aws-amplify/auth"
import { signUp } from "aws-amplify/auth"
import { confirmSignUp } from "aws-amplify/auth"
import { signIn } from "aws-amplify/auth"
import { getCurrentUser } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';

import { GameMode } from './gameMode.ts'
import { PelClient } from './pelclient.ts'
import { Uib } from './utils.ts'

export class LoginMode extends GameMode
{
  emailInput!: HTMLInputElement;
  passwordInput!: HTMLInputElement;
  verificationInput!: HTMLInputElement;
  loginStatus!: HTMLDivElement;
  
  constructor(pelClient: PelClient) {
    super(pelClient);
  }

  enter() {
    this.buildEntry();
  }
  update() {
  }
  exit() {
  }

  buildEntry() {
    this.pelClient.clearPane();
    let entryDiv = Uib.buildDiv("login_region",
        Uib.buildDiv("title_header", "Pelican"),
        Uib.buildDiv("pel_text", "Welcome"));
    this.appDiv.append(entryDiv);

    this.getCurrentUser();
  }
  async getCurrentUser() {
    try {
        const { username, userId, signInDetails } = await getCurrentUser();

        this.pelClient.userName = username;
        this.pelClient.userId = userId;

        console.log("username", username);
        console.log("user id", userId);
        console.log("sign-in details", signInDetails);
        this.pelClient.enterMain();
    } catch (err: any) {
        this.buildPasswordUI();
    }
  }
  async attemptAutoSignIn() {
    try {
        const { nextStep } = await autoSignIn();
        if (nextStep.signInStep == 'DONE') {
          this.getCurrentUser();
        } else {
          this.buildPasswordUI();
        }
    } catch (err: any) {
      this.buildPasswordUI();
    }
  }
  buildPasswordUI() {
    this.pelClient.clearPane();

    this.emailInput = Uib.buildInput("login_input", "text", 40);
    this.passwordInput = Uib.buildInput("login_input", "password", 40);

    this.loginStatus = Uib.buildDiv("pel_text", "Login or create an account");

    let loginDiv = Uib.buildDiv("login_region",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "E-mail"),
        this.emailInput),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Password"),
        this.passwordInput),
      Uib.buildDiv("pel_vert_spacer", ""),
      Uib.buildDiv("pel_two_row",
        Uib.buildButton("login_button", this, 'loginAccount', "Login"),
        Uib.buildDiv("login_entry", ""),          
        Uib.buildButton("login_button", this, 'createAccount', "Create")),
      Uib.buildDiv("pel_vert_spacer", ""),
      this.loginStatus
    );
    this.appDiv.append(loginDiv);
  }
  async loginAccount() {
    try {
        const { nextStep } = await signIn({
          username: this.emailInput.value,
          password: this.passwordInput.value,
        });
        if (nextStep.signInStep == 'CONFIRM_SIGN_UP') {
          this.buildVerificationUI();
        } else if (nextStep.signInStep == 'DONE') {
          this.getCurrentUser();
        }
    } catch (err: any) {
      this.loginStatus.innerHTML = err.message;
    }
  }
  async createAccount() {
    try {
      const { nextStep } = await signUp({
      username: this.emailInput.value,
      password: this.passwordInput.value,
      options: {
          userAttributes: {
          email: this.emailInput.value,
        },
      }
      });
      if (nextStep.signUpStep == 'CONFIRM_SIGN_UP') {
        this.buildVerificationUI();
      } else if (nextStep.signUpStep == 'DONE') {
        this.getCurrentUser();
      }
    } catch (err: any) {
      this.loginStatus.innerHTML = err.message;
    }
  }
  buildVerificationUI() {
    this.pelClient.clearPane();

    this.verificationInput = Uib.buildInput("login_input", "text", 40);
    this.loginStatus = Uib.buildDiv("pel_text", "Enter verification code");

    let loginDiv = Uib.buildDiv("login_region",
      Uib.buildDiv("title_header", "Pelican"),
      Uib.buildDiv("pel_text", "Check your email for a verification code."),
      Uib.buildDiv("login_field",
        Uib.buildSpan("login_text", "Verification code"),
        this.verificationInput),
      Uib.buildButton("login_button", this, 'verifyCreation', "Verify"),
      Uib.buildDiv("login_entry", ""),
      this.loginStatus
    );

    this.appDiv.append(loginDiv);
  }
  async verifyCreation() {
    try {
      const { nextStep } = await confirmSignUp({
        username: this.emailInput.value,
        confirmationCode: this.verificationInput.value
      });
      if (nextStep.signUpStep == 'DONE') {
          this.loginAccount();
      }
    } catch (err: any) {
      this.loginStatus.innerHTML = err.message;
    }
  }
  async signOut() {
    await signOut();
    this.buildPasswordUI();
  }
}
