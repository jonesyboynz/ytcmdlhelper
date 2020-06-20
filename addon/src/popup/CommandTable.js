/*
  Provides methods for generating and populating the video input.
  By Simon Jones
  26-01-2020
*/

//re-build

var CommandInfo = null;

class CommandTable {

  //Updates the table
  static Update(){
    CommandTable.Clear();
    CommandTable.BuildCommandTable()
  }

  static Clear(){
    const table = UI.Table.CommandTable;
    while (table.firstChild) {
        table.firstChild.remove();
    }
  }

  static CloneTemplateCommandRow(){
    var element = UI.Template.Command.content.cloneNode(true);
    element.querySelector('button[name="commandCopyButton"]').onclick =
      function(){
        CommandTable.CopyToClipboard(this.parentElement.parentElement.querySelector('input[name="commandInput"]'));
      };
    return element;
  }

  static BuildCommandTable(){
    CommandInfo = result[Constants.ChromeCommandStoreKey()];
    if (CommandInfo == null){
      CommandTable.CommandInfo = DefaultVideoCommands();
    }
    CommandTable.GenerateCommandTable(CommandTable)
  }

  static GenerateCommandTable(commands){
    commands.forEach(function(command){
      var formattedCommand = command.Apply(Context.ToJson());
      if (formattedCommand !== null){
        var commandElement = CommandTable.CloneTemplateCommandRow();
        commandElement.querySelector('p[name="commandName"]').innerText = command.Name;
        commandElement.querySelector('input[name="commandInput"]').value = formattedCommand;
        UI.Table.CommandTable.appendChild(commandElement)
      }
    });
  }

  static DefaultCommands(){
    var commandInfo = {
      commands: [
        new Command("best video", "youtube-dl -f \"best\" \"{VideoId}\""),
        new Command("webm video", "youtube-dl -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{videoId}\""),
        new Command("mp3 video", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format mp3 \"{VideoId}\""),
        new Command("flac video", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format flac \"{VideoId}\""),
        new Command("mpv video", "mpv {VideoUrl}"),
        new Command("best playlist", "youtube-dl -i -f \"best\" \"{PlaylistId}\""),
        new Command("webm playlist", "youtube-dl -i -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{PlaylistId}\""),
        new Command("mp3 playlist", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format mp3 \"{PlaylistId}\""),
        new Command("flac playlist", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format flac \"{PlaylistId}\""),
      ]
    };
    chrome.storage.local.set({ytld_commands: commandInfo}, function(){});
    return commandInfo;
  }

  static CopyToClipboard(element){
    const textElement = document.getElementById("textareaCopy");
    textElement.value = element.value;
    textElement.select();
    document.execCommand("copy");
  }
}

//old

/*
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
  VideoCommandInfo = result[Constants.ChromeCommandStoreKey()];
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
      new Command("best video", "youtube-dl -f \"best\" \"{VideoId}\""),
      new Command("webm video", "youtube-dl -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{videoId}\""),
      new Command("mp3 video", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format mp3 \"{VideoId}\""),
      new Command("flac video", "youtube-dl -f \"bestaudio\" --extract-audio --audio-format flac \"{VideoId}\""),
      new Command("mpv video", "mpv {VideoUrl}"),
      new Command("best playlist", "youtube-dl -i -f \"best\" \"{PlaylistId}\""),
      new Command("webm playlist", "youtube-dl -i -f \"bestvideo[ext=webm]+bestaudio[ext=webm]\" --merge-output webm \"{PlaylistId}\""),
      new Command("mp3 playlist", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format mp3 \"{PlaylistId}\""),
      new Command("flac playlist", "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format flac \"{PlaylistId}\""),
    ]
  };
  chrome.storage.local.set({ytld_commands: commandInfo}, function(){});
  return commandInfo;
}

function SaveVideoCommandInfo(commandInfo){
  chrome.storage.local.set({ytld_commands: commandInfo}, function(){});
} */
