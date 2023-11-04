import { nookAgent } from 'nook-agent';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

nookAgent({
  root: __dirname,
});