import { model, Schema } from "mongoose";

import type { Settings } from "types";

const settingsSchema = new Schema<Settings>({
  mode: {
    type: String,
    required: true,
  },
});

const SettingsModel = model("Settings", settingsSchema);

export { SettingsModel };
