#!/usr/bin/env node

import { nookAgent } from "../modules/agent/agent";

console.log('Nook Agent is running...');

console.log("Current working directory:", process.cwd());

nookAgent();