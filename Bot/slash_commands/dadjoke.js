const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random dad joke."),

    async execute(interaction){

        async function getJoke() {
            const response = await fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            return data.joke;
        }

        const joke = await getJoke()

        const embed = new EmbedBuilder()
        .setTitle("Dad joke!")
        .setDescription(joke)
        .setTimestamp()
        .setFooter({text: `Command executed by: ${interaction.user.username}`})

        await interaction.reply({embeds: [embed]})
    }
}