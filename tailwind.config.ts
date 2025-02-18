import { defineConfig } from '@unocss/core';
import presetUno from '@unocss/preset-uno';
import presetWind from '@unocss/preset-wind';

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
  ],
  include: [/\.(ts|tsx|js|jsx)$/],
  theme: {
    // Your theme customizations here
  },
});
