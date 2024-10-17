const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you want to timeout.")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option
        .setName("time")
        .setDescription("Time of the timeout.")
        .setRequired(true)
    ),

    async execute(interaction){
        const { options, user } = interaction;

        const userTimeouted = options.getMember("user");
        const time = options.getInteger("time");

        const seconds = time * 1000;

        const embed = new EmbedBuilder()
        .setTitle(`Timeout`)
        .setDescription(`The user ${userTimeouted} got a timeout of ${time} seconds.`)
        .setColor("Red")
        .setFooter({text: `Timeout made by ${user.displayName}`})
        .setTimestamp()

        try{
        await interaction.reply({embeds: [embed]}).then(userTimeouted.timeout(seconds));
        } catch(error){
        await interaction.reply({content: "Hubo un error al ejecutar el comando."}).then(
            console.log("Hubo un error con el timeout:", error))
        }
    }
};