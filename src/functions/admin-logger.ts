import { Channel, Client, TextChannel } from "discord.js";
import { config } from "../config";

export const logMessage = (userID: string | null, client: Client) => {
  const channel: Channel | undefined = client.channels.cache.get(
    config.LOGGING_CHANNEL_ID
  );
  if (channel)
    (channel as TextChannel).send(`<@${userID}> requires manual verification`);
};

