const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides info about server'),
    async execute(interaction) {
        await interaction.reply(`O server é: ${interaction.guild.name}
        e tem: ${interaction.guild.memberCount} membros.`);
    },
};