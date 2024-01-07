import build from "nook-build";
import type { Compiler } from "webpack";

class NookPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap("Nook plugin", () => {
      build();
    });
  }
}

export default NookPlugin;
