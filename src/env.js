export let nEnv = {
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