const { MessageActionRow, MessageButton } = require("discord.js");
const { Button } = require("sheweny");
const { readFileSync, writeFileSync } = require("fs");

module.exports = class ButtonTest extends Button {
  constructor(client) {
    super(client, ["-5", "-1", "+1", "+5"]);
  }

  async execute(button) {

    if (!button.member.permissions.has("MANAGE_GUILD")) return button.reply({ content: "Vous n'avez pas la permission de modifier la vie des personnages.", ephemeral: true });

    const characterData = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json"), "utf-8");
    const embed = await button.channel.messages.fetch(button.message.id);
    const embedData = embed.embeds[0];

    characterData[embedData.title].currentHealthPoints += parseInt(button.customId);
    writeFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", JSON.stringify(characterData));

    const resetEmbed = this.client.functions.embed()
      .setTitle(`${embedData.title}`)
      .setDescription(`**Points de vie actuels :** ${"```"}md\n# ${characterData[embedData.title].currentHealthPoints} ${"```"}`)
      .addFields(embedData.fields);

    embed.edit({
      content: null,
      embeds: [resetEmbed],
      components: [
        new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId("-5")
              .setStyle("DANGER")
              .setLabel("-5"),
            new MessageButton()
              .setCustomId("-1")
              .setStyle("DANGER")
              .setLabel("-1"),
            new MessageButton()
              .setCustomId("+1")
              .setStyle("SUCCESS")
              .setLabel("+1"),
            new MessageButton()
              .setCustomId("+5")
              .setStyle("SUCCESS")
              .setLabel("+5"),
          ),
      ],
    });

    button.reply({ content: `PV de ${embedData.title} mis à jour.`, ephemeral: true });
  }
};
