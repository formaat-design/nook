import { Emitter } from 'mitt';
import { WebSocketServer } from 'ws';

type Events = {
  update: {
    type: string;
    payload: any;
  }
}

export const nookAgentWebSocket = ({ eventBus, initialComponents }: { eventBus: Emitter<Events>, initialComponents: { [x: string]: string[] } }) => {
  const wss = new WebSocketServer({ port: 51311 });

  wss.on('connection', function connection(ws) {
    ws.on('error', console.error);

    ws.send(JSON.stringify({ type: 'components', payload: initialComponents }));

    eventBus.on('update', ({ type, payload }) => {
      ws.send(JSON.stringify({ type, payload }));
    });
  });
}