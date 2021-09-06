. ~/.nvm/nvm.sh
nvm install $(cat .nvmrc)
nvm use

# https://stackoverflow.com/a/3278427
git remote update

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")

if [ $LOCAL = $REMOTE ]; then
  echo "Boot scripts are up-to-date"
else
  echo "Updating boot scripts"
  git pull
  npm i
  npm run build
fi
