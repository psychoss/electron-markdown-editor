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


const clipboard = require('clipboard');

/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */
const Commands = require('./lib/editor/commands');
const Title = require('./lib/editor/title');
const Events = require('./lib/editor/events');
const Toolbar = require('./lib/control/toolbar')

new Toolbar();
/**
 * ------------------------------------------------------------------------
 * Initialize editor
 * ------------------------------------------------------------------------
 */
var editor;
const initEditor = () => {
    editor = ace.edit(document.querySelector('.editor'));
    editor.setTheme('./ace/twilight')
    editor.getSession().setMode('./ace/markdown')
    editor.setShowPrintMargin(false);
    editor.setAutoScrollEditorIntoView(true);
    editor.getSession().setUseWrapMode(true);
    editor.setOption("scrollPastEnd", true);
    editor.setDisplayIndentGuides(false);
}
initEditor();

/**
 * ------------------------------------------------------------------------
 * Initialize Command
 * ------------------------------------------------------------------------
 */
const commands = new Commands(editor);
/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */
var title = new Title();
title.setTitle('New Note');
/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */

// var eventParameters = {
//     change: [
//         (cm) => {
//             console.log("changed");
            
//             title.setTitle(title.parseTitle(cm.getValue()));
//         }
//     ]
// }
// Events(editor,eventParameters);
/**
 * ------------------------------------------------------------------------
 * Toolbar
 * ------------------------------------------------------------------------
 */
var bindCommand = (m) => {
    Object.keys(m).forEach((k) => {
        var o = document.querySelector(k)
        if (o) {
            o.addEventListener('click', m[k]);
        }
    })
};

bindCommand({
    ".editor-bold-btn": commands.blod,
    ".editor-italic-btn": commands.italic,
    ".editor-code-btn": commands.code,

})
var undoButton = document.querySelector('.editor-undo-btn');
undoButton.addEventListener('click', () => {
    editor.execCommand('undo');
});
var redoButton = document.querySelector('.editor-redo-btn');
redoButton.addEventListener('click', () => {
    editor.execCommand('redo');
});
var saveButton = document.querySelector('.editor-save-btn');
saveButton.addEventListener('click', commands.save)

/**
 * ------------------------------------------------------------------------
 * 
 * ------------------------------------------------------------------------
 */



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
