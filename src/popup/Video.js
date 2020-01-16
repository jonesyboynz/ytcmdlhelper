function UpdateVideoInput(){
  SetVideoInput();
  chrome.storage.local.set({ytld_ext_video_select: UI.Video.Select.value}, function() {});
}

function SetVideoInput(){
  UI.Table.Video.hidden = (VideoId === null);
  if (VideoId !== null){
    UI.Video.Input.value = VideoCommand(VideoId, UI.Video.Select.value);
  }
}

function SetVideoSelect(result){
  UI.Video.Select.value = stringIsNotNullOrEmpty(result.ytld_ext_video_select)
    ? result.ytld_ext_video_select
    : "best";
  SetVideoInput();
}

function GenerateVideoSelect(commands, videoUrls){
  for (command in commands){ //todo : sort?
    var element = document.createElement("option");
    element.value = command.Name;
    element.innerText = command.Apply(videoUrls);
    UI.Video.Select.appendChild(element);
  }
  //todo : set select value;
}
