/*
  Controls the main app
  14-12-2019
  By Simon Jones
*/

var PageURL = "";
var Context = null;

class AppPopup {

  static CopyToClipboard(elementId){
    const textElement = document.getElementById("textareaCopy");
    textElement.value = document.getElementById(elementId).value;
    textElement.select();
    document.execCommand("copy");
  }

  static UpdateUI(url){
    chrome.storage.local.get(["ytld_ext_video"],
    function(result){
      BuildAndSetVideoSelect(result);
    });
    chrome.storage.local.get(["ytld_ext_playlist"],
    function(result){
      BuildAndSetPlaylistSelect(result);
    });
    SetTitleText();
    SetUrl(url);
  }

  static Load(){
    if (stringIsNotNullOrEmpty(UI.Settings.UrlInput.value)){
      Context = IdExtractor.GetContext(UI.Settings.UrlInput.value);
      AppPopup.UpdateUI(UI.Settings.UrlInput.value);
    }
    else{
      Context = IdExtractor.GetContext(PageURL);
      AppPopup.UpdateUI(PageURL);
    }
  }

  static Initialise(url){
    UI.Video.Select.onchange = function(){UpdateVideoInput();};
    UI.Playlist.Select.onchange = function(){UpdatePlaylistInput();};
    UI.Video.Copy.onclick = function(){AppPopup.CopyToClipboard("videoInput");};
    UI.Playlist.Copy.onclick = function(){AppPopup.CopyToClipboard("playlistInput");};
    UI.Settings.UrlInput.onchange = function(){AppPopup.Load();};
    UI.Settings.UrlInput.onclick = function(){UI.URL.Input.select();};
    UI.Settings.SettingsButton.onclick = function(){App.ShowSettings();}
    PageURL = url;
    AppPopup.Load();
  }
}
