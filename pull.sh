#!/bin/bash
rm -rf .git
git init
git remote add origin git@github.com:Talhafayyaz11/Caspeer-plugin.git
git checkout -b master
git add .
git commit -m "Code"
git push origin master

