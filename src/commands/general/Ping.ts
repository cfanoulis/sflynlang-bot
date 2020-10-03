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
import moment from "moment";

@general
@command({
  name: "ping",
  description: ":ping_pong: Ping Pong...",
})
class PingCommand extends Command {
  async run(message: IMessage): Promise<void> {
    const diffTime = moment(message.createdTimestamp).diff(Date.now());

    await message.reply(
      `:ping_pong: Pong! **(${moment(diffTime).milliseconds()}ms)**`
    );
  }
}

export default PingCommand;
