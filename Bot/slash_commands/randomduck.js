const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("randomduck")
    .setDescription("Get a random duck image."),

    async execute(interaction){
        async function getDuck() {
            const response = await fetch('https://random-d.uk/api/v2/random', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            return data.url;
        }

        const duckImageUrl = await getDuck();

        const embed = new EmbedBuilder()
        .setTitle("Random Duck!")
        .setImage(duckImageUrl)
        .setFooter({text: "Powered by Random-Duck"})
        .setTimestamp()

        await interaction.reply({embeds: [embed]});
    }
};