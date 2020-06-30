/*
  Main body of code for the ytcmd Extension
  9-3-2020
  By Simon Jones
*/

class App {
  static Initialise(){
    document.addEventListener('DOMContentLoaded', function() {
      chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
         function(tabs){
           AppMain.Initialise(tabs[0].url);
           AppSettings.Initialise();
         }
      );
    });
  }

  static ShowSettings(){
    UI.Mode.Settings.hidden = false;
    UI.Mode.App.hidden = true;
    App.Update();
  }

  static HideSettings(){
    UI.Mode.Settings.hidden = true;
    UI.Mode.App.hidden = false;
    App.Update();
  }

  static Update(){
    AppMain.Update();
    AppSettings.Update();
  }
}

//Application starts here.
App.Initialise();
