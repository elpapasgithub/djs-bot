const fs = require('fs');

module.exports = (client) => {
  client.buttons = new Map();

  const buttonFiles = fs.readdirSync('./Components').filter(file => file.endsWith('.js'));

  for (const file of buttonFiles) {
    const button = require(`../Components/${file}`);
    client.buttons.set(button.id, button);
  }

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);
    
    if (!button) return console.error(`No se encontró un handler para el botón con ID: ${interaction.customId}`);

    try {
      await button.execute(interaction);
    } catch (error) {
      console.error(`Error ejecutando el botón: ${interaction.customId}`, error);
    }
  });
};