/*
  Provides references to UI elements.
  14-12-2019
  By Simon Jones
*/

var UI =
{
  Table: {
    Title: document.getElementById("titleRow"),
    Settings: document.getElementById("settingsRow"),
    EditCommands: document.getElementById("editCommandsTable")
  },
  Title: {
    Text: document.getElementById("titleText")
  },
  Settings: {
    UrlInput: document.getElementById("urlInput"),
    SettingsButton: document.getElementById("settingsButton")
  },
  Mode: {
    App: document.getElementById("appMode"),
    Settings: document.getElementById("settingsMode")
  },
  SettingsButtons: {
    Cancel: document.getElementById("settingsCancel"),
    SaveAndExit: document.getElementById("settingsSaveAndExit")
  },
  Template: {
    EditCommand: document.getElementById("commandEditTemplate"),
    Command: document.getElementById("commandTemplate")
  },
  CommandTables: {
    AddCommand: document.getElementById("addCommand")
  },
  URL: {
    Input: document.getElementById("urlInput")
  }
};
