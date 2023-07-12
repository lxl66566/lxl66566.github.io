npm run build
cd docs/.vuepress/dist
git init
git config --local user.name "deploy"
git config --local user.email "deploy@example.com"
git add -A
git commit -m 'deploy:'$(date "+%Y%m%d-%H:%M:%S")
git remote add origin git@github.com:lxl66566/lxl66566.github.io.git
git push origin main -f
exit