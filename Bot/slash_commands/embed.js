const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed-create')
        .setDescription('Envía un mensaje embed')
        .addStringOption(option =>
            option
            .setName('title')
            .setDescription('Set the title of the embed.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('description')
            .setDescription('Set the description of the embed.')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('footer')
            .setDescription('Set the footer of the embed.')
        )
        .addStringOption(option =>
            option
            .setName('firstfield')
            .setDescription('Set the first field of the embed.')
        )
        .addStringOption(option =>
            option
            .setName('secondfield')
            .setDescription('Set the second field of the embed.')
        )
        .addStringOption(option =>
            option
            .setName('firstfd')
            .setDescription('Set the first footer description of the embed.')
        )
        .addStringOption(option =>
            option
            .setName('secondfd')
            .setDescription('Set the second footer description of the embed.')
        )
        .addAttachmentOption(option =>
            option
            .setName('thumnbail')
            .setDescription('Set the thumbnail for the embed.')
        )
        .addAttachmentOption(option =>
            option
            .setName('image')
            .setDescription('Set an image for the embed.')
        )
        .addBooleanOption(option =>
            option
            .setName('timestamp')
            .setDescription('Do you want the embed to have a timestamp?')
        ),

    async execute(interaction) {

        const { options } = interaction;

        const getTitle = options.getString('title')
        const getDescription = options.getString('description')
        const getFooter = options.getString('footer')
        const getField1 = options.getString('firstfield')
        const getField2 = options.getString('secondfield')
        const getFD1 = options.getString('firstfd')
        const getFD2 = options.getString('secondfd')
        const getThumbnail = options.getAttachment('thumbnail')
        const getImage = options.getAttachment('image')

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(getTitle)
            .setDescription(getDescription)
            .addFields(
                { name: getField1, value: getFD1, inline: true },
                { name: getField2, value: getFD2, inline: true }
            )
            .setTimestamp()
            .setFooter({ text: getFooter })
            .setThumbnail(getThumbnail)
            .setImage(getImage);
        
        await interaction.reply({ embeds: [embed] });
    }
};