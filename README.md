# pi.toughlovearena.com

How to turn a Raspberry Pi into a Tough Love Arena machine

## Method 1: Load an existing image

Coming soon...

## Method 2: Setup from a fresh linux install

Download and install the [Raspberry Pi OS](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit) following the guide on the official website.

### Download this repo

Open a terminal and ensure we're in the user's directory:

```bash
cd ~
```

Now run the following commands. If a prompt comes up while installing software, press Y (yes) to continue:

```bash
git clone https://github.com/toughlovearena/pi.toughlovearena.com.git
cd pi.toughlovearena.com
./bash/install.sh
```

### Edit the autostart config to setup the boot script

Edit this file `/etc/xdg/lxsession/LXDE-pi/autostart` to match the code below:

```bash
# existing code, probably looks like this. leave it alone
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash

# add this to the bottom. this is what boots TLA
unclutter -idle 3
@lxterminal -e ~/pi.toughlovearena.com/bash/boot.sh
```
