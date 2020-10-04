/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Command from "@Commands/Command";
import command from "@Decorators/command";
import { general } from "@Decorators/commandTypes";
import IMessage from "@Interfaces/IMessage";
import { MessageEmbed } from "discord.js";

@general
@command({
  name: "useravatar",
  arguments: "<user>",
  description: ":frame_photo: Shows you the avatar of a user",
})
export default class UserAvatarCommand extends Command {
  private userRegex = /<@!?(\d+)>/g;

  async run(message: IMessage, [userId]: string[]): Promise<void> {
    const parsedId = this.parseMention(userId) ?? userId;
    if (!parsedId) {
      message.reply("Uhm, is that a valid ID?");
      return;
    }

    let user = await message.bot
      .getClient()
      .users.fetch(parsedId)
      .catch(() => {});
    if (!user) {
      message.reply("Sorry, I couldn't find that user!");
      return;
    }

    message.channel.send(
      new MessageEmbed()
        .setTitle(`${user.tag}'s avatar:`)
        .setImage(user.displayAvatarURL({ size: 512 }))
    );
  }

  private parseMention(text: string) {
    return (this.userRegex.exec(text) ?? [])[1];
  }
}
