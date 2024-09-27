#!/usr/bin/env bash

set -exof pipefail

urldecoder -e src/.vuepress/.cache -e src/.vuepress/.temp -e src/.vuepress/dist --escape-space 'src/**/*.md' 'src/.vuepress/components/*'
git add -A
git commit -a --allow-empty-message -m "$1"
git push origin code
