const Discord = require('discord.js')
const settings = require('../dragon-settings.json')

module.exports.run = async (bot, message, args) => {

let channel = bot.channels.cache.get(settings.sugchannelid)

let sug = args.join(" ")
if(!sug) return message.channel.send(`${message.member}, **Specify a Sug.**`);

message.delete()

let embed = new Discord.MessageEmbed()
.setAuthor("Suggestion System", message.guild.iconURL())
.setColor("#fffff")
.addFields(
{ name: `Username:`, value: `${message.member}`, inline: true},
{ name: `UserID:`, value: `${message.member.id}`, inline: true},
{ name: `Suggestion:`, value: `${sug}`, inline: false},
)
channel.send(embed).then(msg =>{
msg.react("<a:715971210713759765:877398541528608788>")
setTimeout(function(){
msg.react("<a:XCheckMark:877398549065764935>")
}, 1000);
})
}     
module.exports.help = {
name: "sug"
}