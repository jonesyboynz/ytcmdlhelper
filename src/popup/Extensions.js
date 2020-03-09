/*
  Extension methods.
  14-12-2019
  By Simon Jones
*/

//"hello {0}".format("world") ===> "hello world"
String.prototype.format = function() {
  ptp_value = this;
  for (ptp_index in arguments) {
    var ptp_toReplace = "{" + ptp_index + "}";
    while (ptp_value.includes(ptp_toReplace)) {
      ptp_value = ptp_value.replace(ptp_toReplace, arguments[ptp_index]);
    }
  }
  return ptp_value;
}

//"hello {planet}".format({planet: "world"}) ===> "hello world"
String.prototype.formatJson = function(){
  value = this;
  for (key in arguments[0]){
    var toReplace = "{" + key + "}";
    while (value.includes(toReplace)) {
      value = value.replace(toReplace, arguments[0][key]);
    }
  }
  return value;
}

//Not really an extension, but you cannot extend the prototype for null.
function stringIsNotNullOrEmpty(string){
  return !(string === undefined || string === null || string === "")
}

function GetCurrentCommand(commandInfo){
  return commandInfo.commands.find(function(command){
    return command.Name === commandInfo.current;
  });
}
