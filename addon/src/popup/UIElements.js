/*
  Provides references to UI elements.
  14-12-2019
  By Simon Jones
*/

var UI = {
  Table: {
    Commands: document.getElementById("commandRow"),
    Title: document.getElementById("titleRow"),
    CommandTable: document.getElementById("commandTable")
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
    EditCommand: document.getElementById("commandEditTemplate"),
    Command: document.getElementById("commandTemplate")
  },
  CommandTables: {
    AddCommand: document.getElementById("addCommand")
  }

};
