#!/bin/sh
inotifywait -m -e  modify,close_write /tmp/Caddyfile | while read file; do pkill -USR1 caddy; done



