const Discord = require('discord.js')
const settings = require('../dragon-settings.json')

module.exports.run = async (bot, message, args) => {

let channel = bot.channels.cache.get(settings.bugchannelid)

let bug = args.join(" ")
if(!bug) return message.channel.send(`${message.member}, **Specify a Bug.**`);

message.delete()

let embed = new Discord.MessageEmbed()
.setAuthor("Bug System", message.guild.iconURL())
.setColor("#fffff")
.addFields(
{ name: `Username:`, value: `${message.member}`, inline: true},
{ name: `UserID:`, value: `${message.member.id}`, inline: true},
{ name: `Bug Report:`, value: `${bug}`, inline: false},
)
channel.send(embed)
}     
module.exports.help = {
name: "bug"
}