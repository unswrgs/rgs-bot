import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("about")
    .setDescription("Replies with Info about the Bot");

export async function execute(interaction: CommandInteraction) {
    return interaction.reply(
        "UNSW LOFI SOCIETY very own automatic verification bot for all members 🚀"
    );
}
