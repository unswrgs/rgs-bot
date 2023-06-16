import { randomUUID } from "crypto";
import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("Creates a verification code!")
  .addUserOption((options) =>
    options
      .setName("user")
      .setDescription("ping the user you want to verify")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction) {
  const code: string = randomUUID().toString();
  const user = interaction.options.get("user")?.user;

  // if the user exists send them the verification code
  if (user) {
    user
      .createDM()
      .then((dm) => {
        dm.send("Hi there your code is " + code);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return interaction.reply("verifying " + user?.username);
}

