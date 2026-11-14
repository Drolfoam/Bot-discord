const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulser un membre')
    .addUserOption(o => o.setName('user').setDescription('Membre à expulser').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    await interaction.deferReply();
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('raison') || 'Aucune raison';

    if (!target.kickable)
      return interaction.editReply('❌ Je ne peux pas expulser ce membre.');

    await target.kick(reason);
    const embed = new EmbedBuilder()
      .setColor(0xFFAA00)
      .setTitle('👢 Membre expulsé')
      .addFields(
        { name: 'Utilisateur', value: `${target.tag}`, inline: true },
        { name: 'Raison', value: reason, inline: true }
      )
      .setTimestamp();
    await interaction.editReply({ embeds: [embed] });
  }
};   
