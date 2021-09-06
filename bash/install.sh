# install nvm and unclutter

# https://www.jemrf.com/pages/how-to-install-nvm-and-node-js-on-raspberry-pi
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

. ~/.nvm/nvm.sh
nvm install $(cat .nvmrc)

### unclutter

sudo apt-get update
sudo apt install unclutter
