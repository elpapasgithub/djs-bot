const {
    PermissionsBitField,
    SlashCommandBuilder,
    ChannelType,
  } = require("discord.js");
  const gpt = require("../Schemas/gptSchema");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("setchannel-ia")
      .setDescription("Permite configurar canales para que la IA responda.")
      .addChannelOption((option) =>
        option
          .setName("canal")
          .setDescription("Canal del Chat IA")
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildText)
      ),
    async execute(interaction) {
      const { options } = interaction;
  
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        return interaction.reply({
          content: "Solo los administradores pueden usar este comando.",
          ephemeral: true,
        });
      }
  
      const channel = options.getChannel("canal");
  
      const Data = await gpt.findOne({ GuildId: interaction.guild.id });
      try {
        if (!Data) {
          await gpt.create({
            GuildId: interaction.guild.id,
            ChannelId: channel.id,
          });
          return await interaction.reply({
            content: `Canal ${channel} añadido como permitido para la IA.`,
          });
        }
      } catch (error) {
        console.log(error);
    }
  },
};