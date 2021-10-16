const Discord = require('discord.js')
const settings = require('../dragon-settings.json')

module.exports.run = async (bot, message, args) => {

let embed = new Discord.MessageEmbed()
.setTitle(`**Server IP**`)
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setColor("#fffff")
.setDescription(`\`🐌\` FiveM: \`${settings.fivemip}\`
-------------------------------------
\`🎤\` TeamSpeak: \`${settings.teamspeakip}\`
-------------------------------------
Public RolePlay`)
message.channel.send(embed)
}     
module.exports.help = {
name: "ip"
}