module.exports = {
    name: 'coding-help',
    description: 'Refers user to the r/CodingHelp Server for additional coding help.',
    aliases: ['ch', 'r-coding-help', 'codinghelp', 'code'],
    usage: 'taco.coding-help',
    example: 'taco.code or taco.ch',
    inHelp: 'yes',
    execute(message) {
  
        message.channel.send('Hey! Not sure if you knew this but you can visit the r/CodingHelp server for additional help. Here is the invite link: https://discord.gg/geQEUBm/');
    },
  
};