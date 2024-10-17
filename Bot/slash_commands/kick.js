const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks the selected user.")
    .addUserOption(option =>
        option
        .setName("target")
        .setDescription("Select the user you want to kick.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Give the reason why you want to kick the user.")
        .setRequired(true)
    ),

    async execute(interaction){
        const { options } = interaction;
        const getKick = options.getUser("target")
        const getReason = options.getString("reason")
        const { guild, member } = interaction;

        const embed = new EmbedBuilder()
        .setTitle("**USER KICKED**")
        .setDescription(`User ${getKick} has been kicked by ${interaction.user}.
        Reason: ${getReason}`)
        .setColor("Green")
        .setFooter({ text: `Action executed in ${guild.name} server.`})

        const embed2 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You don't have the permissions to execute this command!")
        .setColor("Red")

        const embed3 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can't kick a member with a higher role than yours!")
        .setColor("Red")

        const embed4 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can't kick yourself!")
        .setColor("DarkGold")

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({embeds: [embed2], ephemeral: true})
        
        if (member.roles.highest.position >= interaction.member.roles.highest.postion) return await interaction.reply({embeds: [embed3], ephemeral: true})

        if (interaction.member.id === getKick.id) return await interaction.reply({embeds: [embed4], ephemeral: true})
        
        await interaction.reply({embeds: [embed]}).then(getKick.kick())
        
    }
}