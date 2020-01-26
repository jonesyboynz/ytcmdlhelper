/*
  Main backing code for EditCommands.html
  By Simon Jones
  26-01-2019
*/

class AppEditCommands{

  static Iframe = document.createElement("iframe");

  static Initalise(){
    AppEditCommands.CreateIframe();
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) {
        AppEditCommands.HandleRequest(request);
        sendResponse();
      });
  }

  static CreateIframe() {
    var element = AppEditCommands.Iframe;
    element.src = "chrome-extension://__MSG_@@cgobjpapgcamjonkjkpfafhnikpjgncl/src/page/EditCommands.html";
    element.frameboarder = "0";
    element.allowtransparency = "yes";
    element.scrolling = "no";
    element.hidden = true;
    element.style = "width:500px; height:500px; z-index:999; position: absolute; left:100px; top:100px";
    document.body.appendChild(element);
  }

  static HandleRequest(request){
    if (request.message === "toggle"){
      AppEditCommands.Iframe.hidden = !AppEditCommands.Iframe.hidden;
    }
  }
}


AppEditCommands.Initalise();
