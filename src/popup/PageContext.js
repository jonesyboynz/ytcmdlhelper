/*
  A nicer abstraction for gloabal information.
  By Simon Jones
  26/01/2002
*/

class PageContext{
  constructor(videoId, playlistId){
    this.VideoId = videoId;
    this.PlaylistId = playlistId;
    this.HasVideo = (videoId != null);
    this.HasPlaylist = (playlistId != null);
  }

  ToJson(){
    return {
      VideoId: this.VideoId,
      PlaylistId: this.PlaylistId
    };
  }
}
