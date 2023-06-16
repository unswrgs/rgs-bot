import { randomUUID } from "crypto";
import { Client, Guild, Message, User } from "discord.js";
import { sendVerificationEmail } from "./send-mail";
import { config } from "../config";
import { logMessage } from "./admin-logger";

/**
 * Sends user dm and verification email, and verifies user if user sent code
 * matches with mail sent code.
 * @param email as String
 * @param name as String
 * @param user as Discord User Object
 * @param client as Discord Client Object
 */
export const verifyUser = async (
  email: string,
  name: string,
  user: User,
  client: Client,
  guild: Guild
) => {
  const code: string = randomUUID().toString();
  user
    .createDM()
    .then((dm) => {
      dm.send(
        `Hi ${user.username}, Please send the **verification code** I sent to your email here for access to the UNSW Rhythm Game Society discord server! you have 5 mins to send it.`
      );
      sendVerificationEmail(email, name, code);
      // for more info on collectors see https://discordjs.guide/popular-topics/collectors.html#message-collectors
      const collectorFilter = (m: Message) => m.author.id !== config.BOT_ID;
      // keep listening to messages from the user for 5 minutes
      const collector = dm.createMessageCollector({
        filter: collectorFilter,
        time: 300000,
      });
      console.log(`start of ${user.username} verification`);
      collector.on("collect", async (m) => {
        if (m.content === code) {
          m.reply(
            "Verification successful, Welcome to UNSW Rhythm Game Society!"
          );
          // Gives user the verified role
          try {
            const member = guild.members.cache.get(user.id);
            if (!member) throw new Error("invalid member");
            const role = guild.roles.cache.get(config.VERIFIED_ROLE_ID);
            if (!role) throw new Error("invalid role ID");
            await member.roles.add(role);
          } catch (e) {
            dm.send(
              "experienced error while verifying you, please ask an admin to manually verify you"
            );
            logMessage(user.id, client);
            collector.stop();
          }
          collector.stop();
        } else {
          dm.send(
            "You entered the wrong verification code, please try again! also don't forget to check spam"
          );
        }
      });
      collector.on("end", () =>
        console.log(`end of ${user.username} verification`)
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

