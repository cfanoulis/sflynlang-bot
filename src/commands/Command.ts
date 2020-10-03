/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import ICommand from "@Interfaces/ICommand";
import ICommandType from "@Interfaces/ICommandType";
import IMessage from "@Interfaces/IMessage";

/**
 * Empty command.
 * @class
 */
class Command implements ICommand {
  readonly name: string = "";
  readonly description: string = "";

  readonly type: ICommandType = ICommandType.GENERAL;

  async run(_message: IMessage, _args: string[]): Promise<any> {}
}

export default Command;
