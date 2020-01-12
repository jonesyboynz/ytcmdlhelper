/*
  Main body of code for the ytdl Extension
  14-12-2019
  By Simon Jones
*/

var VideoId = null;
var PlaylistId = null;
var UseStorage = true;
var PageURL = "";

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

function ExtractIds(url){
  VideoId = ExtractId(url, new RegExp("(?:v=)([a-zA-Z0-9_-]+)"));
  PlaylistId = ExtractId(url, new RegExp("(?:list=)([a-zA-Z0-9_-]+)"));
}

function UpdateUI(url){
  SetVideoInput();
  SetPlaylistInput();
  SetTitleText();
  SetUrl(url);
}

function Update(url){
  ExtractIds(url);
  UpdateUI(url);
  chrome.storage.local.get(['ytld_ext_video_select'],
    function(result){SetVideoSelect(result)});
  chrome.storage.local.get(['ytld_ext_playlist_select'],
    function(result){SetPlaylistSelect(result)});
}

function Load(){
  if (stringIsNotNullOrEmpty(UI.URL.Input.value)){
    Update(UI.URL.Input.value);
  }
  else{
    Update(PageURL);
  }
}

function Initialise(url){
  UI.Video.Select.onchange = function(){UpdateVideoInput();};
  UI.Playlist.Select.onchange = function(){UpdatePlaylistInput();};
  UI.Video.Copy.onclick = function(){CopyToClipboard("videoInput");};
  UI.Playlist.Copy.onclick = function(){CopyToClipboard("playlistInput");};
  UI.URL.Input.onchange = function(){Load();};
  UI.URL.Input.onclick = function(){UI.URL.Input.select();};
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
