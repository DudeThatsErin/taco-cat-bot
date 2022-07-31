const config = require('../config/config.json');
module.exports = {
    name: 'dev',
    description: 'Provides information on the developer of Erin\'s Helper Bot.',
    aliases: ['developer', 'erin', 'erinskidds', 'coder'],
    usage: `${config.prefix}dev`,
    example: `${config.prefix}erin or ${config.prefix}coder`,
    execute(message) {
  
        message.channel.send({content:'The developer\'s name is Erin Skidds. She developed this bot for <@707692096852590596>. If you want to know where to find her, visit her website: https://erinskidds.com'});
    },
  
};