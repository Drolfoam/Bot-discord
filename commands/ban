const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un utilisateur')
    .addUserOption(o => o.setName('user').setDescription('Utilisateur à bannir').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison du bannissement'))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    await interaction.deferReply();
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('raison') || 'Aucune raison';

    if (target.id === interaction.client.user.id)
      return interaction.editReply('❌ Je ne peux pas me bannir moi-même.');
    if (!target.bannable)
      return interaction.editReply('❌ Je ne peux pas bannir cet utilisateur.');

    await interaction.guild.members.ban(target.id, { reason, deleteMessageSeconds: 86400 });

    const embed = new EmbedBuilder()
      .setColor(0xFF0000)
      .setTitle('🔨 Membre banni')
      .addFields(
        { name: 'Utilisateur', value: `${target.tag}`, inline: true },
        { name: 'Raison', value: reason, inline: true },
        { name: 'Modérateur', value: `${interaction.user.tag}`, inline: true }
      )
      .setTimestamp();
    await interaction.editReply({ embeds: [embed] });
  }
};   
