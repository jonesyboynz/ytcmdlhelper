/*
  Main backing code for EditCommands.html
  By Simon Jones
  26-01-2019
*/

class AppController{

  static Initalise(){
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        AppController.HandleRequest(request);
      });
  }

  static OpenSettingsFrame(){

  }

  static CloseSettingsFrame(){

  }

  static HandleRequest(request){
    if (request.message === "open"){
      AppController.OpenSettingsFrame();
    }
    if (request.message === "close"){
      AppController.CloseSettingsFrame();
    }
  }
}


AppController.Initalise();
