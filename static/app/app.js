'use strict';

class Commands {
	constructor(editor) {
		this.editor = editor;
	}
	_indentString() {
		return this.editor.session.getTabString();
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
	 * Sort lines
	 * ------------------------------------------------------------------------
	 */
	sort() {

	}
		
	/**
	 * ------------------------------------------------------------------------
	 * Indent Decrease
	 * ------------------------------------------------------------------------
	 */
	indent() {
		let range = this.editor.getSelectionRange().collapseRows();
		this.editor.session.outdentRows(range);
	}
	/**
	 * ------------------------------------------------------------------------
	 * List bulleted
	 * ------------------------------------------------------------------------
	 */
	bulleted() {
		let range = this.editor.getSelectionRange().collapseRows();
		let doc = this.editor.session.doc;
		for (var row = range.start.row; row <= range.end.row; row++)
			doc.insertInLine({ row: row, column: 0 }, "* ");
	}
	/**
	 * ------------------------------------------------------------------------
	 * Numeric List
	 * ------------------------------------------------------------------------
	 */
	numeric() {
		let range = this.editor.getSelectionRange().collapseRows();
		let doc = this.editor.session.doc;
		var i = 1;
		for (var row = range.start.row; row <= range.end.row; row++) {
			doc.insertInLine({ row: row, column: 0 }, i + ". ");
			i++;
		}
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
		this._bind('.editor-sort-btn', this.commands.sort.bind(this.commands));
		this._bind('.editor-indent-btn', this.commands.indent.bind(this.commands));
		this._bind('.editor-bulleted-btn', this.commands.bulleted.bind(this.commands));
		this._bind('.editor-numeric-btn', this.commands.numeric.bind(this.commands));


	}
}

var editor = ace.edit('editor');
editor.$blockScrolling = Infinity;
editor.setShowPrintMargin(false);
editor.getSession().setMode('ace/mode/markdown');

editor.setStyle();

let commands = new Commands(editor);
new BindElement(commands);