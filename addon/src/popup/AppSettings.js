/*
  Controls the settings page
  06-07-2020
  By Simon Jones
*/

class AppSettings {

  static Initialise(){
    UI.SettingsButtons.Cancel.onclick = function() {App.HideSettings();};
    UI.SettingsButtons.SaveAndExit.onclick = function() {AppSettings.SaveAndExit();};
    UI.CommandTables.AddCommand.onclick = function() {AppSettings.AddNewCommand("editCommandsTable");};
    AppSettings.Load();
  }

  static AddNewCommand(table){
    document.getElementById(table).appendChild(AppSettings.CloneTemplateCommandRow());
  }

  static CloneTemplateCommandRow(){
    var element = UI.Template.EditCommand.content.cloneNode(true);
    element.querySelector('img[name="commandDelete"]').onclick = function(){this.parentElement.parentElement.parentElement.remove();};
    return element;
  }

  static Load(){
    chrome.storage.local.get(["ytld_ext_video"],
    function(result){
      AppSettings.BuildAndSetCommandTable(result, "ytld_ext_video", "videoCommandsTable");
    });
    chrome.storage.local.get(["ytld_ext_playlist"],
    function(result){
      AppSettings.BuildAndSetCommandTable(result, "ytld_ext_playlist", "playlistCommandsTable");
    });
  }

  static BuildAndSetCommandTable(result, objectKey, tableName){
    var commands = result[objectKey].commands;

    const parent = document.getElementById(tableName);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    for (index in commands){
      var element = AppSettings.CloneTemplateCommandRow();
      element.querySelector('input[name="commandName"]').value = commands[index].Name;
      element.querySelector('input[name="commandString"]').value = commands[index].Command;
      document.getElementById(tableName).appendChild(element);
    }
  }

  static SaveSettings(){
    var valid = true;
    var videoCommands = AppSettings.GetCommands("videoCommandsTable");
    valid &= videoCommands.IsValid;

    if (videoCommands.Data.length == 0){
      //todo : error
      valid = false
    }

    if (valid){
      var commandInfo = {
        commands: videoCommands.Data,
        current: videoCommands.Data[0].Name
      };
      chrome.storage.local.set({ytld_ext_video: commandInfo}, function(){});
    }

    return valid;
  }

  static GetCommands(tableName){
    var commandElements = Array.from(document.getElementById(tableName).children);
    var commands = [];
    var usedNames = {};
    commandElements.forEach(function(element){
      var isValid = true;
      var commandNameElement = element.getElementsByTagName("input")[0];
      var commandStringElement = element.getElementsByTagName("input")[1];
      commandNameElement.style.backgroundColor = "";
      commandStringElement.style.backgroundColor = "";
      var name = commandNameElement.value.trim();
      var command = commandStringElement.value.trim();
      if (name.length == 0){
        commandNameElement.style.backgroundColor = "#DD7789" //todo : hard-coded stuff
        isValid = false;
      }
      if (command.length == 0){
        commandStringElement.style.backgroundColor = "#DD7789"
        isValid = false;
      }
      if (usedNames[name] !== undefined){
        commandNameElement.style.backgroundColor = "#DD7789"
        usedNames[name].style.backgroundColor = "#DD7789"
        isValid = false;
      }
      if (isValid){
        commands.push(new Command(name, command));
        usedNames[name] = commandNameElement;
      }
    });
    return new ValidatedResult(commands, commandElements.length === commands.length);
  }

  static SaveAndExit(){
    if (AppSettings.SaveSettings()){
      App.HideSettings();
      App.UpdateUI();
    }
  }
}
