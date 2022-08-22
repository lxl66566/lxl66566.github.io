git add -A
git commit -m $(date "+%Y%m%d-%H:%M:%S")
git push origin code
npm run docs:build
cd docs/.vuepress/dist
git init
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git push -f git@github.com:lxl66566/lxl66566.github.io.git main
cd -
exec /bin/bash