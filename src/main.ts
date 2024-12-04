import './style.css';

import { PelClient } from "./pelclient";

var pelClient : PelClient;

document.addEventListener("DOMContentLoaded", function () {
  pelClientStart();
});

function pelClientStart() {
  console.log("Starting");
  pelClient = new PelClient();
  pelClient.init();
  webTick(0);
}

// @ts-ignore
function webTick(time: DOMHighResTimeStamp) {
	pelClient.update();
  window.requestAnimationFrame(webTick);
}
