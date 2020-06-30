/*
  Controls the settings page
  06-07-2020
  By Simon Jones
*/

class AppSettings {

  static Update(url){
    AppSettings.Load();
  }

  static Load(){
    chrome.storage.local.get([Constants.ChromeCommandStoreKey()],
    function(result){
      EditCommandTable.Clear(result);
      EditCommandTable.BuildAndSetCommandTable(result);
    });
  }

  static Initialise(){
    EditCommandTable.Initialise();
  }

}
