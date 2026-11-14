            const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Rendre un membre muet')
    .addUserOption(o => o.setName('user').setDescription('Membre à muter').setRequired(true))
    .addStringOption(o => o.setName('duree').setDescription('Durée (ex: 10m, 1h, 30s). Vide = permanent'))
    .addStringOption(o => o.setName('raison').setDescription('Raison'))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    await interaction.deferReply();
    const target = interaction.options.getUser('user');
    const dureeStr = interaction.options.getString('duree');
    const reason = interaction.options.getString('raison') || 'Aucune raison';

    if (target.id === interaction.client.user.id)
      return interaction.editReply('❌ Je ne peux pas me muter moi-même.');

    let muteRole = interaction.guild.roles.cache.find(r => r.name === 'Muet');
    if (!muteRole) {
      muteRole = await interaction.guild.roles.create({
        name: 'Muet',
        permissions: [],
        color: 0x000000,
        hoist: false,
        mentionable: false
      });
      await interaction.channel.permissionOverwrites.edit(muteRole.id, {
        SendMessages: false,
        AddReactions: false
      });
    }

    if (!target.roles.cache.has(muteRole.id)) {
      await target.roles.add(muteRole.id, reason);
    }

    let dureeTexte = 'permanent';
    if (dureeStr) {
      const match = dureeStr.match(/^(\d+)([smhd])$/);
      if (!match) return interaction.editReply('❌ Format invalide. Utilise ex: 10m, 1h, 30s.');
      const val = parseInt(match[1]);
      const unit = match[2];
      const ms = val * (unit === 's' ? 1000 : unit === 'm' ? 60000 : unit === 'h' ? 3600000 : 86400000);
      dureeTexte = dureeStr;
      setTimeout(async () => {
        try {
          const member = await interaction.guild.members.fetch(target.id);
          if (member && member.roles.cache.has(muteRole.id)) {
            await member.roles.remove(muteRole.id, 'Mute expiré');
          }
        } catch {}
      }, ms);
    }

    const embed = new EmbedBuilder()
      .setColor(0xFF6600)
      .setTitle('🔇 Membre muet')
      .addFields(
        { name: 'Utilisateur', value: `${target.tag}`, inline: true },
        { name: 'Durée', value: dureeTexte, inline: true },
        { name: 'Raison', value: reason, inline: true }
      )
      .setTimestamp();
    await interaction.editReply({ embeds: [embed] });
  }
};   
