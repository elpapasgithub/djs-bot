const { SlashCommandBuilder, EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const logSchema = require('../Schemas/schemaLogs');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setup-logs')
    .setDescription('Set up logs for this server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("Channel for logs.")
        .setRequired(true)
    ),

    async execute(interaction){
        const {channel, guildId, options} = interaction;

        const logChannel = options.getChannel("channel") || channel;
        const embed = new EmbedBuilder();

        try {
            const data = await logSchema.findOne({ Guild: guildId });
        
            if (!data) {
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });
        
                embed.setDescription('Data was correctly sent to the database.')
                    .setTitle('Logs!')
                    .setColor("Green")
                    .setTimestamp();
            } else {
                await logSchema.deleteOne({ Guild: guildId });
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                });
        
                embed.setDescription('Old data was successfully replaced.')
                    .setTitle('Replaced data')
                    .setColor("Blue")
                    .setTimestamp();
            }
        } catch (error) {
            embed.setDescription('Something went wrong, contact support.')
                .setColor("Red")
                .setTitle("Error")
                .setTimestamp();
            console.error('Error interacting with the database:', error);
        }
            return interaction.reply({embeds: [embed], ephemeral: true})
        }
    }