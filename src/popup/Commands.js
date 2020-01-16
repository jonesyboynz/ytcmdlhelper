/*
  Code for command generation.
  14-12-2019
  By Simon Jones
*/

function isAudio(format){
  switch(format){
    case "mp3":
    case "flac":
      return true;
    default:
      return false;
  }
}

function VideoCommand(videoId, format){
  if (isAudio(format)){
    return "youtube-dl -f \"bestaudio\" --extract-audio --audio-format {0} \"{1}\"".format(format, videoId);
  }
  else if (format === "best"){
    return "youtube-dl -f \"best\" \"{0}\"".format(videoId);
  }
  else{
    return "youtube-dl -f \"bestvideo[ext={0}]+bestaudio[ext={0}]\" --merge-output {0} \"{1}\"".format(format, videoId);
  }
}

function PlaylistCommand(playlistId, format){
  if (isAudio(format)){
    return "youtube-dl -i -f \"bestaudio\" --extract-audio --audio-format {0} \"{1}\"".format(format, playlistId);
  }
  else if (format === "best"){
    return "youtube-dl -i -f \"best\" \"{0}\"".format(playlistId);
  }
  else{
    return "youtube-dl -i -f \"bestvideo[ext={0}]+bestaudio[ext={0}]\" --merge-output {0} \"{1}\"".format(format, playlistId);
  }
}
