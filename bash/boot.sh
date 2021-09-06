echo 'starting TLA boot script'

# activate unclutter to hide an idle mouse cursor after 3 seconds
echo 'activating unclutter to autohide mouse'
unclutter -idle 3 &

# move to relative directory so scripts work
cd ~/pi.toughlovearena.com

./bash/update.sh
./bash/fetch.sh
./bash/kiosk.sh
