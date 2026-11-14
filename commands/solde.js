const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getBalance } = require('../economy');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('solde')
    .setDescription('Voir ton solde ou celui d\'un autre')
    .addUserOption(o => o.setName('user').setDescription('Membre')),
  async execute(interaction) {
    const target = interaction.options.getUser('user') || interaction.user;
    const balance = getBalance(target.id);
    const embed = new EmbedBuilder()
      .setAuthor({ name: target.username, iconURL: target.displayAvatarURL() })
      .setDescription(`💰 **Solde** : \`${balance}\` pièces`)
      .setColor('#f1c40f');
    await interaction.reply({ embeds: [embed] });
  }
};   
