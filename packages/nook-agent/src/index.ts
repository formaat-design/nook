import type { Glob } from 'picomatch';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';
import { analyzeByFile } from './scripts/agent';
import { nookAgentWebSocket } from './services/websocket';
import mitt from 'mitt';

type NookAgentOptions = {
  root: string;
  include?: Glob;
  ignore?: Glob;
}

type Events = {
  update: {
    type: string;
    payload: any;
  }
}

const eventBus = mitt<Events>();

const readComponentsFile = (componentsFile: string) => {
  return JSON.parse(fs.readFileSync(componentsFile, 'utf8')) as NonNullable<ReturnType<typeof analyzeByFile>>;
};

export const nookAgent = (options: NookAgentOptions) => {
  const {
    root,
    include = '**/*.@(jsx|tsx)',
    ignore = ['node_modules', '**/*.test.@(jsx|tsx)', '**/*.spec.@(jsx|tsx)'],
  } = options;

  const nookFolder = path.resolve(root, '.nook');

  if (!fs.existsSync(nookFolder)) {
    fs.mkdirSync(nookFolder);
  }

  const componentsFile = path.resolve(nookFolder, 'components.json');

  if (!fs.existsSync(componentsFile)) {
    fs.writeFileSync(componentsFile, JSON.stringify({}, null, 2));
  }

  const initialComponents = readComponentsFile(componentsFile);

  nookAgentWebSocket({ eventBus, initialComponents });

  const updateComponentsList = (filePath: string) => {
    const result = analyzeByFile(root, filePath) || {};

    const componentsContent = readComponentsFile(componentsFile);

    const knownComponentsMap = new Map(Object.entries(componentsContent));

    knownComponentsMap.set(filePath, result[filePath]);

    const nextNookComponents = Object.fromEntries(knownComponentsMap)

    eventBus.emit('update', {
      type: 'components',
      payload: nextNookComponents
    });
  };

  const watcher = chokidar.watch(include, {
    ignored: ignore,
    persistent: true
  });

  eventBus.on('update', ({ type, payload }) => {
    if (type === 'components') {
      fs.writeFileSync(componentsFile, JSON.stringify(payload, null, 2));
    }
  });

  watcher
    .on('add', (filePath) => {
      updateComponentsList(filePath);
    })
    .on('change', (filePath) => {
      updateComponentsList(filePath);
    })
    .on('unlink', (filePath) => {
      updateComponentsList(filePath);
    })
};
