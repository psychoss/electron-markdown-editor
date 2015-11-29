'use strict';

class Commands {
	constructor(editor) {
		this.editor = editor;
	}
    /**
	 * ------------------------------------------------------------------------
	 *  Bold
	 * ------------------------------------------------------------------------
	 */
	bold() {
		let selection = this.editor.getSelectionRange();
		let str = this.editor.session.getTextRange(selection);
		if (/^\s*\*\*.+\*\*\s*$/.test(str)) {
			str = str.replace(/^\s*\*\*(.+)\*\*\s*$/, (match, g) => {
				return g;
			});

			this.editor.session.replace(selection, str.trim())
			return;
		}
		this.editor.session.replace(selection, ' **' + str.trim() + '** ')
	}
	/**
	 * ------------------------------------------------------------------------
	 *  Italic
	 * ------------------------------------------------------------------------
	 */
	italic() {
		let selection = this.editor.getSelectionRange();
		let str = this.editor.session.getTextRange(selection);
		if (/^\s*\*.+\*\s*$/.test(str)) {
			str = str.replace(/^\s*\*(.+)\*\s*$/, (match, g) => {
				return g;
			});

			this.editor.session.replace(selection, str.trim())
			return;
		}
		this.editor.session.replace(selection, ' *' + str.trim() + '* ')
	}
	/**
	 * ------------------------------------------------------------------------
	 *  Code
	 * ------------------------------------------------------------------------
	 */
	code() {
		let selection = this.editor.getSelectionRange();
		let str = this.editor.session.getTextRange(selection);

		if (str.trim()) {
			if (/\n/.test(str)) {
				str = "```\n" + str.trim() + "\n```\n";
			} else {
				str = " `" + str.trim() + "` ";
			}
		} else {
			str = "\n```\n\n```\n";
		}
		this.editor.session.replace(selection, str)
	}
	    /**
		 * ------------------------------------------------------------------------
		 * Indent Decrease
		 * ------------------------------------------------------------------------
		 */
	indent(){
		let selection = this.editor.getSelectionRange();
		console.log(selection);
		let lines = this.editor.session.getLines(selection.start.row, selection.end.row);
		let str = '';
		for (let l of lines) {
			if (l.startsWidth('\t'))
				str += l.substr(1)+ '\n';
		}
		this.editor.session.replace(selection, str);
		}
	/**
	 * ------------------------------------------------------------------------
	 * List bulleted
	 * ------------------------------------------------------------------------
	 */
	bulleted() {
		let selection = this.editor.getSelectionRange();
		console.log(selection);
		let lines = this.editor.session.getLines(selection.start.row, selection.end.row);
		let str = '';
		for (let l of lines) {
			if (l.trim())
				str += "* " + l .trim()+ '\n';
		}
		this.editor.session.replace(selection, str);
	}
	/**
	 * ------------------------------------------------------------------------
	 * Numeric List
	 * ------------------------------------------------------------------------
	 */
	numeric() {
		let selection = this.editor.getSelectionRange();
		console.log(selection);
		let lines = this.editor.session.getLines(selection.start.row, selection.end.row);
		let str = '';
		let i=1;
		for (let l of lines) {
			if (l.trim()){
				str += i+". " + l .trim()+ '\n';
				i++;}
		}
		this.editor.session.replace(selection, str);
	}
}

class BindElement {
	constructor(commands) {
		this.commands = commands;
		this.init();
	}
	_bind(className, callback, eventType) {
		eventType = eventType || 'click';
		let ele = document.querySelector(className);
		if (ele) {
			ele.addEventListener('click', callback);
		}
	}
	init() {

		this._bind('.editor-bold-btn', this.commands.bold.bind(this.commands));
		this._bind('.editor-italic-btn', this.commands.italic.bind(this.commands));
		this._bind('.editor-code-btn', this.commands.code.bind(this.commands));
		this._bind('.editor-bulleted-btn', this.commands.bulleted.bind(this.commands));
		this._bind('.editor-numeric-btn', this.commands.numeric.bind(this.commands));
		this._bind('.editor-indent-btn', this.commands.indent.bind(this.commands));


	}
}

var editor = ace.edit('editor');
editor.$blockScrolling = Infinity;
editor.setShowPrintMargin(false);
editor.getSession().setMode('ace/mode/markdown');

editor.setStyle();

let commands = new Commands(editor);
new BindElement(commands);