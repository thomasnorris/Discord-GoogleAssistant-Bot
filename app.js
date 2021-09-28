var _path = require('path');
var _assistant = require(_path.resolve(__dirname, 'REST-GoogleAssistant-Client', 'client.js'));
var _logger = require(_path.resolve(__dirname, 'Node-Logger', 'app.js'));

var _discord = require('discord.js');
var _bot = new _discord.Client({
    intents: [_discord.Intents.FLAGS.GUILDS]
});

const CFG_FILE = _path.resolve(__dirname, 'config', 'config.json');
var _cfg = readJson(CFG_FILE);

_bot.login(_cfg.token);

_bot.on('ready', () => {
    console.log('Ready!');
    _logger.Info.Async('Logged in', 'User: ' + _bot.user.tag);
});

function readJson(filePath) {
    var fs = require('fs');
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}