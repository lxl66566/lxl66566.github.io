npm run docs:build
cd docs/.vuepress/dist
git init
git config --local user.name "deploy"
git config --local user.email "deploy@example.com"
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git push -f git@github.com:lxl66566/lxl66566.github.io.git main
exit