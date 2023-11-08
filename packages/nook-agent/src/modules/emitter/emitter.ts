import mitt from "mitt";
import { NookEmitterEvents } from "./emitter.types";

export const eventBus = mitt<NookEmitterEvents>();