import { PelClient } from './pelclient.ts'

export class GameMode
{
  pelClient: PelClient;
  appDiv: HTMLDivElement;

  constructor(pelClient: PelClient) {
    this.pelClient = pelClient;
    this.appDiv = this.pelClient.appDiv;
  }

  enter() {
  }

  update() {
  }

  exit() {
  }

}
