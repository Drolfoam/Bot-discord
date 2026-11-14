const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Déverrouiller le salon actuel')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    await interaction.deferReply();
    const channel = interaction.channel;
    await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
      SendMessages: null,
      AttachFiles: null,
      EmbedLinks: null
    });
    await interaction.editReply(`🔓 Salon \`${channel.name}\` déverrouillé.`);
  }
};   
