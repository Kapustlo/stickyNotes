/*
	Created by Kapustlo
*/

import {nEnv} from "./src/env.js";
import Notes from "./src/notes.js";
import {menu} from "./src/menu.js";

const walls = document.getElementsByClassName("n-wall");
for(const wall of walls) {
	const clickFn = event => {
		event.preventDefault();

		let xPos = event.clientX;
		let yPos = event.clientY;

		xPos = xPos < window.innerWidth / 2 ? xPos : xPos- 38;
		yPos = yPos < window.innerHeight / 2 ? yPos : yPos - 38;

		console.log(xPos, yPos);

		menu.toggle({x: xPos, y: yPos}, wall);
	}

	const mmFn = event => nEnv.setCoords({x: event.clientX, y: event.clientY});

	wall.addEventListener("contextmenu",clickFn);

}