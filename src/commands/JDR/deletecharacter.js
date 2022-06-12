const { Command } = require("sheweny");
const { readFileSync, writeFile } = require("fs");

module.exports = class CharacterDeleteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "characterdelete",
      category: "JDR",
      description: "Supprime un personnage de la base de données.",
      usage: "characterdelete [nom]",
      examples: ["charactercreate Amaël"],
      userPermissions: ["MANAGE_GUILD"],
      options: [
        {
          name: "nom",
          description: "Nom du personnage.",
          type: "STRING",
          required: true,
          autocomplete: true,
        },
      ],
    });
  }

  async execute(interaction) {

    const { options } = interaction;
    const name = options.getString("nom");
    const charactersData = JSON.parse(readFileSync("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json"), "utf-8");

    delete charactersData[name];
    writeFile("D:/Documents/DEV/8 - Amaël/src/structures/charactersData.json", JSON.stringify(charactersData, null), "utf8", (err) => {
      if (err) {
        interaction.reply({ content: "<:shield_cross:904023640453050438> Le personnage n'a pas pu être supprimé de la base de données.", ephemeral: true });
        return console.error(err);
      }
    });

    interaction.reply({ content: `<:shield_check:904023639840669737> ${name} a été supprimé avec succès.`, ephemeral: true });
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