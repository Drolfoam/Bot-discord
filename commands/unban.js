const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Débannir un utilisateur')
    .addStringOption(o => o.setName('user').setDescription('ID de l\'utilisateur à débannir').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    await interaction.deferReply();
    const targetId = interaction.options.getString('user');
    const reason = interaction.options.getString('raison') || 'Aucune raison';

    try {
      await interaction.guild.members.unban(targetId, reason);
      await interaction.editReply(`✅ Utilisateur \`${targetId}\` a été débanni.`);
    } catch {
      await interaction.editReply('❌ ID invalide ou utilisateur non banni.');
    }
  }
};   
