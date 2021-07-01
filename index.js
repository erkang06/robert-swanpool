var Discord = require("discord.js")
var Sentencer = require('sentencer')
var fs = require('fs')
var ffmpeg = require('ffmpeg')
var { OpusEncoder } = require('@discordjs/opus');

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

const SUPERJSON = require("./SUPERJSON.json")

const HelpEmbed = new Discord.MessageEmbed()
  .setTitle("Every command there is")
  .addFields(
    {name: "Rates", value: "qwordrate\nfurryrate\ngayrate\ndankrate\ngamerrate\nthotrate", inline: true},
    {name: "Talking to Robert", value: "hello/hi\nwill you marry me?\nsend a selfie\nsmell me", inline: true},
    {name: "Others", value: "insult\npp\nstatus (p/l/w/c)"},
  )
  .setFooter("Type 'mr,' followed by the cmd you want to use");

const RateEmbed = new Discord.MessageEmbed()
var RatePic = ""
var Title = ""
function Rate(MsgContent, LenMsg, Author, WhichRate){
  let PCRate = Math.floor(Math.random() * 101)
  if (MsgContent.length == LenMsg) {
    AllArgs = Author
  }
  else {
    AllArgs = MsgContent.slice(LenMsg + 1, -1) + MsgContent.slice(-1)
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
  RateEmbed.setColor(Math.floor(Math.random() * 16777215))
}

const PenisEmbed = new Discord.MessageEmbed()
  .setTitle("Penis size:");

const SmellEmbed = new Discord.MessageEmbed()
  .setTitle("What do you smell like?")
  .setThumbnail('http://www.freeimageslive.com/galleries/medical/pics/nose2331.jpg');

const InsultEmbed = new Discord.MessageEmbed()
  .setTitle("Insult:")
  .setFooter("Feel hurt?")

client.on("message", msg => {
  const MsgContent = msg.content.toLowerCase()
  let AllArgs = ""
  switch (true) {
    case msg.content.endsWith("evening prayer.") && msg.author.id == "204255221017214977" && msg.channel.id == "828274056440446976":
      msg.channel.send(":pray:")
      break;
    
    case MsgContent.startsWith("mr, help"):
      HelpEmbed.setColor(Math.floor(Math.random() * 16777215))
      msg.channel.send(HelpEmbed)
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

    case MsgContent.startsWith("mr, pp"):
      if (MsgContent.length == 6) {
        AllArgs = `${msg.author}`
      }
      else {
        AllArgs = msg.content.slice(7, -1) + msg.content.slice(-1)
      }
      var PenisSize = '='.repeat(Math.random() * 25)
      PenisEmbed.setDescription(AllArgs + "'s penis:\n8" + PenisSize + "D")
      PenisEmbed.setColor(Math.floor(Math.random() * 16777215))
      msg.channel.send(PenisEmbed)
      break;
    
    case MsgContent.startsWith("mr, hello") || MsgContent.startsWith("mr, hi"):
      AllArgs = SUPERJSON.DadTalk[Math.floor(Math.random() * SUPERJSON.DadTalk.length)]
      msg.channel.send(AllArgs)
      break;

    case MsgContent.startsWith("mr, smell me"):
      SmellEmbed.setDescription("You smell " + Sentencer.make("{{ adjective }}"))
      SmellEmbed.setColor(Math.floor(Math.random() * 16777215))
      msg.channel.send(SmellEmbed)
      break;

    case MsgContent.startsWith("mr, insult"):
      if (MsgContent.length == 10) {
        AllArgs = `${msg.author}`
      }
      else {
        AllArgs = msg.content.slice(11, -1) + msg.content.slice(-1)
      }
      InsultEmbed.setDescription(AllArgs + " is " + Sentencer.make("{{ an_adjective }}") + " " + Sentencer.make("{{ noun }}"))
      InsultEmbed.setColor(Math.floor(Math.random() * 16777215))
      msg.channel.send(InsultEmbed)
      break;
    
    case MsgContent.startsWith("mr, kpop"):
      var VC = msg.member.voice.channel;
      if (!VC)
        return msg.reply("you aren't in a voice channel. Please join one and try again")
      VC.join()
        .then(connection => {
          const dispatcher = connection.play('DDD - EXID.m4a');
          dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
      break;
    
    case MsgContent.startsWith("animals"):
      msg.reply("longering")
      break;
  
  }
})

client.login(process.env.DISCORDTOKEN)
