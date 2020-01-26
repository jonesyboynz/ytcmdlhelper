function UpdateVideoInput(){
  //SetVideoInput();
  //chrome.storage.local.set({ytld_ext_video_select: UI.Video.Select.value}, function() {});
}

function SetVideoInput(commandInfo){
  UI.Table.Video.hidden = !PageContext.HasVideo;
  if (PageContext.HasVideo){
    var command = GetCurrentCommand(commandInfo);
    UI.Video.Input.value = command.Command.formatJson(Context.ToJson());
  }
}

//Sets the video select value
function SetVideoSelect(commandInfo){
  var command = GetCurrentCommand(commandInfo);

  UI.Video.Select.value = stringIsNotNullOrEmpty(commandName)
    ? command.Name
    : context.commands[0].Name;
}

function BuildAndSetVideoSelect(commandInfo){
  if (commandInfo == null){
    commandInfo = DefaultVideoCommands();
  }
  GenerateVideoSelect(commandInfo.commands);
  SetVideoSelect(commandInfo);
  SetVideoInput(commandInfo);
}

function GenerateVideoSelect(commands){
  for (command in commands){ //todo : sort?
    var element = document.createElement("option");
    element.value = command.Name;
    element.innerText = command.Name;
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
  chrome.storage.local.set({ytld_ext_video: commandInfo},
    function(){});
  return commandInfo;
}
