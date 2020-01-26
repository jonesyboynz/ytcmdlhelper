/*
  Provides methods for the URL row UIElements
  By Simon Jones
  7/1/2020
*/

function SetUrl(url){
  if (url === PageURL && !Context.HasVideo && !Context.HasPlaylist){
    UI.URL.Input.value = "";
  }
  else{
    UI.URL.Input.value = url;
  }
}
