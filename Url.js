/*
  Provides methods for the URL row UIElements
  By Simon Jones
  7/1/2020
*/

function SetUrl(url){
  if (url === PageURL && VideoId === null && PlaylistId == null){
    UI.URL.Input.value = "";
  }
  else{
    UI.URL.Input.value = url;
  }
}
