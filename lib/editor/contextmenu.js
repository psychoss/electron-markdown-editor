exports.contextMenu = (menu,clipboard,editor) => {
  const contextMenu = new menu();
  contextMenu.append(new MenuItem({
    label: 'Copy',
    click: function() {
      clipboard.writeText(editor.getSelection(), 'copy');
    }
  }));
  contextMenu.append(new MenuItem({
    label: 'Cut',
    click: function() {
      clipboard.writeText(editor.getSelection(), 'copy');
      editor.replaceSelection('');
    }
  }));
  contextMenu.append(new MenuItem({
    label: 'Paste',
    click: function() {
      editor.replaceSelection(clipboard.readText('copy'));
    }
  }));

  window.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    if (ev.target.className === "CodeMirror-scroll") {
      console.log(contextMenu);
      contextMenu.popup(remote.getCurrentWindow(), ev.x, ev.y);
    }
  }, false);
}
