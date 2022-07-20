module.exports = {
    name: 'invite',
    description: 'Sends a message including a link to invite the bot to their server.',
    aliases: ['inv', 'invite-link', 'bot-link'],
    usage: 'taco.invite',
    example: 'taco.inv or taco.bot-link',
    inHelp: 'yes',
    execute(message) {
  
        message.channel.send('If you would like to invite this bot to your server, you can use the following invite link: https://discord.com/api/oauth2/authorize?client_id=865364729580879932&permissions=8&scope=bot%20applications.commands');
    },
  
};