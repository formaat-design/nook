import { WebSocketServer } from 'ws';
import { eventBus } from '../../modules/emitter/emitter';
import { NookAgentParams } from './websockets.types';

export const nookAgentWebSocket = (params: NookAgentParams) => {
  const wss = new WebSocketServer({ port: 51311 });

  wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    // Send initial components list
    ws.send(JSON.stringify({ type: 'components', payload: params.initialComponents }));

    eventBus.on('update', ({ type, payload }) => {
      ws.send(JSON.stringify({ type, payload }));
    });
  });
}