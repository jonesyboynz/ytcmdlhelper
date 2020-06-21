/*
  Defines a command for the ytcmdhelper extension.
  By Simon Jones
  16/01/2002
*/

class Command{
  constructor(name, command){
    this.Name = name;
    this.Command = command;
  }

  Apply(urls){
    var formatted = this.Command.formatJson(urls);
    console.log("//" + formatted + "//" + this.Command + "//");
    return formatted == this.Command ? null : formatted;
  }

  static FromJson(json){
    return new Command(json.Name, json.Command)
  }
}
