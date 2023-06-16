import { randomUUID } from "crypto";
import { CommandInteraction, Message, SlashCommandBuilder } from "discord.js";
import { sendVerificationEmail } from "./send-mail";
import { config } from "../config";

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
  console.log(code);
  // if the user exists send them the verification code
  if (user) {
    user
      .createDM()
      .then((dm) => {
        dm.send(
          `Hi ${user.username}, Please send the verification code I sent to your email here for access to the discord server! you have 5 mins to send it.`
        );
        // TODO: Add real email address here
        sendVerificationEmail("example@gmail.com", user.username, code);

        // for more info on collectors see https://discordjs.guide/popular-topics/collectors.html#message-collectors
        const collectorFilter = (m: Message) => m.author.id !== config.BOT_ID;
        // keep listening to messages from the user for 5 minutes
        const collector = dm.createMessageCollector({
          filter: collectorFilter,
          time: 300000,
        });
        collector.on("collect", (m) => {
          if (m.content === code) {
            m.reply(
              "Verification successful, Welcome to UNSW Rhythm Game Society!"
            );
            // TODO: Give user the verified role
            collector.stop();
          } else {
            dm.send(
              "You entered the wrong verification code, please try again!"
            );
          }
        });
        collector.on("end", () => {
          dm.send(
            "Sorry you took too long, please re-fill the form, or ask an admin to manually verify you!"
          );
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return interaction.reply("verifying " + user?.username);
}

