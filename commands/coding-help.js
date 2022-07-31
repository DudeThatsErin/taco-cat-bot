const config = require('../config/config.json');

module.exports = {
    name: 'coding-help',
    description: 'Refers user to the r/CodingHelp Server for additional coding help.',
    aliases: ['ch', 'r-coding-help', 'codinghelp', 'code'],
    usage: `${config.prefix}coding-help`,
    example: `${config.prefix}code or ${config.prefix}ch`,
    inHelp: 'yes',
    execute(message) {
  
        message.channel.send({content:'Hey! Not sure if you knew this but you can visit the r/CodingHelp server for additional help. Here is the invite link: https://discord.gg/geQEUBm/'});
    },
  
};