git add -A
git commit -m $(date "+%Y%m%d-%H:%M:%S")
git push origin code
bash deploy_only.sh
exec /bin/bash