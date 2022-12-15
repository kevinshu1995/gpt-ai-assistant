import { REST, Routes } from 'discord.js';
import { DISCORD_BOT_TOKEN } from '../../../config/index.js';
import channelsRestrict from './channelsRestrict/index.js';

const allCommands = {
  ...channelsRestrict,
};

export function bindCommandsToClient(client) {
  Object.entries(allCommands).forEach(([commandName, command]) => {
    try {
      const { data, execute } = command;
      client.commands.set(data.name, command);
    } catch (error) {
      console.log(
        `[dc bot] bind command error | name:${commandName} | msg: ${error.message}`
      );
    }
  });
}

export async function registerCommands(clientId) {
  const rest = new REST({ version: '10' }).setToken(DISCORD_BOT_TOKEN);

  const commands = Object.entries(allCommands)
    .map(([_, command]) => {
      return command?.data?.toJSON() || null;
    })
    .filter(item => item !== null);

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
}

