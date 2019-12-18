/*
  Main body of code for the ytdl Extension
  14-12-2019
  By Simon Jones
*/

var VideoId = null;
var PlaylistId = null;
var UseStorage = true;

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

function UpdateUI(){
  SetVideoInput();
  SetPlaylistInput();
  SetTitleText();
}

function ExtractIds(url){
  VideoId = ExtractId(url, new RegExp("(?:v=)([a-zA-Z0-9_-]+)"));
  PlaylistId = ExtractId(url, new RegExp("(?:list=)([a-zA-Z0-9_-]+)"));
}

function Update(url){
  ExtractIds(url);
  UpdateUI();
  chrome.storage.local.get(['ytld_ext_video_select'],
    function(result){SetVideoSelect(result)});
  chrome.storage.local.get(['ytld_ext_playlist_select'],
    function(result){SetPlaylistSelect(result)});
}

function Initialise(url){
  UI.Video.Select.onchange = function(){UpdateVideoInput();};
  UI.Playlist.Select.onchange = function(){UpdatePlaylistInput();};
  UI.Video.Copy.onclick = function(){CopyToClipboard("videoInput");};
  UI.Playlist.Copy.onclick = function(){CopyToClipboard("playlistInput");};
  Update(url);
}

document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
     function(tabs){
       Initialise(tabs[0].url);
     }
  );
});
