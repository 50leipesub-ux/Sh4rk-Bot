const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

let validKeys = ["Kukirin2026", "SecretKey123"]; 

app.get('/raw-keys', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(validKeys.join('\n')); 
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Web server running on port ${port}`);
});

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    if (message.content === '!getkey') {
        const newKey = "Hub-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        validKeys.push(newKey);
        message.reply(`Here is your key: \`${newKey}\`\nThis key is now active.`);
    }
});

client.login(process.env.DISCORD_TOKEN);
