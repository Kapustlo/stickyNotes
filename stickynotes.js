/*
	Created by Kapustlo
*/

let nEnv = {
	nId: 0,
	notes: {},
	cursorCoords: {x: undefined, y: undefined},
	__noteCreated: function(note) {
		this.notes[this.nId] = note;
		this.nId++;
	},
	setCoords: function(coords) {
		this.cursorCoords = coords;
	}
}

class Note {
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

let menu = {
	__template: {
		tagName: "div",
		className: "n-menu",
	},
	__block: undefined,
	__container: undefined,
	hidden: true,
	coords: {
		x: 0,
		y: 0
	},
	title: "Create a new note",
	__prepare_inner(data) {
		const title = data.title;
		return `
			<div>
			<p class="n-menu-title">${title}</p>
			</div>
			<div>
				<form>
					<input placeholder="Text" name="text" type="text">
					<button type="submit">Submit</button>
				</form>
			</div>
			`;
	},
	__setCoords: function(coords, element) {
		this.coords = coords;
		element.style.top = coords.y+"px";
		element.style.left = coords.x+"px";	
		console.log(coords);
	},
	__addEvents(element) {
		const button = element.getElementsByTagName("button")[0];
		const input = element.getElementsByTagName("input")[0];

		const clickFn = event => {
			event.preventDefault();
			const text = input.value;
			this._close();
			new Note(text, this.coords, this.__container);
		}

		button.addEventListener("click",clickFn);
	},
	_show: function(coords, wall) {
		const template = this.__template;
		const block = document.createElement(template.tagName);
		block.className = template.className;
		block.innerHTML = this.__prepare_inner({title: this.title});
		this.__setCoords(coords, block);
		this.__addEvents(block);
		this.hidden = false;
		this.__container = wall;
		this.__block = wall.appendChild(block);

	},
	_close: function(block = this.__block) {
		block.remove();
		block = undefined;
		this.hidden = true;
		console.log("removed");
	},
	toggle: function (coords, wall) {
		console.log("Clicked", this.hidden);
		this.hidden ? this._show(coords, wall) : this._close();
	}
}
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