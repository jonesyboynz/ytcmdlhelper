/*
  A nicer abstraction for gloabal information.
  By Simon Jones
  26/01/2002
*/

class PageContext{
  constructor(videoId, playlistId){
    this.HasVideo = (videoId != null);
    this.VideoId = videoId;
    this.VideoUrl = "https://www.youtube.com/watch?v={0}".format(videoId);
    this.HasPlaylist = (playlistId != null);
    this.PlaylistId = playlistId;
    this.PlaylistUrl = "https://www.youtube.com/playlist?list={0}".format(playlistId);
  }

  ToJson(){
    var json = {};
    if (this.HasVideo){
      json["VideoId"] = this.VideoId;
      json["VideoUrl"] = this.VideoUrl;
    }
    if (this.HasPlaylist){
      json["PlaylistId"] = this.PlaylistId;
      json["PlaylistUrl"] = this.PlaylistUrl;
    }
    return json;
  }
}
