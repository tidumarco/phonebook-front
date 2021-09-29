#!/bin/sh
npm run build
rm -rf ../../phonebook-front/build
cp -r build ../../phonebook-front/