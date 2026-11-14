const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rules')
    .setDescription('Afficher le règlement du serveur'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0x00AAFF)
      .setTitle('📜 Règlement du serveur')
      .setImage('89a693db-d2ad-452b-842c-8c0397ba015c-1.png')
      .setFooter({ text: interaction.guild.name })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
