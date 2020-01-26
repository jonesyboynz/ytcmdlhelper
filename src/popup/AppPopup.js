/*
  Main body of code for the ytcmd Extension
  14-12-2019
  By Simon Jones
*/

var PageURL = "";
var Context = null;

function CopyToClipboard(elementId){
  const textElement = document.getElementById("textareaCopy");
  textElement.value = document.getElementById(elementId).value;
  textElement.select();
  document.execCommand("copy");
}

function ExtractId(url, regex){
  var matches = url.match(regex);
  if (matches !== null){
    return matches[1];
  }
  return null;
}

function SetContext(url){
  var videoId = ExtractId(url, new RegExp("(?:v=)([a-zA-Z0-9_-]+)"));
  var playlistId = ExtractId(url, new RegExp("(?:list=)([a-zA-Z0-9_-]+)"));
  Context = new PageContext(videoId, playlistId);
}

function UpdateUI(url){
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

function Update(url){
  SetContext(url);
  UpdateUI(url);
}

function Load(){
  if (stringIsNotNullOrEmpty(UI.Settings.UrlInput.value)){
    Update(UI.Settings.UrlInput.value);
  }
  else{
    Update(PageURL);
  }
}

function ToggleSettings(){
  chrome.tabs.query({active: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "toggle"}, function(){});
  });
}

function Initialise(url){
  UI.Video.Select.onchange = function(){UpdateVideoInput();};
  UI.Playlist.Select.onchange = function(){UpdatePlaylistInput();};
  UI.Video.Copy.onclick = function(){CopyToClipboard("videoInput");};
  UI.Playlist.Copy.onclick = function(){CopyToClipboard("playlistInput");};
  UI.Settings.UrlInput.onchange = function(){Load();};
  UI.Settings.UrlInput.onclick = function(){UI.URL.Input.select();};
  UI.Settings.SettingsButton.onclick = function(){ToggleSettings();}
  PageURL = url;
  Load();
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
     function(tabs){
       Initialise(tabs[0].url);
     }
  );
});
