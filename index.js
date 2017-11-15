const Discord = require("discord.js");
const client = new Discord.Client();

const snekfetch = require('snekfetch');

const version = '0.1.3'


client.on("ready", () => {
  console.log("I am ready!");
  const snekfetch = require('snekfetch')
  
  snekfetch.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .set('Authorization', proccess.env.BOTTOKEN2)
    .send({ server_count: client.guilds.size })
    .then(() => console.log('Updated discordbots.org stats.'))
    .catch(err => console.error(`Whoops something went wrong: ${err.body}`));
});

const prefix = "*"
const cmds = "*help, *picme, *uptime, *setusername"

// Disable
offline = false

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

 let command = message.content.split(" ")[0];
 command = command.slice(prefix.length);
 
 let args = message.content.split(" ").slice(1);

 if (offline) {
   return message.channel.send('**The bot is currently disabled from its developer, Sorry.**')
 }

  if (command === 'picme') {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }
  
  if (command === 'help') {
    message.reply("Info\nPrefix:"+ prefix +"\nCommands:"+ cmds);
  }
  
  if (command === 'setusername') {
    client.bot.setNickname(args.join(" "));
  }

  if (command === 'uptime') {
      message.reply('I have been up for ' + client.uptime + ' miliseconds');
  }

  if (command === 'verison') {
      message.reply('I am running on'+ version);
  }

  if (command === 'roast') {
    if (message.mentions.users.size === 0) {
      return message.reply('Please mention a user to roast.')
    } else {
      let roastuser = message.guild.member(message.mentions.users.first());
      message.channel.send(roastuser.avatarURL);
      message.channel.send(roastuser.displayName.toString +' your so ugly, the ugly duckling ran away from you');
    }
  }

  if (command === 'summon') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!');
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }


});

client.login(procces.env.TOKEN);

// Web app (Express + EJS)
const http = require('http');
const express = require('express');
const app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 5000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the `public` directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', (request, response) => {
    // ejs render automatically looks in the views folder
    response.render('index');
});

app.listen(port, () => {
    // will echo 'Our app is running on http://localhost:5000 when run locally'
    console.log('Our app is running on http://localhost:' + port);
});

// pings server every 15 minutes to prevent dynos from sleeping
// pings server every 15 minutes to prevent dynos from sleeping
setInterval(() => {
  http.get('https://asufo-bot-discord.herokuapp.com/');
 }, 900000);
