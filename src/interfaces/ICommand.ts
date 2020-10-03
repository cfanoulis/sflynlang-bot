/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import ICommandType from "./ICommandType";
import IMessage from "./IMessage";

export interface ICommandMethods {
  /**
   * Command name.
   *
   * @readonly
   * @property
   */
  readonly name: string;

  /**
   * Command arguments.
   *
   * @readonly
   * @property
   */
  readonly arguments?: string;

  /**
   * Command description.
   *
   * @readonly
   * @property
   */
  readonly description: string;
}

export interface ICommandExecution {
  /**
   * Execute the command.
   *
   * @async
   * @function
   * @param { IMessage } message
   * @param { string[] } args
   * @returns { Promise<void> }
   */
  run(message: IMessage, args: string[]): Promise<unknown>;
}

export default interface ICommand extends ICommandMethods, ICommandExecution {
  /**
   * Command type.
   *
   * @readonly
   * @property
   */
  readonly type: ICommandType;
}
