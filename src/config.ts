import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  GUILD_ID,
  SENDGRID_API_KEY,
  BOT_ID,
  WEBHOOK_CHANNEL,
  VERIFIED_ROLE_ID,
  LOGGING_CHANNEL_ID,
} = process.env;

if (
  !DISCORD_TOKEN ||
  !DISCORD_CLIENT_ID ||
  !GUILD_ID ||
  !SENDGRID_API_KEY ||
  !BOT_ID ||
  !WEBHOOK_CHANNEL ||
  !VERIFIED_ROLE_ID ||
  !LOGGING_CHANNEL_ID
) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  BOT_ID,
  WEBHOOK_CHANNEL,
  GUILD_ID,
  SENDGRID_API_KEY,
  VERIFIED_ROLE_ID,
  LOGGING_CHANNEL_ID,
};

