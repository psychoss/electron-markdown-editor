module.exports = function contextmenu(menu, clipboard, editor) {
    var close = () => {
      menu.classList.remove('is-visible');
    }
    /**
     * ------------------------------------------------------------------------
     * Implement the commond commands.
     * ------------------------------------------------------------------------
     */
    var cut = menu.querySelector('.cut');
    cut.onclick = () => {
      clipboard.writeText(editor.getSelection(), 'copy');
      editor.replaceSelection('');
      close();
    }

    var paste = menu.querySelector('.paste');
    paste.onclick = () => {
      editor.replaceSelection(clipboard.readText('copy'));
      close();
    };
    /**
     * ------------------------------------------------------------------------
     *  ContextMenu
     * ------------------------------------------------------------------------
     */
    // Display the Context Menu of the editor
    editor.on('contextmenu', (cm, ev) => {
      menu.classList.add('is-visible');
      menu.style.top = ev.y + 'px';
      menu.style.left = ev.x + 'px';
    })
    // Hidden the Context Menu
    document.body.addEventListener('click', () => {
      close();
    })

    window.addEventListener('contextmenu', function(ev) {
      ev.preventDefault();
      // if (ev.target.className === "CodeMirror-scroll") {
    }, false);
  }
  //   const contextMenu = new menu();
  //   contextMenu.append(new MenuItem({
  //     label: 'Copy',
  //     click: function() {
  //       clipboard.writeText(editor.getSelection(), 'copy');
  //     }
  //   }));
  //   contextMenu.append(new MenuItem({
  //     label: 'Cut',
  //     click: function() {
  //       clipboard.writeText(editor.getSelection(), 'copy');
  //       editor.replaceSelection('');
  //     }
  //   }));
  //   contextMenu.append(new MenuItem({
  //     label: 'Paste',
  //     click: function() {
  //       editor.replaceSelection(clipboard.readText('copy'));
  //     }
  //   }));
  //
  //   window.addEventListener('contextmenu', function(ev) {
  //     ev.preventDefault();
  //     if (ev.target.className === "CodeMirror-scroll") {
  //       contextMenu.popup(remote.getCurrentWindow(), ev.x, ev.y);
  //     }
  //   }, false);
  // }
