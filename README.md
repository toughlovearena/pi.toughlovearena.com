# pi.toughlovearena.com

How to turn a Raspberry Pi into a Tough Love Arena machine

## Method 1: Load an existing image

Coming soon...

## Method 2: Setup from a fresh linux install

Download and install the [Raspberry Pi OS](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit) following the guide on the official website.

### Step 1: Setup the Raspberry PI

Follow the instructions on the screen to set up your preferred language, wifi network, etc

### Step 2: Download the TLA booter

Open a terminal and ensure we're in the user's home directory:

```bash
cd ~
```

Now run the following commands. If a prompt comes up while installing software, press Y (yes) to continue:

```bash
git clone https://github.com/toughlovearena/pi.toughlovearena.com.git
cd pi.toughlovearena.com
./bash/install.sh
```

### Step 3: Edit the Linux autostart config to setup the boot script

Edit this file `/etc/xdg/lxsession/LXDE-pi/autostart` to match the code below:

```bash
# existing code, probably looks like this. leave it alone
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash

# add this to the bottom. this is what boots TLA
@lxterminal -e ~/pi.toughlovearena.com/bash/boot.sh
```

### Step 4: Test it out!

- Simply turn off your Raspberry PI and turn it back on
- You should see a terminal popup right after the desktop appears
- Leave the terminal alone, and watch it make progress
- If there's a new version of TLA, it might take a minute or two to update, depending on your internet speed
- It should then launch the game in a fullscreen browser. Use a keyboard or plug in a controller and start playing!
- If you want to get back to the Desktop, press Alt-F4 to close the browser
- The terminal will continue to run a local webserver. If you want to stop and close the terminal, press Ctrl+C
- If you want to check for updates, the simplest way is to just turn the machine off and on again!