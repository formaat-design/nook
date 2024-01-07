import type { NextConfig } from "next";
import NookPlugin from "nook-integration-webpack";

const withNook =
  () =>
  (nextConfig: NextConfig = {}): NextConfig => {
    return {
      ...nextConfig,
      webpack(config, options) {
        config.plugins.push(new NookPlugin());

        if (typeof nextConfig.webpack === "function") {
          return nextConfig.webpack(config, options);
        }

        return config;
      },
    };
  };

export default withNook;
