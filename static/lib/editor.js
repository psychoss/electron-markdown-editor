'use strict';
/**
 * ------------------------------------------------------------------------
 * remote
 * ------------------------------------------------------------------------
 */
const remote = require('remote');
const Menu = remote.require('menu');
const BrowserWindow = remote.require('browser-window');
const MenuItem = remote.require('menu-item');

const Commands = require('./lib/editor/commands');
const tooltip = require('./lib/control/tooltip.js');
console.log(document.querySelectorAll('.js-tooltip'));
tooltip(document.querySelectorAll('.js-tooltip'));
var clipboard = require('clipboard');




var editor;

const initEditor = () => {
  editor = CodeMirror(
    document.querySelector('.editor'), {
      mode: {
        name: "markdown"
      },
      lineNumbers: true,
      extraKeys: {

      },
      foldGutter: {
        rangeFinder: new CodeMirror.fold.combine(CodeMirror.fold.markdown)
      },
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
}
initEditor();
const commands = new Commands(editor);

/**
 * ------------------------------------------------------------------------
 * Toolbar
 * ------------------------------------------------------------------------
 */
var undoButton = document.querySelector('.editor-undo-btn');
undoButton.addEventListener('click', () => {
  editor.execCommand('undo');
});
var redoButton = document.querySelector('.editor-redo-btn');
redoButton.addEventListener('click', () => {
  editor.execCommand('redo');
});
var saveButton = document.querySelector('.editor-save-btn');
saveButton.addEventListener('click', commands.flatCode)

const onresize = () => {
  var container = document.querySelector('.editor');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  var scrollerElement = editor.getScrollerElement();
  scrollerElement.style.width = containerWidth + 'px';
  scrollerElement.style.height = containerHeight + 'px';

  editor.refresh();
}
onresize();


require("./lib/editor/contextmenu")(document.querySelector('.editor-context-menu'), clipboard, editor);

// const initMenu = () => {
//   try {
//     var nativeMenuBar = new Menu();
//     if (process.platform == "darwin") {
//       nativeMenuBar.createMacBuiltin && nativeMenuBar.createMacBuiltin("FileExplorer");
//     }
//   } catch (error) {
//     console.error(error);
//     setTimeout(function() {
//       throw error
//     }, 1);
//   }
// }
// initMenu();
