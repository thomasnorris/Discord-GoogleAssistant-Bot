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

async function handleMessageCreate(msg) {
    // ignore a bot reply
    if (isBotReply(msg)) {
        return;
    }

    // ignore if we haven't been mentioned and we aren't in a dedicated channel
    if (!wasBotMentioned(msg) && msg.channel.name != _cfg.channel_name) {
        _logger.Warning.Async('Message ignored', 'Bot not mentioned');
        return;
    }

    // let's go
    var command = removeMentionFromMsg(msg);
    _logger.Info.Async(msg.author.username + ' sent a command', command);

    await _assistant.Send(command)
        .then((res) => {
            msg.reply(res);
        })
        .catch((err) => {
            msg.reply(err);
        });
}

function handleReady() {
    console.log('Ready!');
    _logger.Info.Async('Logged in', 'User: ' + _bot.user.tag);
}

function wasBotMentioned(msg) {
    return msg.content.startsWith('<@') && msg.content.includes(_bot.user.id);
}

function isBotReply(msg) {
    return msg.author.id == _bot.user.id;
}

function removeMentionFromMsg(msg) {
    msg = msg.content.slice(msg.content.indexOf('>') + 1)
    return msg.trim();
}

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}