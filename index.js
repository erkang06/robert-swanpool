const Discord = require("discord.js")
const Sentencer = require('sentencer')
const fs = require('fs')
const ffmpeg = require('ffmpeg')
const NumToWord = require('number-to-words')
const { OpusEncoder } = require('@discordjs/opus')
const SUPERJSON = require("./SUPERJSON.json");

const client = new Discord.Client({
  presence: {
    activity: {
      type: 'PLAYING',
      name: 'bingo',
    },
  },
});

client.on("ready", () => {
  client.channels.cache.get("709674340504829974").send("Hey guys, I'm back")
  console.log(`Logged in as ${client.user.tag}!`)
})

function RandColour() {
  return(Math.floor(Math.random() * 16777215))
}

const HelpEmbed = new Discord.MessageEmbed()
  .setTitle("Every command there is")
  .addFields(
    {name: "Rates", value: "qwordrate\nfurryrate\ngayrate\ndankrate\ngamerrate\nthotrate"},
    {name: "Talking to Robert", value: "hello/hi\nwill you marry me?\nsend a selfie\nsmell me"},
    {name: "Voice Channel", value: "kpop\nkpopsongs\nvc (add one of the below)\n" + SUPERJSON.Noises.join(", ") + "\nleave"},
    {name: "Others", value: "insult\npp/penis\nchode\nemoji\nservers\nping\nstatus (p/l/w)"}
  )
  .setThumbnail("https://cdn.discordapp.com/avatars/849711698737758298/9fb82f17f708ec69bc2a39c375d0ad2e.png")
  .setFooter("Type 'mr,' followed by the cmd you want to use");

const RateEmbed = new Discord.MessageEmbed()
var RatePic = ""
var Title = ""
function Rate(MsgContent, LenMsg, Author, WhichRate) {
  let PCRate = Math.floor(Math.random() * 101)
  if (MsgContent.length == LenMsg) {
    AllArgs = Author
  }
  else {
    AllArgs = MsgContent.slice(LenMsg + 1)
  }
  Rating =  AllArgs + " is " + PCRate.toString() + "% " + WhichRate + "!"
  let Howratey = ""
  if (PCRate > 70) {
    Howratey = "That is extremely " + WhichRate
  }
  else if (PCRate > 40) {
    Howratey = "That is quite " + WhichRate
  }
  else if (PCRate > 20) {
    Howratey = "That is slightly " + WhichRate
  }
  else {
    Howratey = "That is a not that " + WhichRate
  }
  RateEmbed.setTitle(Title)
  RateEmbed.setDescription(Rating)
  RateEmbed.setThumbnail(RatePic)
  RateEmbed.setFooter(Howratey)
  RateEmbed.setColor(RandColour())
}

const PenisEmbed = new Discord.MessageEmbed()
  .setTitle("Penis size:");

const ChodeEmbed = new Discord.MessageEmbed()
  .setTitle("Chode size:");

const SmellEmbed = new Discord.MessageEmbed()
  .setTitle("What do you smell like?")
  .setThumbnail('http://www.freeimageslive.com/galleries/medical/pics/nose2331.jpg');

const InsultEmbed = new Discord.MessageEmbed()
  .setTitle("Insult:")
  .setFooter("Feel hurt?")

function EmojiChar(Char) {
  switch (Char) {
    case "!":
      return ":exclamation:"
      break;
    case "?":
      return ":question:"
      break;
    case "+":
      return ":heavy_plus_sign:"
      break;
    case "-":
      return ":heavy_minus_sign:"
      break;
    case "*":
      return ":heavy_multiplication_x:"
      break;
    case "/":
      return ":heavy_division_sign:"
      break;
  }
}

const PingEmbed = new Discord.MessageEmbed()
  .setTitle("Ping")

var KpopSongs = SUPERJSON.Kpop.join("\n")
KpopSongs = KpopSongs.split(".m4a").join("")
const KpopEmbed = new Discord.MessageEmbed()
  .setTitle("All Kpop songs")
  .setDescription(KpopSongs)
  .setFooter("Type 'mr, kpop' in a voice channel to use it");

const Noises = SUPERJSON.Noises

function StatusActivity(Letter) {
  switch (Letter) {
        case "p":
          return "PLAYING"
          break;
        case "l":
          return "LISTENING"
          break;
        case "w":
          return "WATCHING"
          break;
  }
}  

client.on("message", msg => {
  const MsgContent = msg.content.toLowerCase()
  let AllArgs = ""
  switch (true) {
    case msg.content.endsWith("prayer.") && msg.author.id == "204255221017214977" && msg.channel.id == "828274056440446976":
      msg.channel.send(":pray:")
      break;
    
    case MsgContent.startsWith("mr, help"):
      HelpEmbed.setColor(RandColour())
      msg.author.send(HelpEmbed)
      msg.react("👍")
      break;
    
    case MsgContent.startsWith("mr, qwordrate"):
      RatePic = "https://images-ext-1.discordapp.net/external/eYUtZBUSd7DLFB1W5cRgWPYTbVLi4cXt1qHZ5evTe1c/https/media.discordapp.net/attachments/709674340504829974/810920366233878588/arabic.png"
      Title = "✨ Q-word rate ✨"
      Rate(msg.content, 13, `${msg.author}`, "Q-word")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, furryrate"):
      RatePic = "https://upload.wikimedia.org/wikipedia/commons/f/fb/Anthro_vixen_colored.jpg"
      Title = "🐺 Furry rate 🐺"
      Rate(msg.content, 13, `${msg.author}`, "furry")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, gayrate"):
      RatePic = "https://www.tripridetn.org/wp-content/uploads/pride-flags-11.jpg"
      Title = "🏳️‍🌈 Gay rate 🏳️‍🌈"
      Rate(msg.content, 11, `${msg.author}`, "gay")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, dankrate"):
      RatePic = "https://dankmemer.lol/40326fed0d1bc75a2688535e70dd31be.png"
      Title = "😎 Dank rate 😎"
      Rate(msg.content, 12, `${msg.author}`, "dank")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, gamerrate"):
      RatePic = "https://miro.medium.com/max/1400/1*FRtwS_vPzro4ozZ9QJ2bLQ.png"
      Title = "🎮 Gamer rate 🎮"
      Rate(msg.content, 13, `${msg.author}`, "gamer")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, thotrate"):
      RatePic = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/3b/3bc474d6d0737eaa61c2246c6b86f39477e61b55_full.jpg"
      Title = "😩 Thot rate 😩"
      Rate(msg.content, 12, `${msg.author}`, "thot")
      msg.channel.send(RateEmbed)
      break;

    case MsgContent.startsWith("mr, pp") || MsgContent.startsWith("mr, penis"):
      if (MsgContent.length == 6) {
        AllArgs = `${msg.author}`
      }
      else {
        AllArgs = msg.content.slice(7)
      }
      var PenisSize = "=".repeat(Math.random() * 31)
      PenisEmbed.setDescription(AllArgs + "'s penis:\n8" + PenisSize + "D")
      PenisEmbed.setColor(RandColour())
      msg.channel.send(PenisEmbed)
      break;
      
    case MsgContent.startsWith("mr, chode"):
      if (MsgContent.length == 9) {
        AllArgs = `${msg.author}`
      }
      else {
        AllArgs = msg.content.slice(10)
      }
      var ChodeSize = '━'.repeat(Math.random() * 16)
      ChodeEmbed.setDescription(AllArgs + "'s chode:\nO" + ChodeSize + "╮\nO" + ChodeSize + "╯")
      ChodeEmbed.setColor(RandColour())
      msg.channel.send(ChodeEmbed)
      break;
    
    case MsgContent.startsWith("mr, hello") || MsgContent.startsWith("mr, hi"):
      AllArgs = SUPERJSON.DadTalk[Math.floor(Math.random() * SUPERJSON.DadTalk.length)]
      msg.channel.send(AllArgs)
      break;

    case MsgContent.startsWith("mr, smell me"):
      SmellEmbed.setDescription("You smell " + Sentencer.make("{{ adjective }}"))
      SmellEmbed.setColor(RandColour())
      msg.channel.send(SmellEmbed)
      break;

    case MsgContent.startsWith("mr, insult"):
      if (MsgContent.length == 10) {
        AllArgs = `${msg.author}`
      }
      else {
        AllArgs = msg.content.slice(11)
      }
      InsultEmbed.setDescription(AllArgs + " is " + Sentencer.make("{{ an_adjective }}") + " " + Sentencer.make("{{ noun }}"))
      InsultEmbed.setColor(RandColour())
      msg.channel.send(InsultEmbed)
      break;
    
    case MsgContent.startsWith("mr, emoji"):
      const ListMsg = MsgContent.slice(10).split("")
      let EmojiReply = []
      console.log(ListMsg)
      let LenListMsg = ListMsg.length;

      for (var i = 0; i < LenListMsg; i++) {
        var Char = ListMsg[i]
        if (Char.toUpperCase() != Char.toLowerCase()) {
          EmojiReply.push(`:regional_indicator_${Char}:`)
        }
        else if (Char == " ") {
          EmojiReply.push("     ")
        }
        else if (isNaN(Char) == false) {
          EmojiReply.push(`:${NumToWord.toWords(Char)}:`)
        }
        else {
          try {
            EmojiReply.push(EmojiChar(Char))
          }
          catch {}
        }
      }
      if (!EmojiReply.join("").replace(/\s/g, '').length) {
        msg.channel.send("None of the characters have an emoji form")
      }
      else {
        msg.channel.send(EmojiReply.join(" "))
      }
      break;
      
    case MsgContent.startsWith("mr, servers"):
      msg.channel.send(`I am currently in ${client.guilds.cache.size} servers`)
      break;
    
    case MsgContent.startsWith("mr, ping"):
      msg.channel.send('Loading data').then(async (pingmsg) => {
        pingmsg.delete()
        PingEmbed.setDescription(`Latency is ${pingmsg.createdTimestamp - msg.createdTimestamp}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`)
        PingEmbed.setColor(RandColour())
        msg.channel.send(PingEmbed)
      })
      break;
      
    case MsgContent.startsWith("mr, kpopsongs"):
      KpopEmbed.setColor(RandColour())
      msg.channel.send(KpopEmbed)
      break;
      
    case MsgContent.startsWith("mr, kpop"):
      AllArgs = SUPERJSON.Kpop[Math.floor(Math.random() * SUPERJSON.Kpop.length)]
      var VC = msg.member.voice.channel;
      if (!VC) {
        return msg.channel.send("You aren't in a voice channel. Please join one and try again")
      }
      else if (!msg.guild) {
        return msg.channel.send("This command only works in a server. Please try again")
        break;
      }
      VC.join()
        .then(connection => {
          connection.voice.setSelfDeaf(true)
          msg.channel.send("Playing: " + AllArgs.slice(0, -4))
          const dispatcher = connection.play("Kpop/" + AllArgs)
          dispatcher.on("finish", () => {VC.leave()});
        })
      break;
      
    case MsgContent.startsWith("mr, vc"):
      AllArgs = MsgContent.slice(7)
      if (!AllArgs) {
        return msg.channel.send("You didn't specify a noise. Please try again")
      }
      else if (!Noises.includes(AllArgs)) {
        return msg.channel.send("The noise you chose doesn't exist. Please try again")
      }
      else if (!msg.guild) {
        return msg.channel.send("This command only works in a server. Please try again")
        break;
      }
      var VC = msg.member.voice.channel
      if (!msg.member.voice.channel) {
        return msg.channel.send("You aren't in a voice channel. Please join one and try again")
        break;
      }
      VC.join()
        .then(connection => {
          connection.voice.setSelfDeaf(true)
          const dispatcher = connection.play(`noises/${AllArgs}.wav`)
          dispatcher.on("finish", () => {VC.leave()});
        })
      break;

    case MsgContent.startsWith("mr, leave"):
      switch(true) {
        case msg.guild.me.voice.channel == undefined:
          msg.channel.send("I'm not connected to a voice channel")
          break;
        case msg.member.voice.channel == undefined:
          msg.channel.send("You're not connected to a voice channel")
          break;
        case msg.member.voice.channel.id != msg.guild.me.voice.channel.id:
          msg.channel.send("You're not connected to the voice channel Robert is on")
          break;
        default:
          msg.guild.me.voice.channel.leave()
          msg.channel.send("I have successfully left the voice channel")
      }
      break;
    
    case MsgContent.startsWith("mr, status"):
      const Status = StatusActivity(MsgContent.slice(11, 12))
      if (Status) {
        AllArgs = msg.content.slice(13)
        client.user.setPresence({activity: {type: Status, name: AllArgs}})
        msg.channel.send("My " + Status.toLowerCase() + " status has changed to '" + AllArgs + "'")
      }
      else {
        msg.channel.send("Type 'mr,' followed by either 'p', 'l' or 'w' then your status of choice")
      }
      break;
      
    case MsgContent.startsWith("mr, send a selfie"):
      msg.channel.send("https://cdn.discordapp.com/avatars/849711698737758298/9fb82f17f708ec69bc2a39c375d0ad2e.png")
      break;
      
    case MsgContent.startsWith("mr, will you marry me?"):
      if (Math.floor(Math.random() * 5) == 0) {
        msg.channel.send("Of course!")
      }
      else {
        msg.channel.send("Why would I? I have a wife and kids")
      }
      break;
  
  }
})

client.login(process.env.DISCORDTOKEN)
