const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Afficher la latence du bot'),

  async execute(interaction) {
    const start = Date.now();
    const msg = await interaction.reply('🏓 Mesure...');
    const latency = Date.now() - start;
    await msg.edit(`🏓 Pong ! Latence : **${latency} ms** | WebSocket : **${interaction.client.ws.ping} ms**`);
  }
};   
