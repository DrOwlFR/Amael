const { Command } = require("sheweny");
const { readFileSync, writeFile } = require("fs");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class CharacterCreateCommand extends Command {
  constructor(client) {
    super(client, {
      name: "charactercreate",
      category: "JDR",
      description: "Créer le fiche du personnage.",
      usage: "charactercreate [nom] [vie]",
      examples: ["charactercreate Amaël 100000"],
      userPermissions: ["MANAGE_GUILD"],
      options: [
        {
          name: "nom",
          description: "Nom du personnage.",
          type: "STRING",
          required: true,
        },
        {
          name: "race",
          description: "Race du personnage.",
          type: "STRING",
          required: true,
          choices: [
            { name: "Elfe noir.e", value: "Elfe noir.e" },
            { name: "Elfe sylvestre", value: "Elfe sylvestre" },
            { name: "Guérisseur.euse", value: "Guérisseur.euse" },
            { name: "Humain.e", value: "Humain.e" },
            { name: "Nekomimi", value: "Nekomimi" },
            { name: "Sorcier.e", value: "Sorcier.e" },
          ],
        },
        {
          name: "classe",
          description: "Classe du personnage.",
          type: "STRING",
          required: true,
          choices: [
            { name: "Assassin", value: "Assassin" },
            { name: "Guerrier.e", value: "Guerrier.e" },
            { name: "Archer.e", value: "Archer.e" },
            { name: "Équilibré.e", value: "Équilibré.e" },
          ],
        },
        {
          name: "vie",
          description: "Points de vie du personnage",
          type: "INTEGER",
          required: true,
        },
      ],
    });
  }

  async execute(interaction) {
    const { options, channel } = interaction;

    const name = options.getString("nom");
    const race = options.getString("race");
    const characterClass = options.getString("classe");
    const health = options.getInteger("vie");
    const character = {
      name,
      race,
      characterClass,
      totalHealthPoints: health,
      currentHealthPoints: health,
    };

    const charactersData = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", "utf-8"));
    charactersData[name] = character;

    writeFile("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", JSON.stringify(charactersData, null, 4), "utf8", (err) => {
      if (err) {
        interaction.reply({ content: "<:shield_cross:904023640453050438> Le personnage n'a pas pu être créé dans la base de données.", ephemeral: true });
        return console.error(err);
      }
    });

    interaction.reply({
      embeds: [
        this.client.functions.embed()
          .setTitle("<:shield_check:904023639840669737> Personnage créé")
          .setDescription(`• Nom : ${name}\n• Race : ${race}\n• Classe : ${characterClass}\n• Points de vie : ${health}`),
      ],
      ephemeral: true,
    });

    channel.send({
      embeds: [
        this.client.functions.embed()
          .setTitle(`${name}`)
          .setDescription(`**Points de vie actuels :** ${"```"}md\n# ${health} ${"```"}`)
          .addFields([
            { name: "Classe", value: `${characterClass}` },
            { name: "Race", value: `${race}` },
            { name: "Points de vie totaux", value: `${health}` },
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

  }
};