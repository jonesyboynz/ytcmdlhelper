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
  Settings:{
    UrlInput: document.getElementById("urlInput"),
    SettingsButton: document.getElementById("settingsButton")
  },
  Mode:{
    App: document.getElementById("appMode"),
    Settings: document.getElementById("settingsMode")
  },
  SettingsButtons:{
    Cancel: document.getElementById("settingsCancel"),
    SaveAndExit: document.getElementById("settingsSaveAndExit")
  },
  Template: {
    Command: document.getElementById("commandRowTemplate")
  },
  CommandTables: {
    AddVideoCommand: document.getElementById("addVideoCommand"),
    AddPlaylistCommand: document.getElementById("addPlaylistCommand")
  }

};
