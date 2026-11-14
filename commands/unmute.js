const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Retirer le mute d\'un membre')
    .addUserOption(o => o.setName('user').setDescription('Membre à démuter').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    await interaction.deferReply();
    const target = interaction.options.getUser('user');
    const muteRole = interaction.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

    if (!muteRole) {
      return interaction.editReply('❌ Le rôle "Muted" n\'existe pas sur ce serveur.');
    }
    if (!target.roles.cache.has(muteRole.id)) {
      return interaction.editReply('❌ Ce membre n\'est pas muté.');
    }

    await target.roles.remove(muteRole.id);
    await interaction.editReply(`✅ **${target}** a été démuté.`);
  }
};   
