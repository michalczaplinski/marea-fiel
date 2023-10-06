import type { StorybookConfig } from "@storybook/nextjs";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

import { dirname, join } from "path";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
  ],
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    // autodocs: "tag",
  },
  env: (config) => ({
    ...config,
  }),
  webpackFinal: async (config) => {
    config.resolve!.plugins = [new TsconfigPathsPlugin()];
    return config;
  },
};
export default config;
