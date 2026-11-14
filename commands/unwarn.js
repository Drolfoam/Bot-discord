const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const WARN_FILE = path.join(__dirname, '..', 'warnings.json');

function loadWarnings() {
  try { return JSON.parse(fs.readFileSync(WARN_FILE, 'utf8')); } catch { return {}; }
}
function saveWarnings(data) {
  fs.writeFileSync(WARN_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('Retirer le dernier avertissement d\'un membre')
    .addUserOption(o => o.setName('user').setDescription('Membre concerné').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const data = loadWarnings();
    const key = `${interaction.guild.id}_${target.id}`;

    if (!data[key] || data[key].count === 0)
      return interaction.reply({ content: '❌ Cet utilisateur n\'a aucun avertissement.', ephemeral: true });

    const lastWarn = data[key].history.pop();
    data[key].count--;

    if (data[key].count === 0) {
      delete data[key];
    }
    saveWarnings(data);

    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('✅ Avertissement retiré')
      .addFields(
        { name: 'Utilisateur', value: `${target.tag}`, inline: true },
        { name: 'Raison retirée', value: lastWarn.reason, inline: true },
        { name: 'Reste', value: `${data[key] ? data[key].count : 0} avertissement(s)`, inline: true }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};   
