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
           AppPopup.Initialise(tabs[0].url);
         }
      );
    });
  }

  static ShowSettings(){
    AppSettings.Initialise();
    UI.Mode.Settings.hidden = false;
    UI.Mode.App.hidden = true;
  }

  static HideSettings(){
    UI.Mode.Settings.hidden = true;
    UI.Mode.App.hidden = false;
  }

  static UpdateUI(){
    AppPopup.UpdateUI();
  }

}

//Application starts here.
App.Initialise();
