const fs = require('fs');

module.exports = {
    name: 'taco',
    description: 'Sends a message with a random image of a taco.',
    aliases: ['img', 'rand', 'taco-image'],
    usage: 'taco.taco',
    example: 'taco.img or taco.rand',
    inHelp: 'yes',
    execute(message) {

        const imgDir = './images/';
        let files = fs.readdirSync(imgDir).map(file => {
            return file;
        });

        // let test = './images/' + files[[Math.floor(Math.random() * files.length)]];
        // console.log('file', test)

        message.channel.send({ files: [{ attachment: './images/' + files[[Math.floor(Math.random() * files.length)]] }] })

    },
  
};