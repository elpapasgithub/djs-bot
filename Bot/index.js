const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs");
const configs = require("./config.json");
let status = require("discord.js");
const mongoose = require("mongoose");
const logs = require("discord-logs");

const client = new Client({ 
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
 })

client.on(Events.ClientReady, readyClient => {
	console.log(`Ha encendido como ${readyClient.user.tag}`);
});

//SlashCommands charging

client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    client.commands.set(command.data.name, command);
});

//SlashCommands register

const { REST, Routes } = require('discord.js');

const commands = [];
const commandFiles = fs.readdirSync('./slash_commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./slash_commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(configs.CLIENT_TOKEN);

(async () => {
    try {
        console.log('Registrando comandos...');
        await rest.put(
            Routes.applicationCommands(configs.clientId),
            { body: commands }
        );
        console.log('Comandos registrados exitosamente.');
    } catch (error) {
        console.error('Error al registrar los comandos:', error);
    }
})();


//SlashCommands execution

client.on("ready", async (client) => {
    console.log('Bot Online!');

    setInterval(() => {
    let random = Math.floor(Math.random() * status.lenght);
    client.user.setActivity(status[random]);
    }, 10000);
});

//Handler :v

client.on(Events.MessageCreate, async (message) => {
    if(message.author.bot) return;
    if(!message.content.startsWith('!')) return;
    const args = message.content.slice(1).split(' ')[0]
  
    try {
      const command = require(`./Prefix_commands/${args}`);
      command.run(message)
    } catch (error) {
      console.log(`Ha ocurrido un error al utilizar este comando. !${args}`, error.message);
    }
});
  
  //MongoDB DataBase
  
  client.on(Events.ClientReady, async () => {
      console.log(`Conectado como ${client.user.username}!`)
  
      await mongoose.connect(configs.mongopass, {
    
      })
  
      if (mongoose.connect) {
          console.log("El bot se conectó a la base de datos.")
      }
  
  });

//Logs

const { handleLogs } = require("./Moderation/logs");

logs(client, {
    debug: true
})

//Parte de ChatGPT en el index.js

const { GoogleGenerativeAI } = require("@google/generative-ai");
const gpt = require("./Schemas/gptSchema");

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    const Data = await gpt.findOne({ GuildId: message.guildId });
    if (Data === null) return;

    const API_KEY = "AIzaSyC32fU1gNXrsOBy-4_azidqG_MktHlrgxw";
    const MODEL = "gemini-pro";

    const ai = new GoogleGenerativeAI(API_KEY);
    const model = ai.getGenerativeModel({
      model: MODEL,
    });

    if (!Data || message.channel.id !== Data.ChannelId) return;

    const { response } = await model.generateContent(message.cleanContent);
    const generatedText = response.text().trim();

    // Asegúrese de que la respuesta no está vacía y dentro del límite de caracteres
    const finalResponse =
      generatedText.length > 0
        ? generatedText.length > 2000
          ? generatedText.substring(0, 1997) + "..."
          : generatedText
        : "Lo siento, no pude generar una respuesta apropiada.";

    await message.reply({
      content: finalResponse,
      allowedMentions: {
        parse: ["everyone", "roles", "users"],
      },
    });
  } catch (e) {
    console.log(e);
  }
});

//Interaction Create: Commands

client.on("interactionCreate", async (interaction) => {

    if(interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        command.execute(interaction).catch(console.error);
    }
});

//Handler de botones

require('../Bot/Interactions/buttonHandler')(client);

//Client login

client.login(configs.CLIENT_TOKEN).then(() => {
    handleLogs(client)
})