/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { general } from "@Decorators/commandTypes";
import command from "@Decorators/command";
import Command from "@Commands/Command";
import IMessage from "@Interfaces/IMessage";
import { MessageEmbed } from "discord.js";
import ICommand from "@Interfaces/ICommand";
import ICommandType from "@Interfaces/ICommandType";

@general
@command({
  name: "help",
  description: "See the avaliable commands.",
})
class Help extends Command {
  /**
   * Get a command as a string of the following way:
   * `<prefix><command_name> <command_arguments>: <command_description>`
   *
   * @method
   * @function
   * @param { string } prefix Bot prefix
   * @param { ICommand } command
   * @returns { string }
   */
  private commandToString(prefix: string, command: ICommand): string {
    let str: string = `**${prefix}${command.name}`;

    if (command.arguments) {
      str += ` ${command.arguments}`;
    }

    return `${str}**: ${command.description}`;
  }

  async run(message: IMessage): Promise<void> {
    // Ignore private messages.
    if (!message.guild || !message.member) {
      return;
    }

    // Create an empty description.
    let description: string = "";

    // Get all bot commands.
    const commands = message.bot.getCommands().getCommands();

    // Get the dev bot role.
    const devRole = await message.getDevRole();

    // Check if the user has the dev role.
    if (devRole && message.member.roles.cache.has(devRole.value)) {
      const devCommands: string[] = [];

      commands.forEach((command) => {
        if (command.type === ICommandType.DEVELOPER) {
          devCommands.push(
            this.commandToString(message.bot.getPrefix(), command)
          );
        }
      });

      if (devCommands.length) {
        // Add developer commands to the description.
        description += `**<@&${devRole.value}> Commands**\r\n${devCommands.join(
          "\r\n"
        )}`;
      }
    }

    const generalCommands: string[] = [];

    commands.forEach((command) => {
      if (command.type === ICommandType.GENERAL) {
        generalCommands.push(
          this.commandToString(message.bot.getPrefix(), command)
        );
      }
    });

    if (generalCommands.length) {
      if (description.length) {
        description += "\r\n\r\n";
      }

      // Add general commands to the description.
      description += `**General Commands**\r\n${generalCommands.join("\r\n")}`;
    }

    await message.channel.send(
      new MessageEmbed()
        .setColor(message.color)
        .setAuthor("Commands list", message.bot.getSflynIcon())
        .setDescription(description)
        .setFooter("2020 ~ Sflynlang")
    );
  }
}

export default Help;
