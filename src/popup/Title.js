function SetTitleText(){
  UI.Table.Title.hidden = false;
  if (!Context.HasVideo && !Context.HasPlaylist){
    UI.Title.Text.innerHTML =
      "no video/playlist detected bro";
  }
  else if (Context.HasVideo && Context.HasPlaylist){
    UI.Title.Text.innerHTML =
      "vid/<mark class=\"marked-video\">{0}</mark>\tpl/<mark class=\"marked-playlist\">{1}</mark>".format(Context.VideoId, Context.PlaylistId);
  }
  else if (Context.HasVideo){
    UI.Title.Text.innerHTML =
      "vid/<mark class=\"marked-video\">{0}</mark>".format(Context.VideoId);
  }
  else{
    UI.Title.Text.innerHTML =
      "pl/<mark class=\"marked-playlist\">{0}</mark>".format(Context.PlaylistId);
  }
}
