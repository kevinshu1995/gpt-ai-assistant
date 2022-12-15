// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { DISCORD_BOT_TOKEN, APP_ENV } from '../config/index.js';
import { DiscordAssistant } from './../assistant/index.js';

const discordAssistant = new DiscordAssistant();

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
  console.log(`[Discord bot] Ready! Logged in as ${c.user.tag}`);
});

client.on('messageCreate', async message => {
  const reply = text =>
    message.channel.send({
      content: text,
      reply: {
        messageReference: message.id,
      },
    });
  try {
    // 測試用 '?'
    // 正式用 '!'
    const prefix = APP_ENV === 'production' ? '!' : '?';

    //reply if message has prefix as first character
    if (message.content.substring(0, 1) === prefix) {
      // 打字狀態
      const channel = client.channels.cache.get(message.channelId);
      channel.sendTyping();

      const prompt = message.content.substring(1);
      const [responseText] = await discordAssistant.handleEvents([
        {
          userId: message.author.id,
          message: prompt,
        },
      ]);

      discordAssistant.debug();
      reply(responseText);
    }
  } catch (error) {
    const status = error?.status || 500;
    const errorMsg = error?.message || 'something went wrong';

    reply(`[server error ${status}] ${errorMsg}`);
  }
});

// Log in to Discord with your client's token
client.login(DISCORD_BOT_TOKEN);

