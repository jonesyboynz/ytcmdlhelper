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
    return this.Command.formatJson(urls);
  }
}
