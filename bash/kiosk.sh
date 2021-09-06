. ~/.nvm/nvm.sh
nvm use

# sleep first so the browser opens after server has started
(sleep 5 && chromium-browser --app="http://localhost:8080?kiosk" --incognito --kiosk) &
npm run start
