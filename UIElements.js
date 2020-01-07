/*
  Provides references to UI elements.
  14-12-2019
  By Simon Jones
*/

var UI = {
  Video:{
    Input: document.getElementById("videoInput"),
    Select: document.getElementById("videoFormatSelect"),
    Copy: document.getElementById("videoCopyButton")
  },
  Playlist:{
    Input: document.getElementById("playlistInput"),
    Select: document.getElementById("playlistFormatSelect"),
    Copy: document.getElementById("playlistCopyButton")
  },
  Table: {
    Video: document.getElementById("videoAvailableRow"),
    Playlist: document.getElementById("playlistAvailableRow"),
    Title: document.getElementById("titleRow")
  },
  Title: {
    Text: document.getElementById("titleText")
  },
  URL:{
    Input: document.getElementById("urlInput")
  }
};
