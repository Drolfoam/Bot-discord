const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getBalance, addBalance } = require('../economy');

const lastClaim = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Réclamer ta récompense quotidienne'),
  async execute(interaction) {
    const now = Date.now();
    const last = lastClaim.get(interaction.user.id) || 0;
    const cooldown = 24 * 60 * 60 * 1000;

    if (now - last < cooldown) {
      const remaining = Math.ceil((cooldown - (now - last)) / 3600000);
      return interaction.reply(`⏳ Reviens dans **${remaining}h** !`);
    }

    lastClaim.set(interaction.user.id, now);
    const reward = 50 + Math.floor(Math.random() * 51);
    addBalance(interaction.user.id, reward);

    const embed = new EmbedBuilder()
      .setDescription(`🎁 Tu reçois **${reward} pièces** !\nSolde : \`${getBalance(interaction.user.id)}💰\``)
      .setColor('#9b59b6');
    await interaction.reply({ embeds: [embed] });
  }
};   
