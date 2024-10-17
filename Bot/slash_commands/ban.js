const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user from this guild.")
    .addUserOption(option =>
        option
        .setName("target")
        .setDescription("Select the target.")
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Reason of the ban.")
    ),

    async execute(interaction){
        const { options, guild } = interaction;
        const target = options.getUser("target")
        const reason = options.getString("reason")
        const banMember = await guild.members.fetch(target.id)

        const embed = new EmbedBuilder()
        .setTitle("USER BANNED!")
        .setDescription(`The user ${target} has been banned by ${interaction.user.username}.
Reason:
${reason}`)
        .setTimestamp()
        .setFooter({ text: `Action taken in ${guild.name} by ${interaction.user.username}`})
        .setThumbnail("https://cdn.discordapp.com/attachments/1282860255532945418/1284363525011144764/Banned-Rubber-Stamp-Vector-Graphics-8996907-1.jpg?ex=66e65c3e&is=66e50abe&hm=8fe7c00f2ee3ccf9ede7c6c0432d13a03c6aec1302be8de270caf76613914229&")
        .setColor("Green")

        const embed2 = new EmbedBuilder()
        .setTitle("USER BANNED!")
        .setDescription(`The user ${target} has been banned by ${interaction.user.username}.
Reason:
No reason provided.`)
        .setTimestamp()
        .setFooter({ text: `Action taken in ${guild.name} by ${interaction.user.username}`})
        .setThumbnail("https://cdn.discordapp.com/attachments/1282860255532945418/1284363525011144764/Banned-Rubber-Stamp-Vector-Graphics-8996907-1.jpg?ex=66e65c3e&is=66e50abe&hm=8fe7c00f2ee3ccf9ede7c6c0432d13a03c6aec1302be8de270caf76613914229&")
        .setColor("Green")

        const embed3 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("The person you tried to ban left this server!")
        .setColor("Red")

        const embed4 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You can't ban yourself!")
        .setColor("Red")

        const embed5 = new EmbedBuilder()
        .setTitle("Error")
        .setDescription("You don't have permissions to use this command!")
        .setColor("Red")

        try {
        if(reason == null){
            await interaction.reply({embeds: [embed2]}).then(guild.members.ban(target))
        } else if(reason != null){
            await interaction.reply({embeds: [embed]}).then(guild.members.ban(target))
        } else if(interaction.user.id === banMember.id){
            await interaction.reply({embeds: [embed4]})
        } else if(!banMember){
            await interaction.reply({embeds: [embed3]})
        } else if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)){
            await interaction.reply({embeds: [embed5]})
        }
        } catch(error) {
            console.log("Hubo un error al utilizar el comando: ", error)
        }
    }
}
