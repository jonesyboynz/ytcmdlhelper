/*
  Controls the main app
  14-12-2019
  By Simon Jones
*/

var PageURL = "";
var Context = null;

class AppMain {
  static UpdateUI(url){
    CommandTable.Update();
    SetTitleText();
    SetUrl(url);
  }

  static Load(){
    if (stringIsNotNullOrEmpty(UI.Settings.UrlInput.value)){
      Context = IdExtractor.GetContext(UI.Settings.UrlInput.value);
      AppMain.UpdateUI(UI.Settings.UrlInput.value);
    }
    else{
      Context = IdExtractor.GetContext(PageURL);
      AppMain.UpdateUI(PageURL);
    }
  }

  static Initialise(url){
    UI.Settings.UrlInput.onchange = function(){AppPopup.Load();};
    UI.Settings.UrlInput.onclick = function(){UI.URL.Input.select();};
    UI.Settings.SettingsButton.onclick = function(){App.ShowSettings();}
    PageURL = url;
    AppMain.Load(); //todo : move this into App?
  }
}
