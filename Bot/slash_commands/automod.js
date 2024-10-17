const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Setup the automod system.")
    .addSubcommand(command => 
        command
        .setName("flagged-words")
        .setDescription("Block profanity, sexual content, and slurs."))
    .addSubcommand(command => 
        command
        .setName("spam-messages")
        .setDescription("Block messages suspected of spam."))
    .addSubcommand(command => 
        command
            .setName("mention-spam")
            .setDescription("Block messages that contain a certain amount of mentions.")
            .addIntegerOption(option => 
                option
                    .setName("number")
                    .setDescription("The number of mentions required to block a message.")
                    .setRequired(true)))
                    .addSubcommand(command => 
                        command
                            .setName("keyword")
                            .setDescription("Block a certain word set by an user just for this server.")
                            .addStringOption(option => 
                                option
                                    .setName("word")
                                    .setDescription("Write the word you want to block on this server.")
                                    .setRequired(true))),

    async execute(interaction){
        const { guild, options } = interaction;
        const sub = options.getSubcommand();

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({content: "You don't have perms to use this command.", ephemeral: true})
        }
        
        switch(sub){
            case 'flagged-words':
            await interaction.reply({content: 'Loading your automod config...'});

            const rule = await guild.autoModerationRules.create({
                name: `Block profanity, sexual content, and slurs.`,
                creatorId: '1253958969848762448',
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                {
                    presets: [1, 2, 3]
                },
                actions: [
                    {
                    type: 1,
                    metadata: {
                        channel: interaction.channel,
                        duration: 10,
                        customMessage: 'This message was prevented by automoderation.'
                    }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` })
                }, 2000)
            })

            setTimeout(async () => {
                if(!rule) return;

                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("AutoMod")
                .setDescription(":white_check_mark: Your automod rule has been created. All swears will by stopped by automod.")

                await interaction.editReply({content: '', embeds: [embed]})
            }, 3000)

            break;

            case 'keyword':
                await interaction.reply({content: 'Loading your automod config...'});
                const word = options.getString('keyword')

            const rule2 = await guild.autoModerationRules.create({
                name: `Prevents the word ${word} to be used on this server.`,
                creatorId: '1253958969848762448',
                enabled: true,
                eventType: 1,
                triggerType: 4,
                triggerMetadata:
                {
                    keywordFilter: [`${word}`],
                },
                actions: [
                    {
                    type: 1,
                    metadata: {
                        channel: interaction.channel,
                        duration: 10,
                        customMessage: 'This message was prevented by automoderation.'
                        }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` })
                }, 2000)
            })

            setTimeout(async () => {
                if(!rule2) return;

                const embed2 = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("AutoMod")
                .setDescription(`:white_check_mark: Your automod rule has been created. All messages containing the word ${word} will get deleted.`)

                await interaction.editReply({content: '', embeds: [embed2]})
            }, 3000)

            break;

            case 'spam-messages':

            await interaction.reply({content: 'Loading your automod config...'});

            const rule3 = await guild.autoModerationRules.create({
                name: `Prevents spam messages.`,
                creatorId: '1253958969848762448',
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata:
                {
                    //mentionTotalLimit: number
                },
                actions: [
                    {
                    type: 1,
                    metadata: {
                        channel: interaction.channel,
                        duration: 10,
                        customMessage: 'This message was prevented by automoderation.'
                    }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` })
                }, 2000)
            })

            setTimeout(async () => {
                if(!rule3) return;

                const embed3 = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("AutoMod")
                .setDescription(":white_check_mark: Your automod rule has been created. Messages suspected of spam will automaticly get deleted.")

                await interaction.editReply({content: '', embeds: [embed3]})
            }, 3000)
            
            break;

            case 'mention-spam':

            await interaction.reply({content: 'Loading your automod config...'});
            const number = options.getInteger("number")

            const rule4 = await guild.autoModerationRules.create({
                name: `Prevents spam mentions.`,
                creatorId: '1253958969848762448',
                enabled: true,
                eventType: 1,
                triggerType: 5,
                triggerMetadata:
                {
                    mentionTotalLimit: number
                },
                actions: [
                    {
                    type: 1,
                    metadata: {
                        channel: interaction.channel,
                        duration: 10,
                        customMessage: 'This message was prevented by automoderation.'
                    }
                    }
                ]
            }).catch(async err => {
                setTimeout(async () => {
                    console.log(err);
                    await interaction.editReply({ content: `${err}` })
                }, 2000)
            })

            setTimeout(async () => {
                if(!rule4) return;

                const embed4 = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("AutoMod")
                .setDescription(":white_check_mark: Your automod rule has been created. Messages that are suspected to have spam mentions will get deleted.")

                await interaction.editReply({content: '', embeds: [embed4]})
            }, 3000)
        }
    }
}