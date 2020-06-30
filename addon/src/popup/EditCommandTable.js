/*
  Provides methods for editing commands
  By Simon Jones
  26-01-2020
*/

class EditCommandTable {

  static Initialise(){
    UI.SettingsButtons.Cancel.onclick = function() {App.HideSettings();};
    UI.SettingsButtons.SaveAndExit.onclick = function() {EditCommandTable.SaveAndExit();};
    UI.CommandTables.AddCommand.onclick = function() {EditCommandTable.AddNewCommand("editCommandsTable");};
  }

  static Clear(){
    const parent = UI.Table.EditCommands;
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
  }

  static AddNewCommand(table){
    document.getElementById(table).appendChild(EditCommandTable.CloneTemplateCommandRow());
  }

  static CloneTemplateCommandRow(){
    var element = UI.Template.EditCommand.content.cloneNode(true);
    element.querySelector('img[name="commandDelete"]').onclick = function(){this.parentElement.parentElement.parentElement.remove();};
    return element;
  }

  static BuildAndSetCommandTable(result){
    var commands = result[Constants.ChromeCommandStoreKey()].commands;
    for (var index in commands){
      var element = EditCommandTable.CloneTemplateCommandRow();
      element.querySelector('input[name="commandName"]').value = commands[index].Name;
      element.querySelector('input[name="commandString"]').value = commands[index].Command;
      UI.Table.EditCommands.appendChild(element);
    }
  }

  static SaveSettings(){
    var valid = true;
    var videoCommands = EditCommandTable.GetCommands("editCommandsTable");
    valid &= videoCommands.IsValid;

    if (videoCommands.Data.length == 0){
      //todo : error
      valid = false
    }

    if (valid){
      var commandInfo = {
        commands: videoCommands.Data
      };
      chrome.storage.local.set({ytld_commands: commandInfo}, function(){});
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
    if (EditCommandTable.SaveSettings()){
      App.HideSettings();
      App.Update();
    }
  }

}
