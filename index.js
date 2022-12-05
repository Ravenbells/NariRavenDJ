// Handling
const fs = require('node:fs');
const path = require('node:path');
// Classes required 
const { Client, Events, GatewayIntentBits, Collection } =  require('discord.js');
const { disc_tkn } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create handling commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(
    file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
    else {
        console.log(`[WARNING] Comando em $(filePath) sem atributo de data ou execução.`)
    }
}

// Code below run only once
client.once(Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});

// Listening
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return; 
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Sem comando ${interaction.commandName} encontrado.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Erro ao executar esse comando:", ephemeral: true });
    }
});

client.login(disc_tkn);