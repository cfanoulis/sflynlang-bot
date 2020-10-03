/**
 * Copyright (c) Sflynlang
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import { Document } from "mongoose";

/**
 * Setting document.
 * @interface
 */
interface ISetting extends Document {
  /**
   * Setting key.
   * @property
   */
  key: string;

  /**
   * Setting value.
   * @property
   */
  value: string;
}

export default ISetting;
