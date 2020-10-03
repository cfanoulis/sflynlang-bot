/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import Bot from "@Bot";

/**
 * On bot ready event.
 *
 * @function
 * @param { Bot } bot
 * @returns { void }
 */
function onReady(bot: Bot): void {
  console.log(`${bot.getClient().user?.username} connected!`);
}

export default onReady;
