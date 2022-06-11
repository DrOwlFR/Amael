const { MessageEmbed } = require("discord.js");

module.exports = {
  embed: function() {
    return new MessageEmbed()
      .setColor("#26c4ec")
      .setFooter({ text: "© Grand Maître Hibou#3089", iconURL: "https://cdn.discordapp.com/attachments/883461769765470208/883461799188521040/Logo_Hibou_discord.png" })
      .setTimestamp();
  },
};