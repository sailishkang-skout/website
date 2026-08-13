#!/bin/sh
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
node --max-old-space-size=4096 ./node_modules/next/dist/bin/next dev -p 3000