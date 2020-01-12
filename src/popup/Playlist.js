function UpdatePlaylistInput(){
  SetPlaylistInput();
  chrome.storage.local.set({ytld_ext_playlist_select: UI.Playlist.Select.value}, function() {});
}

function SetPlaylistInput(){
  UI.Table.Playlist.hidden = (PlaylistId === null);
  if (PlaylistId !== null){
    UI.Playlist.Input.value = DownloadPlaylistCommand(PlaylistId, UI.Playlist.Select.value);
  }
}

function SetPlaylistSelect(result){
  UI.Playlist.Select.value = stringIsNotNullOrEmpty(result.ytld_ext_playlist_select)
    ? result.ytld_ext_playlist_select
    : "best";
  SetPlaylistInput();
}
