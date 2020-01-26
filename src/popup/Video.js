/*
  Provides methods for generating and populating the video input.
  By Simon Jones
  26-01-2020
*/

var VideoCommandInfo = null;

function UpdateVideoInput(){
  VideoCommandInfo.current = UI.Video.Select.value;
  SetVideoInput(VideoCommandInfo);
  SaveVideoCommandInfo(VideoCommandInfo);
}

function SetVideoInput(commandInfo){
  UI.Table.Video.hidden = !Context.HasVideo;
  if (Context.HasVideo){
    var command = GetCurrentCommand(commandInfo);
    UI.Video.Input.value = command.Command.formatJson(Context.ToJson());
  }
}

function SetVideoSelect(commandInfo){
  var command = GetCurrentCommand(commandInfo);
  UI.Video.Select.value = (command == null)
    ? commandInfo.commands[0].Name
    : command.Name;
}

function BuildAndSetVideoSelect(result){
  VideoCommandInfo = result["ytld_ext_video"];
  if (VideoCommandInfo == null){
    VideoCommandInfo = DefaultVideoCommands();
  }
  GenerateVideoSelect(VideoCommandInfo.commands);
  SetVideoSelect(VideoCommandInfo);
  SetVideoInput(VideoCommandInfo);
}

function GenerateVideoSelect(commands){
  while (UI.Video.Select.firstChild) {
    UI.Video.Select.removeChild(UI.Video.Select.firstChild);
  }
  for (index in commands){ //todo : sort?
    var element = document.createElement("option");
    element.value = commands[index].Name;
    element.innerText = commands[index].Name;
    UI.Video.Select.appendChild(element);
  }
}

function DefaultVideoCommands(){
  var commandInfo = {
    commands: [
      new Command("best", "youtube-dl -f \"best\" \"{VideoId}\""),
      new Command("webm", "youtube-dl -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{videoId}\""),
      new Command("mp3", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format mp3 \"{VideoId}\""),
      new Command("flac", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format flac \"{VideoId}\""),
    ],
    current: "best"
  };
  chrome.storage.local.set({ytld_ext_video: commandInfo}, function(){});
  return commandInfo;
}

function SaveVideoCommandInfo(commandInfo){
  chrome.storage.local.set({ytld_ext_video: commandInfo}, function(){});
}
