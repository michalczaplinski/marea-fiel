import tailwindConfig from "tailwind-config";
import { Config } from "tailwindcss";

const config: Config = {
  presets: [tailwindConfig],
  content: ["./app/**/*.tsx", "./modules/**/*.tsx"],
};

export default config;
