const { MessageActionRow, MessageButton } = require("discord.js");
const { Command } = require("sheweny");
const { readFileSync } = require("fs");

module.exports = class CharacterCardCommand extends Command {
  constructor(client) {
    super(client, {
      name: "charactercard",
      category: "JDR",
      description: "Envoie la carte du personnage.",
      usage: "charactercard [nom]",
      examples: ["charactercard Amaël"],
      userPermissions: ["MANAGE_GUILD"],
      options: [{
        name: "nom",
        description: "Nom du personnage.",
        type: "STRING",
        required: true,
        autocomplete: true,
      }],
    });
  }

  async execute(interaction) {

    const { options, channel } = interaction;
    const name = options.getString("nom");
    const charactersData = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json"), "utf-8");
    const characterInfo = charactersData[name];

    channel.send({
      embeds: [
        this.client.functions.embed()
          .setTitle(`${characterInfo.name}`)
          .setDescription(`**Points de vie actuels :** ${"```"}md\n# ${characterInfo.currentHealthPoints} ${"```"}`)
          .addFields([
            { name: "Classe", value: `${characterInfo.characterClass}` },
            { name: "Race", value: `${characterInfo.race}` },
            { name: "Points de vie totaux", value: `${characterInfo.totalHealthPoints}` },
          ]),
      ],
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

    interaction.reply({ content: "Fiche personnage envoyée.", ephemeral: true });
  }
  onAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);
    const characters = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", "utf-8"));
    const choices = [];
    for (const character in characters) {
      choices.push(character);
    }
    const filteredChoices = choices.filter((choice) => choice.startsWith(focusedOption.value)).slice(0, 25);

    interaction
      .respond(filteredChoices.map((choice) => ({ name: choice, value: choice })))
      .catch(console.error);
  }
};