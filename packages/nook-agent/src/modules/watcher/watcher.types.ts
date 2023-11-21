import { Glob } from "picomatch";

export type listenerEventType = 'add'|'addDir'|'change' | 'all' | 'error' | 'raw' | 'ready' | 'unlink' | 'unlinkDir';

export type WatcherParams = {
  include: Glob;
  ignore: Glob;
  listener: (type: listenerEventType, filePath: string) => void;
}
