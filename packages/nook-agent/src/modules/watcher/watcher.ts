import chokidar from 'chokidar';
import { WatcherParams } from './watcher.types';

export const watcher = (params: WatcherParams) => {
  const { include, ignore, listener } = params;

  const chokidarWatch = chokidar.watch(include, {
    ignored: ignore,
    persistent: true,
  });

  chokidarWatch
    .on('add', (filePath) => {
      listener('add', filePath);
    })
    .on('change', (filePath) => {
      listener('change', filePath);
    })
    .on('unlink', (filePath) => {
      listener('unlink', filePath);
    })
};
