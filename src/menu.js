import {nEnv} from "./env.js";
import Note from "./notes.js";

export let menu = {
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