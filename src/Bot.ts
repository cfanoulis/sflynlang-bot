/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { Client } from "discord.js";
import DatabaseManager from "@Database/Manager";
import CommandsManager from "@Commands/Manager";
import onGuildMemberAdd from "@Events/onGuildMemberAdd";
import onMessage from "@Events/onMessage";
import onReady from "@Events/onReady";

/**
 * Bot Manager.
 * @class
 */
class Bot {
  private client: Client;
  private database: DatabaseManager;
  private commands: CommandsManager;

  private prefix: string;

  constructor() {
    this.client = new Client();
    this.database = new DatabaseManager();
    this.commands = new CommandsManager();

    this.prefix = "";
  }

  /**
   * Get the bot client.
   *
   * @function
   * @returns { Client }
   */
  getClient(): Client {
    return this.client;
  }

  /**
   * Get the database manager.
   *
   * @function
   * @returns { DatabaseManager }
   */
  getDatabase(): DatabaseManager {
    return this.database;
  }

  /**
   * Get the command manager.
   *
   * @function
   * @returns { CommandsManager }
   */
  getCommands(): CommandsManager {
    return this.commands;
  }

  /**
   * Get the message prefix.
   *
   * @function
   * @returns { string }
   */
  getPrefix(): string {
    return this.prefix;
  }

  /**
   * Get the Sflynlang icon url.
   *
   * @function
   * @returns { string }
   */
  getSflynIcon(): string {
    return "https://www.danielsolartech.com/images/sflyn_icon.jpg";
  }

  /**
   * Start the bot application.
   *
   * @async
   * @function
   * @returns { Promise<void> }
   */
  async run(): Promise<void> {
    // Load database.
    await this.getDatabase().run();

    // Get prefix.
    let prefixSetting = await this.getDatabase().getSettingByKey("prefix");

    if (!prefixSetting) {
      // Insert the default prefix to the database.
      prefixSetting = await this.getDatabase().getSettings().create({
        key: "prefix",
        value: "!",
      });
    }

    this.prefix = prefixSetting.value;

    // Load commands.
    this.getCommands().run();

    // Set events.
    this.getClient().on(
      "guildMemberAdd",
      async (member) => await onGuildMemberAdd(this, member)
    );
    this.getClient().on(
      "message",
      async (message) => await onMessage(this, message)
    );
    this.getClient().on("ready", () => onReady(this));

    // Log the bot.
    await this.getClient().login(process.env.DISCORD_TOKEN);
  }

  /**
   * Async setTimeout.
   *
   * @async
   * @function
   * @param { number } miliseconds
   * @returns { Promise<void> }
   */
  sleep(miliseconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, miliseconds));
  }
}

export default Bot;
