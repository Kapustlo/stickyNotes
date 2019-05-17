import {nEnv} from "./env.js";

export default class Note {
	constructor(text, coords, container) {
		this.dragging = false;
		this._draggingInterval = undefined;
		this.text = text;		
		this.container = container;
		this.__appear(coords, container);
		nEnv.__noteCreated(this);
	}

	__setEvents(element) {
		console.log("EVENTS SET");
		const mdFn = event => {
			this.dragging = true;
			this.coords = {x: event.clientX, y: event.clientY};
		};

		const muFn = event => {
			this.dragging = false
			clearInterval(this._draggingInterval);
		};

		this._draggingInterval = setInterval(() => {
			element.style.top = event.clientY;
			element.style.left = event.clientX;
		},1);

		element.addEventListener("mousedown",mdFn);
		element.addEventListener("mouseup",muFn);
	}

	__appear(coords, container) {
		let note = document.createElement("div");
		note.className = "n-note";
		note.style.top = coords.y+"px";
		note.style.left = coords.x+"px";
		note.innerHTML = `<p>${this.text}</p>`;
		console.log(this.text);
		this.__setEvents(note);
		container.appendChild(note);
	}

}