const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("See user info.")
    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("The user you want to see about.")
        .setRequired(false)
    ),

    async execute(interaction){
        const { options, guild, member } = interaction;

        const optionalUser = options.getUser("user");
        const optionalMember = options.getMember("user");

        const user = interaction.user;

        let joinDate = `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`;
        let accountCreationDate = `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`;

        const embed = new EmbedBuilder()
        .setAuthor({name: `Info about ${user.displayName}`})
        .setTitle("User info")
        .setDescription(`You are going to see your info.
**User Info**

User ID: ${user.id}

Display Name: ${user.displayName}

Username: ${user.username}

Joined Discord: ${accountCreationDate}

**Server Info**

Server: ${guild.name}

Join Date: ${joinDate}

Server Display Name: ${member.displayName}

Member Roles: ${member.roles}

`)
        .setColor("Aqua")
        .setFooter({text: `Command executed by: ${user.username}`})
.setTimestamp()

        if(optionalUser == null){
            await interaction.reply({embeds: [embed]});
        } else {
            await interaction.reply({embeds: [embed2]})
        }
    }
};