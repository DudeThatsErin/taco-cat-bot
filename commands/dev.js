module.exports = {
    name: 'dev',
    description: 'Provides information on the developer of Taco Cat.',
    aliases: ['developer', 'erin', 'erinskidds', 'coder'],
    usage: 'taco.dev',
    example: 'taco.erin or taco.coder',
    inHelp: 'yes',
    execute(message) {
  
        message.channel.send('The developer\'s name is Erin Skidds. She developed this bot for <@707692096852590596>. If you want to know where to find her, visit her website: https://erinskidds.com');
    },
  
};