const { REST, Routes } = require('discord.js');
const { clientId, guildId, disc_tkn } = require ('./config.json');
const fs = require ('node:fs');

const commands = [];
// Grab commands from commands directory
const commandFiles = fs.readdirSync('./commands').filter(
    file => file.endsWith('.js'));

// Grab the SlashCommandBuiilder#toJSON() output of each command's data deployment
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10'}).setToken(disc_tkn);

    // and deploy commands:
    (async () => {
        try {
            console.log(`Refreshing ${commands.length} application (/) commands...`);

            // The put method is used to Fully refresh 
            // all commands in the guild with the current set
            const data = await rest.put(
                //Routes.applicationGuildCommands(clientId, guildId),
                Routes.applicationCommands(clientId),
                { body: commands },
            );
            
            console.log(`Successfully reloaded ${data.length} app (/) commands.`);
        } catch (error) {
            // Catch and log errors!
            console.error(error);
        }
    })();