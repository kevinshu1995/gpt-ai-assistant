// 限制可以說話的頻道
import { SlashCommandBuilder } from 'discord.js';

const allowChannelMap = new Map();

const getCurrentGuildMap = guildId => {
  allowChannelMap.get(guildId);
};

const getGuildProp = (client, prop) => {
  client.guilds.cache.get(prop);
};

const RestrictGetAllowedChannels = {
  data: new SlashCommandBuilder()
    .setName('restrict_get_allowed_channels')
    .setDescription('Get the channel list which I am allowed to speak.'),

  execute(interaction) {
    const { channelId, guildId } = interaction;
    console.log({ channelId, guildId });
  },
};

// RestrictSetOnlyThisTrue 移除其他頻道說話的權利，並新增這個頻道

// RestrictSetThisTrue 新增這個頻道

// RestrictSetThisFalse 移除這個頻道

// RestrictSetEveryChannelFalse 全部不能說話

// RestrictGetAllowedChannels 取得全部能說話的頻道

export default {
  RestrictGetAllowedChannels,
};

