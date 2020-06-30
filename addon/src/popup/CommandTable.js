/*
  Provides methods for generating and displaying commands.
  By Simon Jones
  26-01-2020
*/

var CommandInfo = null;

class CommandTable {

  //Updates the table
  static Update(){
    CommandTable.Clear();
    chrome.storage.local.get([Constants.ChromeCommandStoreKey()],
      function(result){
        CommandTable.BuildCommandTable(result);
      });
  }

  static Clear(){
    var elements = document.getElementsByName("commandTemplate");
    for (var i = elements.length; i > 0; i--){
      elements[i - 1].parentElement.removeChild(elements[i - 1]);
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

  static BuildCommandTable(result){
    CommandInfo = result[Constants.ChromeCommandStoreKey()];
    if (CommandInfo == null){
      CommandInfo = CommandTable.DefaultCommands();
    }
    CommandTable.GenerateCommandTable(CommandInfo)
  }

  static GenerateCommandTable(commandInfo){
    commandInfo.commands.forEach(function(commandJson){
      var command = Command.FromJson(commandJson);
      var formattedCommand = command.Apply(Context.ToJson());
      if (formattedCommand !== null){
        var commandElement = CommandTable.CloneTemplateCommandRow();
        commandElement.querySelector('p[name="commandName"]').innerText = command.Name;
        commandElement.querySelector('input[name="commandInput"]').value = formattedCommand;
        UI.Table.Settings.before(commandElement);
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
    chrome.storage.local.set({ytld_commands: commandInfo}, function(){}); //todo : figure out way to use the constant here.
    return commandInfo;
  }

  static CopyToClipboard(element){
    const textElement = document.getElementById("textareaCopy");
    textElement.value = element.value;
    textElement.select();
    document.execCommand("copy");
  }
}
