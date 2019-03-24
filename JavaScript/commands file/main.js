/*
*@file owner Thomas Weland
*@type discord.js
*@npm 0 no module needed :
*@five put this in your main file [main.js]

*/



bot.commands = new Discord.Collection();

  fs.readdir("./commands/", (err, Files) =>{
    if(err) console.log(err);
  
    let jsfile = Files.filter(f => f.split(".").pop() ==="js")
    if(jsfile.length <= 0){
      console.log("can\'t find your folder");
      return;
    }
  

    //This will send a message to your console when a command has been loaded
    jsfile.forEach((f, i ) => {
      let props = require(`./commands/${f}`);
      console.log(`${f} loaded !`); 
     bot.commands.set(props.help.name, props);
    })
  })



  bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm")return;
    
    let messageArray = message.content.split(" "); 
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message, args);


  
  });