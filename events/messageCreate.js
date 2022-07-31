const config = require('../config/config.json');
const me = require('../config/dev.json');
const Discord = require('discord.js');
const ee = require('../config/embed.json');
module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        //console.log(message);
        //console.log('My ID should match this: 455926927371534346', message.mentions.repliedUser.id); // how I get the user ID on new replies.

        // delete slash commands
        //message.guild.commands.set([])
        //console.log(await message.guild.commands.fetch());
        client.cooldowns = new Discord.Collection();
        const { cooldowns } = client;

        if (message.author.bot) {
            //console.log('bot message');
            return;
        };
        if (!message.content.startsWith(config.prefix)) {
            //console.log('does not start with prefix.');
            return;
        };
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return message.channel.send({ content: `That command does not exist. Run \`${config.prefix}help\` to see all of my commands.` });
        //console.log(command);

        // owner only
        if (command.ownerOnly === 'yes' || command.modOnly === 'yes' || command.ownerOnly === 1 || command.modOnly === 1) {
            if (!message.author.id === me.id) {
                return message.reply({ content: `This is only a command Erin (<@${me.id}>) can use. If you are seeing this in error use the \`${config.prefix}report\` command.` });
            }
        }

        // command cooldowns
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // actually running the commands.
        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('Erin\'s Support Server')
                        .setStyle('Link')
                        .setURL('https://discord.gg/tT3VEW8AYF'),
                    new Discord.ButtonBuilder()
                        .setLabel('Fill out this form!')
                        .setStyle('Link')
                        .setURL('https://dudethatserin.com')
                )
            const embed = {
                color: 0xAA2C2C,
                title: 'Oh no! An _error_ has appeared!',
                description: `**Contact Bot Owner:** <@${me.id}>`,
                fields: [
                    {
                        name: '**Error Name:**',
                        value: `\`${error.name}\``
                    }, {
                        name: '**Error Message:**',
                        value: `\`${error.message}\``
                    }, {
                        name: '**Ways to Report:**',
                        value: `Run the \`${config.prefix}report\` command, Message Erin on Discord, or use one of the links below.\n\nPlease include all of the information in this embed (message) as well as any additional information you can think to provide. Screenshots are also VERY helpful. Thank you!`
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: `Thanks for using ${client.user.tag}! I'm sorry you encountered this error!`,
                    icon_url: `${client.user.displayAvatarURL()}`
                }
            };
            message.channel.send({ embeds: [embed], components: [row] });
        }
    }
}// end client.on message