#!/usr/bin/env bash

set -exof pipefail

urldecoder -e src/.vuepress/.cache -e src/.vuepress/.temp -e src/.vuepress/dist --escape-space 'src/**/*.md' 'src/.vuepress/components/*' 'src/.vuepress/data/*'
git add -A
git commit -a --allow-empty-message -m "$*"
git push origin code
