const { ShewenyClient } = require("sheweny");
const { DISCORD_TOKEN } = require("./structures/config");
const { embed } = require("./structures/functions");

const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES"],
  admins: ["158205521151787009"],
  managers: {
    commands: {
      directory: "./commands",
      autoRegisterApplicationCommands: true,
      guildId: ["467310144901087233", "982635812053205073"],
      prefix: "a.",
      applicationPermissions: false,
      default: {
        cooldown: 3,
        type: "SLASH_COMMAND",
        channel: "GUILD",
      },
    },
    events: {
      directory: "./events",
      loadAll: true,
    },
    buttons: {
      directory: "./interactions/buttons",
      loadAll: true,
    },
    selectMenus: {
      directory: "./interactions/selectmenus",
      loadAll: true,
    },
    inhibitors: {
      directory: "./inhibitors",
      loadAll: true,
    },
  },
  mode : "development",
});

client.functions = {
  embed:embed,
};

client.login(DISCORD_TOKEN);
