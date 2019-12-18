function SetTitleText(){
  UI.Table.Title.hidden = false;
  if (VideoId === null && PlaylistId === null){
    UI.Title.Text.innerHTML =
      "no video/playlist detected bro";
  }
  else if (VideoId !== null && PlaylistId !== null){
    UI.Title.Text.innerHTML =
      "detected v/<mark class=\"marked-video\">{0}</mark>\tpl/<mark class=\"marked-playlist\">{1}</mark>".format(VideoId, PlaylistId);
  }
  else if (VideoId !== null){
    UI.Title.Text.innerHTML =
      "detected v/<mark class=\"marked-video\">{0}</mark>".format(VideoId);
  }
  else{
    UI.Title.Text.innerHTML =
      "detected pl/<mark class=\"marked-playlist\">{0}</mark>".format(PlaylistId);
  }
}
