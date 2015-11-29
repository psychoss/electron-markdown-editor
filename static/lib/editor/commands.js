'use strict';
const db = require('../database')
class Commands {


  constructor(editor) {
    this.editor = editor;
    this.initSave();
    this.initAllKey();
    this.initCommands();
    this.database = new db('/home/psycho/RESOURCE/归档/note/database/doc.db');
  }
  initDatabase() {
    let this_ = this;
    this.database = (params) => {
    }
  }
  initSave() {
    var this_ = this;
    this.save = () => {
      let content = this_.editor.getValue();
      this_.database.upsert({
        content: content
      });
    }
  }
  initAllKey() {
    this.allkeys = () => {

    }
  }

  initCommands() {
    var this_ = this;
    this.flatCode = () => {
      let sel = this_.editor.getSelection();
      sel = sel.replace(/[\n\\"\\']/g, (str) => {
        if (str === '\n') {
          return "\\n";
        }
        return "\\" + str;
      });
      this_.editor.replaceSelection(sel)
    };
    /**
     * ------------------------------------------------------------------------
     * Wrapper the selection width the blod mark.
     * ------------------------------------------------------------------------
     */
    this.blod = () => {
      let sel = this_.editor.getSelection();
      sel = ' **' + sel.trim() + '** '
      this_.editor.replaceSelection(sel);
    };
    /**
     * ------------------------------------------------------------------------
     * Wrapper the selection width the italic mark.
     * ------------------------------------------------------------------------
     */
    this.italic = () => {
      let sel = this_.editor.getSelection();
      sel = ' *' + sel.trim() + '* '
      this_.editor.replaceSelection(sel);
    };
    /**
     * ------------------------------------------------------------------------
     * Wrapper the selection width code or pre mark.
     * ------------------------------------------------------------------------
     */
    this.code = () => {
      let sel = this_.editor.getSelection();
      if (!sel.trim()) {
        sel = '```\n```\n';
      } else if (/\n/.test(sel)) {

        sel = "```\n" + sel + "\n```\n";
      } else {
        sel = ' `' + sel.trim() + '` ';
      }
      this_.editor.replaceSelection(sel);
    };
  }

}

module.exports = Commands;
