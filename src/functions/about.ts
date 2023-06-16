import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Replies with Info about the bot");

export async function execute(interaction: CommandInteraction) {
  // TODO: add a nicer about me message here
  return interaction.reply(
    "RGS's very own automatic verification bot for non-unsw members 🚀"
  );
}

