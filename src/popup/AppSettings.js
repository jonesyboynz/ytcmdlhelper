class AppSettings {


  static Initialise(){
    UI.SettingsButtons.Cancel.onclick = function() {App.HideSettings();};
    UI.SettingsButtons.SaveAndExit.onclick = function() {AppSettings.SaveAndExit();};
    AppSettings.Load();
  }

  static Load(){
    chrome.storage.local.get(["ytld_ext_video"],
    function(result){
      AppSettings.BuildAndSetEditVideos(result);
    });
    chrome.storage.local.get(["ytld_ext_playlist"],
    function(result){
      //BuildAndSetPlaylistSelect(result);
    });
  }

  static BuildAndSetEditVideos(result){
    var commands = result["ytld_ext_video"].commands;

    const parent = document.getElementById("videoCommandsTable");
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    for (index in commands){ //todo : sort?
      var element = UI.Template.Command.content.cloneNode(true);
      element.querySelector('input[name="commandName"]').value = commands[index].Name;
      element.querySelector('input[name="commandString"]').value = commands[index].Command;
      element.querySelector('button[name="commandDelete"]').onclick = function(){this.parentElement.parentElement.remove();};
      document.getElementById("videoCommandsTable").appendChild(element);
    }
  }

  static SaveAndExit(){
    //todo : save
    App.HideSettings();
  }

}
