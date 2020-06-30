/*
  Controls the main app
  14-12-2019
  By Simon Jones
*/

class AppMain {

  static Update(){
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
       function(tabs){
         if (stringIsNotNullOrEmpty(UI.Settings.UrlInput.value)){
           Context = IdExtractor.GetContext(UI.Settings.UrlInput.value);
         }
         else{
           Context = IdExtractor.GetContext(tabs[0].url);
         }
         CommandTable.Update();
         SetTitleText();
         SetUrl();
       }
    );
  }

  static Initialise(url){
    UI.Settings.UrlInput.onchange = function(){AppMain.Update();};
    UI.Settings.UrlInput.onclick = function(){UI.URL.Input.select();};
    UI.Settings.SettingsButton.onclick = function(){App.ShowSettings();}
  }
}
