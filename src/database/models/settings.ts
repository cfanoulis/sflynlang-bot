/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { Schema, model } from "mongoose";
import ISetting from "@Interfaces/ISetting";

/**
 * Setting document structure.
 * @constant
 */
const setting = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export default model<ISetting>("setting", setting);
