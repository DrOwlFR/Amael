const { Command } = require("sheweny");

module.exports = class RollCommand extends Command {
  constructor(client) {
    super(client, {
      name: "roll",
      category: "JDR",
      description: "Jète un ou plusieurs dès du nombre de faces désiré.",
      usage: "roll [nombre] <nombre-de-dès>",
      examples: ["roll 100", "roll 218"],
      options: [
        {
          name: "nombre",
          description: "Nombre du faces du dè",
          type: "INTEGER",
          required: true,
        },
        {
          name: "nombre-de-dès",
          description: "Nombre de lancés que vous souhaitez faire.",
          type: "INTEGER",
          required: false,
        },
      ],
    });
  }

  async execute(interaction) {

    const diceFaces = interaction.options.getInteger("nombre");
    let dicesNumber = interaction.options.getInteger("nombreroll");
    if (!dicesNumber) dicesNumber = 1;

    let rolls = "";
    let rollsSum = 0;
    if (dicesNumber > 1) {
      for (let x = 0; x < dicesNumber; x++) {
        const roll = Math.floor(Math.random() * diceFaces);
        rolls = rolls + " " + roll;
        rollsSum = rollsSum + roll;
      }
      const display = `${"```"}md\n#${rolls}\nMoyenne : ${rollsSum / dicesNumber}\n> Détails : [${dicesNumber}roll${diceFaces} (${rolls} )]${"```"}`;

      return interaction.reply({
        embeds: [
          this.client.functions.embed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .addField("Vous avez obtenu...", display)
            .setThumbnail("https://cdn.discordapp.com/attachments/906273410924040253/906273908477542421/des.png"),
        ],
      });
    }

    for (let x = 0; x < dicesNumber; x++) {
      const roll = Math.floor(Math.random() * diceFaces);
      rolls = rolls + " " + roll;
    }
    if (dicesNumber < 2) rolls = rolls.substring(1);
    const display = `${"```"}md\n# ${rolls}\nDétails : [${dicesNumber}roll${diceFaces} (${rolls})]${"```"}`;

    return interaction.reply({
      embeds: [
        this.client.functions.embed()
          .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
          .addField("Vous avez obtenu...", display)
          .setThumbnail("https://cdn.discordapp.com/attachments/906273410924040253/906273908477542421/des.png"),
      ],
    });

  }
};