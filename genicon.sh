#!/bin/bash
# sh genicon.sh <path>
for size in 16 32 48 128
do
  convert $1 -resize ${size}x  -unsharp 1.5x1+0.7+0.02 ./src/images/icon${size}.png
done