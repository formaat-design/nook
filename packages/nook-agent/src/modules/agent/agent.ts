import fs from 'fs';

import { WatcherParams } from '../watcher/watcher.types';
import { readComponentsFile } from '../../helpers/read';
import { NookAgentOptions } from './agent.types';
import { getComponentsFile, getNookAgentFolder } from '../../helpers/get';
import { nookAgentWebSocket } from '../../services/websocket/websocket';
import { watcher } from '../watcher/watcher';
import { eventBus } from '../emitter/emitter';
import { analyzeJSXFile } from '../analyse/analyse';

const defaultValues: WatcherParams = {
  include: '**/*.@(jsx|tsx)',
  ignore: ['node_modules', '.nook', '**/*.test.@(jsx|tsx)', '**/*.spec.@(jsx|tsx)'],
  listener: () => { },
};

export const nookAgent = (options: NookAgentOptions = {}) => {
  const {
    root = process.cwd(),
    include = defaultValues.include,
    ignore = defaultValues.ignore
  } = options;

  const nookFolder = getNookAgentFolder(root);
  const componentsFile = getComponentsFile(nookFolder);

  const initialComponents = readComponentsFile(componentsFile);

  nookAgentWebSocket({ initialComponents });

  watcher({
    include,
    ignore,
    listener: (type, filePath) => {
      const componentsContent = readComponentsFile(componentsFile);

      if (type === 'unlink') {
        delete componentsContent[filePath];

        eventBus.emit('update', {
          type: 'components',
          payload: componentsContent
        });

        return;
      }

      const result = analyzeJSXFile(root, filePath) || {};

      const knownComponentsMap = new Map(Object.entries(componentsContent));

      knownComponentsMap.set(filePath, result[filePath]);

      const nextNookComponents = Object.fromEntries(knownComponentsMap)

      eventBus.emit('update', {
        type: 'components',
        payload: nextNookComponents
      });
    }
  });

  eventBus.on('update', ({ type, payload }) => {
    if (type === 'components') {
      fs.writeFileSync(componentsFile, JSON.stringify(payload, null, 2));
    }
  });
};
