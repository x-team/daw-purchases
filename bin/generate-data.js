#!/usr/bin/env node

process.stdout.write(JSON.stringify(require('../src/setup-store').generateData(), null, 2))
