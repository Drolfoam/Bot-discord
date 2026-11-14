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
    .setName('warn')
    .setDescription('Avertir un membre')
    .addUserOption(o => o.setName('user').setDescription('Membre à avertir').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison de l\'avertissement').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('raison');

    const data = loadWarnings();
    const key = `${interaction.guild.id}_${target.id}`;
    if (!data[key]) data[key] = { userId: target.id, username: target.tag, count: 0, history: [] };
    data[key].count++;
    data[key].history.push({ reason, by: interaction.user.tag, date: new Date().toISOString() });
    saveWarnings(data);

    const embed = new EmbedBuilder()
      .setColor(0xFFFF00)
      .setTitle('⚠️ Avertissement')
      .addFields(
        { name: 'Utilisateur', value: `${target.tag}`, inline: true },
        { name: `Avertissement n°${data[key].count}`, value: reason, inline: true },
        { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true }
      )
      .setTimestamp();
    await interaction.reply({ embeds: [embed] });
  }
};   
