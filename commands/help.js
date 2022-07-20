const Discord = require('discord.js');
const config = require('../config/config.json');

const help = {
    color: 0x0099ff,
    title: 'All of the commands',
    description: 'These are all of the commands you can use with this bot.\n\`\`\`markdown\nreport\nstatus-report\nping\ninvite\ntaco\ncoding-help\ndev\`\`\`',
    timestamp: new Date(),
}

module.exports = {
    name: 'help',
    description: 'Provides information on all of our commands.',
    aliases: ['helpme', 'info', 'command-info'],
    usage: 'taco.help',
    example: 'taco.info or taco.command-info',
    inHelp: 'yes',
    execute(message, args) {
  
        let cmdd = args[0];
		//console.log(args)

		if (cmdd) { // Specific command specified

			const cmd = message.client.commands.get(args[0]) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
			if (!cmd) return message.channel.send("That command could not be found!");
			if (!cmd.inHelp) return message.channel.send("No help for that command could be found!");

			const emb = new Discord.EmbedBuilder()
				.setColor('#e8bffd')
				.setTitle(`Help for \`${config.prefix}${cmd.name}\``)
			if (cmd.description) {
				emb.setDescription(cmd.description);
			} else {
				emb.setDescription("No description could be found");
			}
			if (cmd.note) {
				emb.addFields({name: "Note", value: cmd.note, inline: false})
			}
			if (cmd.aliases) {
				emb.addFields({name:"Aliases", value: cmd.aliases.join(", "), inline: false});
			}
			if (cmd.usage) {
				emb.addFields({name: "Usage", value: cmd.usage, inline: false});
			}
			if (cmd.example) {
				emb.addFields({name: "Example Usage", value: cmd.example, inline: false})
			}
			if (cmd.cooldown) {
				emb.addFields({name: "You need to wait this long between usages of this command:", value: `${cmd.cooldown} seconds`, inline: false})
			}

			message.reply({ embeds: [emb] });

        } else {
            message.reply({ embeds: [help]})
        }
        
    },
  
};