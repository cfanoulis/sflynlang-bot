/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import "module-alias/register";
import Bot from "@Bot";

// Check if the node is not in production mode.
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

try {
  // Start the bot application.
  new Bot().run();
} catch (error) {
  console.log(error);
}
