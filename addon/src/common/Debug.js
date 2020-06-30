/*
  Provides useful methods for debugging.
  By Simon Jones
  21/06/2020
*/

class Debug {
  static ShowCommands(){
    chrome.storage.local.get([Constants.ChromeCommandStoreKey()],
      function(result){
        console.log(result);
      });
  }

  static ClearCommands(){
    chrome.storage.local.set({ytld_commands: null}, function(){});
  }

  static ResetCommands(){
    CommandTable.DefaultCommands();
  }
}
