const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get Nexus help."),

    async execute(interaction) {

        const menu = new StringSelectMenuBuilder()
        .setCustomId("help-menu")
        .setPlaceholder("Select the help you want from me!")
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel("Categories")
            .setValue("categories-help")
            .setDescription("See the categories of my commands here!"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Moderation")
            .setValue("moderation-help")
            .setDescription("Get help with moderation commands.")
            .setEmoji("<:tools:>"),
            new StringSelectMenuOptionBuilder()
            .setLabel("NSFW")
            .setValue("nsfw-help")
            .setDescription("Get help with NSFW commands.")
            .setEmoji("<:peach:>"),
            new StringSelectMenuOptionBuilder()
            .setLabel("Config")
            .setValue("config-help")
            .setDescription("Personalize your experience.")
            .setEmoji(":gear:"),
            new StringSelectMenuOptionBuilder()
            .setLabel
        )

        const embed = new EmbedBuilder()
        .setTitle("Nexus help is here!")
        .setDescription(`Hello! I'm Nexus, thanks for using me.
You will have a menu to select what do you want to know about me.
I hope I meet your expectations!`)

        const row = new ActionRowBuilder()
        .addComponents(menu)

        await interaction.reply({embeds: [embed], components: [row]})
    }
}