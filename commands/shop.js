const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getBalance, addBalance, hasPurchased, markPurchased } = require('../economy');

const SHOP = {
  vip:     { name: '⭐ Rôle VIP', price: 1500, desc: 'Accès au canal VIP + rôle doré' },
  diamant: { name: '💎 Diamant', price: 3000, desc: 'Reçois un diamant' },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('Voir la boutique ou acheter')
    .addStringOption(o =>
      o.setName('item')
       .setDescription('Acheter un item')
       .setRequired(false)
       .addChoices(...Object.entries(SHOP).map(([k, v]) => ({ name: `${v.name} (${v.price})`, value: k })))
    ),
  async execute(interaction) {
    const itemKey = interaction.options.getString('item');

    if (!itemKey) {
      const lines = Object.entries(SHOP).map(([k, v]) =>
        `• **${v.name}** — \`${v.price}💰\` — ${v.desc}`
      ).join('\n');
      const embed = new EmbedBuilder()
        .setTitle('🛒 Boutique du serveur')
        .setDescription(lines + '\n\nUtilise `/shop item:...` pour acheter.')
        .setColor('#e67e22');
      return interaction.reply({ embeds: [embed] });
    }

    const item = SHOP[itemKey];
    const balance = getBalance(interaction.user.id);

    if (hasPurchased(interaction.user.id, itemKey)) {
      return interaction.reply('❌ Tu as déjà acheté cet item.');
    }
    if (balance < item.price) {
      return interaction.reply(`❌ Pas assez de pièces ! Il te faut \`${item.price}\`, tu as \`${balance}\`.`);
    }

    addBalance(interaction.user.id, -item.price);
    markPurchased(interaction.user.id, itemKey);

    const embed = new EmbedBuilder()
      .setDescription(`✅ Tu as acheté **${item.name}** pour \`${item.price}💰\` !\nNouveau solde : \`${balance - item.price}💰\``)
      .setColor('#2ecc71');
    await interaction.reply({ embeds: [embed] });
  }
};   
