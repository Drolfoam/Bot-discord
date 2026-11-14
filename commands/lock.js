const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

// ⚠️ Mets les NOMS de tes rôles de modération ici (ex: 'Staff', 'Modération discord', 'Modo', 'Owner')
const ROLES_EXCLUS = ['Modérateur', 'Admin', 'Owner'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Verrouiller le salon (sauf modération)')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply();
    const channel = interaction.channel;

    // Bloquer @everyone
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: false,
      AttachFiles: false,
      EmbedLinks: false
    });

    // Débloquer les rôles de modération
    for (const roleName of ROLES_EXCLUS) {
      const role = interaction.guild.roles.cache.find(r => r.name === roleName);
      if (role) {
        await channel.permissionOverwrites.edit(role.id, {
          SendMessages: true,
          AttachFiles: true,
          EmbedLinks: true
        });
      }
    }

    await interaction.editReply(`🔒 Salon \`${channel.name}\` verrouillé (modération exclue).`);
  }
};   
