const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bottime')
    .setDescription('Depuis quand le bot est en ligne'),

  async execute(interaction) {
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);

    const embed = new EmbedBuilder()
      .setColor(0x00AAFF)
      .setTitle('⏱️ Temps en ligne')
      .setDescription(`**${days}j ${hours}h ${mins}min ${secs}s**`)
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};   
