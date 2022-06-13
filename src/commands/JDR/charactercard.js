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
    const statistics = characterInfo.statistics;
    const image = characterInfo.image;

    const embed = this.client.functions.embed()
      .setTitle(`${name}`)
      .setDescription(`**Points de vie actuels :** ${"```"}md\n# ${characterInfo.currentHealthPoints} ${"```"}`)
      .addFields([
        { name: "Classe", value: `${characterInfo.characterClass}` },
        { name: "Race", value: `${characterInfo.race}` },
        { name: "Points de vie totaux", value: `${characterInfo.totalHealthPoints}` },
        { name: "Statistiques", value: `• **Agilité** : ${statistics.agility}/10\n• **Endurance** : ${statistics.endurance}/10\n• **Force** : ${statistics.strength}/10\n• **Précision** : ${statistics.precision}/10\n• **Résistance physique** : ${statistics.physicalResistance}/10\n• **Vitesse** : ${statistics.speed}/10\n\n• **Magie réparatrice** : ${statistics.restorativeMagic}/10\n• **Magie destructrice** : ${statistics.destructiveMagic}/10\n• **Résistance magique** : ${statistics.magicalResistance}/10\n\n• **Courage** : ${statistics.courage}/10\n• **Débrouillardise** : ${statistics.resourcefulness}/10\n• **Éloquence** : ${statistics.eloquence}/10\n• **Perspicacité** : ${statistics.judgment}/10\n• **Sociabilité** : ${statistics.sociability}/10\n• **Tempérance** : ${statistics.temperance}/10` },
        { name: "Histoire", value: `*[${name}](${characterInfo.background})*` },
      ]);

    if (image && image.startsWith("https://")) embed.setThumbnail(image);

    channel.send({
      embeds: [
        embed,
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