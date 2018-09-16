#!/bin/bash

if [ -z "$1" ]; then
    echo "You need to supply a search string..."
else
    processes=$(ps aux | grep $1 -i | awk -F ' ' '{print $2}' | xargs)
    echo "Processes: "$processes
    echo 'Killing processes...'
    for i in $processes; do sudo kill $i; done
    echo "Processes Killed: " $processes
    break;
    echo "Skipped killing processes..."
    break;

fi