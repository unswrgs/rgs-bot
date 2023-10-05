import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { client } from "..";

export const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("returns status of bot's functioning!");

export async function execute(interaction: CommandInteraction) {
    const sent = await interaction.reply({
        content: "Pinging...",
        fetchReply: true,
    });
    return interaction.editReply(
        `Bot is Working\n**Websocket heartbeat:** ${
            client.ws.ping
        }ms.\nRoundtrip latency: ${
            sent.createdTimestamp - interaction.createdTimestamp
        }ms`
    );
}
