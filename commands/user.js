const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides info about user'),
    async execute(interaction) {
        await interaction.reply(`executado pelo: 
            ${interaction.user.username}, que entrou no servidor em: 
            ${interaction.member.joinedAt}.`)
    },
};