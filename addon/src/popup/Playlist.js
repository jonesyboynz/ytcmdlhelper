/*
  Provides methods for generating and populating the playlist input.
  By Simon Jones
  26-01-2020
*/

var PlaylistCommandInfo = null;

function UpdatePlaylistInput(){
  PlaylistCommandInfo.current = UI.Playlist.Select.value;
  SetPlaylistInput(PlaylistCommandInfo);
  SavePlaylistCommandInfo(PlaylistCommandInfo);
}

function SetPlaylistInput(commandInfo){
  UI.Table.Playlist.hidden = !Context.HasVideo;
  if (Context.HasPlaylist){
    var command = GetCurrentCommand(commandInfo);
    UI.Playlist.Input.value = command.Command.formatJson(Context.ToJson());
  }
}

function SetPlaylistSelect(commandInfo){
  var command = GetCurrentCommand(commandInfo);
  UI.Playlist.Select.value = (command == null)
    ? commandInfo.commands[0].Name
    : command.Name;
}

function BuildAndSetPlaylistSelect(result){
  PlaylistCommandInfo = result["ytld_ext_playlist"];
  if (PlaylistCommandInfo == null){
    PlaylistCommandInfo = DefaultPlaylistCommands();
  }
  GeneratePlaylistSelect(PlaylistCommandInfo.commands);
  SetPlaylistSelect(PlaylistCommandInfo);
  SetPlaylistInput(PlaylistCommandInfo);
}

function GeneratePlaylistSelect(commands){
  while (UI.Playlist.Select.firstChild) {
    UI.Playlist.Select.removeChild(UI.Playlist.Select.firstChild);
  }
  for (index in commands){ //todo : sort?
    var element = document.createElement("option");
    element.value = commands[index].Name;
    element.innerText = commands[index].Name;
    UI.Playlist.Select.appendChild(element);
  }
}

function DefaultPlaylistCommands(){
  var commandInfo = {
    commands: [
      new Command("best", "youtube-dl -i -f \"best\" \"{PlaylistId}\""),
      new Command("webm", "youtube-dl -i -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{PlaylistId}\""),
      new Command("mp3", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format mp3 \"{PlaylistId}\""),
      new Command("flac", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format flac \"{PlaylistId}\""),
    ],
    current: "best"
  };
  chrome.storage.local.set({ytld_ext_playlist: commandInfo}, function(){});
  return commandInfo;
}

function SavePlaylistCommandInfo(commandInfo){
  chrome.storage.local.set({ytld_ext_playlist: commandInfo}, function(){});
}
