/*
  Methods for parsing yt video and playlist ids.
  By Simon Jones
  9-3-2020
*/

class IdExtractor {

  static ExtractId(url, regex){
    var matches = url.match(regex);
    if (matches !== null){
      return matches[1];
    }
    return null;
  }

  static GetContext(url){
    var videoId =
      IdExtractor.ExtractId(url, new RegExp("(?:v=)([a-zA-Z0-9_-]+)"));
    var playlistId =
      IdExtractor.ExtractId(url, new RegExp("(?:list=)([a-zA-Z0-9_-]+)"));
    return new PageContext(url, videoId, playlistId);
  }

}
