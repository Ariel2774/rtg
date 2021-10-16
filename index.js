const { Client, Intents } = require("discord.js");
const Discord = require('discord.js')
const fs = require("fs");
const settings = require('./dragon-settings.json')
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi(settings.fivemip);	

const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
bot.commands = new Discord.Collection();

bot.on("ready", async () => {

bot.guilds.cache.get(settings.guildid).channels.cache.get(settings.verifychannelid).messages.fetch(settings.verifymessage);

console.log(`[Logs] ${bot.user.username} is Online!`);
setInterval(async () => {
const NameServer = 'NightCity - RolePlay'
    
await server.getPlayers().then(async (data) => {
data = data.sort((a, b) => a.id - b.id);
let playersName = [];
let playersID = [];
let playersDiscord = [];
for (let player of data) {
playersName.push(player.name);
playersID.push(player.id);
const discord = [];
for (let identifiers of player.identifiers) {
if (identifiers.startsWith("discord:")) discord.push(identifiers.replace('discord:', ''));
}
playersDiscord.push(discord.length > 0 ? `<@${discord}>` : 'None');
}
const maxPlayers = await server.getMaxPlayers();

let guild = bot.guilds.cache.get(settings.guildid)

let c = bot.channels.cache.get('895647583119245312')
c.setName(`🐌»┊Players  [${data.length}/32]`)

let channel = bot.channels.cache.get(settings.statuschannelid)
channel.messages.fetch({around: settings.statusmessageid, limit: 1}).then(messages => {
const embed = new Discord.MessageEmbed()
.setThumbnail(guild.iconURL({dynamic:true}))
.setColor('BLUE')
.setTitle(`**Players Online: (${data.length}/${maxPlayers}) | [Space: ${Math.round(data.length/maxPlayers*100)}%]**`)
.addFields(
{ name: "ID", value: `${playersID.join('\n') || "---"}`, inline: true},
{ name: "Name", value: `${playersName.join('\n') || "---"}`, inline: true},
{ name: "Discord", value: `${playersDiscord.join('\n') || "---"}`, inline: true},
)
.setDescription(`**\`🟢\` Status: \`ON\`\n\`👥\` Players: \`${data.length}\`\n\`🌀\` Space: \`${Math.round(data.length/maxPlayers*100)}%\`**`)
.setImage('https://cdn.discordapp.com/attachments/838410048924811295/890953547548602378/standard_14.gif')
.setTimestamp()
messages.first().edit(embed);
});
}).catch((err) => {
let cc = bot.channels.cache.get('895647583119245312')
cc.setName(`🔴》offline`)
let gguild = bot.guilds.cache.get(settings.guildid)

let cchannel = bot.channels.cache.get(settings.statuschannelid)
cchannel.messages.fetch({around: settings.statusmessageid, limit: 1}).then(messages => {
const embed = new Discord.MessageEmbed()
.setColor("BLUE")
.setTitle(`**__Elite - RolePlay__**`)
.setThumbnail(gguild.iconURL({dynamic:true}))
.setDescription(`**\`🔴\` Status: \`OFF\`\n\`👥\` Players: \`OFF\`\n\`🌀\` Space: \`OFF\`**`)
.setFooter(gguild.name)
.setTimestamp()
messages.first().edit(embed);
})
});
}, 30 * 1000);
})
bot.on("guildMemberAdd", member => {
let guild = bot.guilds.cache.get(settings.guildid)
bot.user.setActivity(`${guild.memberCount} Members`)

let channel = bot.channels.cache.get(settings.welcomechannelid)

let embed = new Discord.MessageEmbed()
.setAuthor(`${member.user.username} Welcome To ${member.guild.name}`)
.setThumbnail(member.guild.iconURL({dynamic:true}))
.setDescription(`${member} Welcome to **${member.guild.name}**
Your are our ${member.guild.memberCount} users !
Please read our rules on <#895319696268734514> and get updated on <#895319696268734514>.`)
channel.send(embed)
})
bot.on("guildMemberRemove", member => {
let guild = bot.guilds.cache.get(settings.guildid)
bot.user.setActivity(`${guild.memberCount} Members`)
})
fs.readdir("./commands/", (err, files) => {
console.log(`[LOGS] ${files.length} loaded `);
if(err) console.log(err);
let jsfile = files.filter(f => f.split(".").pop() === "js");
if(jsfile.length <= 0) return;
jsfile.forEach((f, i) => {
let props = require(`./commands/${f}`);
console.log(`[LOGS] ${f} loaded!`);
bot.commands.set(props.help.name, props);
});
});
bot.on('messageReactionAdd', (reaction, user) => {
if(reaction.message.id == settings.verifymessage) {
reaction.message.guild.member(user).roles.add(settings.verifyrole);
}
})
bot.on("message", async message => {
    if(message.author.bot) return;
    
    let prefix = '!'
    
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    const commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
    
    if(message.author.id === '729381996198887556') {
    if(message.content === '!status') {
    let embed = new Discord.MessageEmbed()
    .setTitle('Loading...')
    .setColor('GREEN')
    message.channel.send(embed)
    }
    }
    })

bot.login(settings.token);