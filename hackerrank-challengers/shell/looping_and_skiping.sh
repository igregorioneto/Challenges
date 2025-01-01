#!/bin/bash

# Your task is to use for loops to display only odd natural numbers from 1 to 99
for number in {1..99}; do
    if [ $((number % 2)) -eq 1 ]; then
        echo "$number"
    fi
done