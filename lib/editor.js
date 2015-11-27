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

      }
    });
  onresize();
}




const onresize = () => {
  var container = document.querySelector('.editor');
  var containerWidth = container.offsetWidth;
  var containerHeight = container.offsetHeight;

  var scrollerElement = editor.getScrollerElement();
  scrollerElement.style.width = containerWidth + 'px';
  scrollerElement.style.height = containerHeight + 'px';

  editor.refresh();
}

initEditor();
require("./lib/editor/contextmenu")(Menu,clipboard,editor);

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
