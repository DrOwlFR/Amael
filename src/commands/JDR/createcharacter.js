const { Command } = require("sheweny");
const { readFileSync, writeFile } = require("fs");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = class CharacterCreateCommand extends Command {
  constructor(client) {
    super(client, {
      name: "charactercreate",
      category: "JDR",
      description: "Crée le fiche du personnage.",
      usage: "charactercreate [nom] [race] [classe] [vie]",
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
        {
          name: "agilité",
          description: "Statistique d'agilité du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "endurance",
          description: "Statistique d'endurance du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "force",
          description: "Statistique de force physique du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "précision",
          description: "Statistique de précision du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "résistance-physique",
          description: "Statistique de résistance physique du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "vitesse",
          description: "Statistique de vitesse physique du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "magie-réparatrice",
          description: "Statistique de magie réparatrice du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "magie-destructrice",
          description: "Statistique de magie destructrice du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "résistance-magique",
          description: "Statistique de résistance magique du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "courage",
          description: "Statistique de courage du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "débrouillardise",
          description: "Statistique de débrouillardise du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "éloquence",
          description: "Statistique de éloquence du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "perspicacité",
          description: "Statistique de perspicacité du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "sociabilité",
          description: "Statistique de sociabilité du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "tempérance",
          description: "Statistique de tempérance du personnage.",
          type: "INTEGER",
          required: true,
          minValue: 1,
          maxValue: 10,
        },
        {
          name: "image",
          description: "Image du personnage (en lien)",
          type: "STRING",
          required: false,
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
    const image = options.getString("image");

    const agility = options.getInteger("agilité");
    const endurance = options.getInteger("endurance");
    const strength = options.getInteger("force");
    const precision = options.getInteger("précision");
    const physicalResistance = options.getInteger("résistance-physique");
    const speed = options.getInteger("vitesse");

    const restorativeMagic = options.getInteger("magie-réparatrice");
    const destructiveMagic = options.getInteger("magie-destructrice");
    const magicalResistance = options.getInteger("résistance-magique");

    const courage = options.getInteger("courage");
    const resourcefulness = options.getInteger("débrouillardise");
    const eloquence = options.getInteger("éloquence");
    const judgment = options.getInteger("perspicacité");
    const sociability = options.getInteger("sociabilité");
    const temperance = options.getInteger("tempérance");


    const character = {
      name,
      race,
      characterClass,
      totalHealthPoints: health,
      currentHealthPoints: health,
      image,
      statistics: {
        agility,
        endurance,
        strength,
        precision,
        physicalResistance,
        speed,
        restorativeMagic,
        destructiveMagic,
        magicalResistance,
        courage,
        resourcefulness,
        eloquence,
        judgment,
        sociability,
        temperance,
      },

    };

    const charactersData = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", "utf-8"));
    charactersData[name] = character;

    writeFile("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", JSON.stringify(charactersData, null, 4), "utf8", (err) => {
      if (err) {
        interaction.reply({ content: "<:shield_cross:904023640453050438> Le personnage n'a pas pu être créé dans la base de données.", ephemeral: true });
        return console.error(err);
      }
    });

    const validationEmbed = this.client.functions.embed()
      .setTitle("<:shield_check:904023639840669737> Personnage créé")
      .setDescription(`• Nom : ${name}\n• Race : ${race}\n• Classe : ${characterClass}\n• Points de vie : ${health}\n\n• Agilité : ${agility}/10\n• Endurance : ${endurance}/10\n• Force : ${strength}/10\n• Précision : ${precision}/10\n• Résistance physique : ${physicalResistance}/10\n• Vitesse : ${speed}/10\n\n• Magie réparatrice : ${restorativeMagic}\n• Magie destructrice : ${destructiveMagic}\n• Résistance magique : ${magicalResistance}\n\n• Courage : ${courage}\n• Débrouillardise : ${resourcefulness}\n• Éloquence : ${eloquence}\n• Perspicacité : ${judgment}\n• Sociabilité : ${sociability}\n• Tempérance : ${temperance}`);

    const channelEmbed = this.client.functions.embed()
      .setTitle(`${name}`)
      .setDescription(`**Points de vie actuels :** ${"```"}md\n# ${health} ${"```"}`)
      .addFields([
        { name: "Classe", value: `${characterClass}` },
        { name: "Race", value: `${race}` },
        { name: "Points de vie totaux", value: `${health}` },
        { name: "Statistiques", value: `• Agilité : ${agility}/10\n• Endurance : ${endurance}/10\n• Force : ${strength}/10\n• Précision : ${precision}/10\n• Résistance physique : ${physicalResistance}/10\n• Vitesse : ${speed}/10\n\n• Magie réparatrice : ${restorativeMagic}\n• Magie destructrice : ${destructiveMagic}\n• Résistance magique : ${magicalResistance}\n\n• Courage : ${courage}\n• Débrouillardise : ${resourcefulness}\n• Éloquence : ${eloquence}\n• Perspicacité : ${judgment}\n• Sociabilité : ${sociability}\n• Tempérance : ${temperance}` },
      ]);

    if (image && image.startsWith("https://")) {
      validationEmbed.setThumbnail(image);
      channelEmbed.setThumbnail(image);
    }

    await interaction.reply({
      embeds: [
        validationEmbed,
      ],
      ephemeral: true,
    });

    channel.send({
      embeds: [
        channelEmbed,
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