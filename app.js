var _path = require('path');
var _assistant = require(_path.resolve(__dirname, 'REST-GoogleAssistant-Client', 'client.js'));
var _logger = require(_path.resolve(__dirname, 'Node-Logger', 'app.js'));

var _discord = require('discord.js');
var _bot = new _discord.Client({
    intents: [_discord.Intents.FLAGS.GUILDS, _discord.Intents.FLAGS.GUILD_MESSAGES, _discord.Intents.FLAGS.DIRECT_MESSAGES]
});

const CFG_FILE = _path.resolve(__dirname, 'config', 'config.json');
var _cfg = readJson(CFG_FILE);

_bot.on('ready', handleReady);
_bot.on('messageCreate', handleMessageCreate);

// start
_bot.login(_cfg.token);

function handleMessageCreate(msg) {
    if (botMentioned(msg)) {
        msg.reply('You said: ' + msg.content);
    }
}

function handleReady() {
    console.log('Ready!');
    _logger.Info.Async('Logged in', 'User: ' + _bot.user.tag);
}

function botMentioned(msg) {
    return msg.content.startsWith('<@') && msg.content.includes(_bot.user.id);
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}