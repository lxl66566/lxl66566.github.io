#!/usr/bin/env bash
set -euxof pipefail
urldecoder -e src/.vuepress/.cache -e src/.vuepress/.temp -e src/.vuepress/dist --escape-space 'src/**/*.md' 'src/.vuepress/components/*'
git add -A
# git commit -m $(date "+%Y%m%d-%H:%M:%S")
git commit -m "update"
# git commit -m "rewrite some vue component"
git push origin code
