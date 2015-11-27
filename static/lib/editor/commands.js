'use strict';
const db=require('../database')
class Commands {


  constructor(editor) {
    this.editor = editor;
    this.initSave();
    this.initAllKey();
    this.initFlatCode();
  }
  initSave() {
    var this_ = this;
    this.save = () => {
      let text = this_.editor.getValue();
    }
  }
  initAllKey(){
    this.allkeys=()=>{
      db.allkeys().then((array)=>{
        console.log(array);
      });
    }
  }
  initFlatCode(){
    var this_ = this;
    this.flatCode=()=>{
      let sel=  this_.editor.getSelection();
      sel=sel.replace(/[\n\\"\\']/g,(str)=>{
        if (str==='\n') {
          return "\\n";
        }
        return "\\"+str;
      });
      this_.editor.replaceSelection(sel)
    }
  }

}

module.exports = Commands;
