/*
  Extension methods.
  14-12-2019
  By Simon Jones
*/

//"hello {0}".format("world") ===> "hello world"
String.prototype.format = function() {
  value = this;
  for (index in arguments) {
    var toReplace = "{" + index + "}";
    while (value.includes(toReplace)) {
      value = value.replace(toReplace, arguments[index]);
    }
  }
  return value;
}

//Not really an extension, but you cannot extend the prototype for null.
function stringIsNotNullOrEmpty(string){
  return !(string === undefined || string === null || string === "")
}