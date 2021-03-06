# pi.toughlovearena.com

A guide on how to turn a Raspberry Pi into a dedicated Tough Love Arena console! Check out the source code on [GitHub](https://github.com/toughlovearena/pi.toughlovearena.com)

## Method 1: Load an existing image

### Prerequisites

- Download the latest zip from the [Releases](https://github.com/toughlovearena/pi.toughlovearena.com/releases) page of this repo
- Download the official [Raspberry PI Imager](https://www.raspberrypi.org/software/)
- Plug in a microSD card that's atleast 8 GB or larger

### Install

- Follow the prompts in the Imager to write the latest zip/image file to the microSD card
- Plug the microSD into the PI and turn it on! It should automatically boot the game after a short period
- In order to update, you will need an internet connection. Either plug in an ethernet cable, or exit the game after booting (Alt-F4) and enter your personal Wifi info using the network tab in the top right. Once the network is setup, reboot the PI to trigger the auto-updater

## Method 2: Setup from a fresh linux install

Download and install the [Raspberry Pi OS](https://www.raspberrypi.org/software/operating-systems/#raspberry-pi-os-32-bit) following the guide on the official website.

### Step 1: Setup the Raspberry PI

Follow the instructions on the screen to set up your preferred language, wifi network, etc

Once you're done following the setup wizard and have rebooted, go to Start > Preferences > Raspberry Pi Configuration and change the following settings:

- System
  - Auto login: Login as user pi
  - Network at Boot: Wait for network
- Display
  - Screen Blanking: Disable

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

Running `bash/install.sh` does the following things:

- Installs `nvm` and sets up the node environments for running the fetch scripts and server
- Installs `unclutter` which hides the mouse after a short period of inactivity
- Adds `bash/boot.sh` to the autostart config for Linux

**WARNING: DO NOT RENAME OR MOVE THE `pi.toughlovearena.com` FOLDER OUT OF YOUR HOME DIRECTORY, IT WILL BREAK THINGS**

### Step 3: Test it out!

- Simply turn off your Raspberry PI and turn it back on
- You should see a terminal popup right after the desktop appears
- Leave the terminal alone, and watch it make progress
- If there's a new version of TLA, it might take a minute or two to update, depending on your internet speed
- It should then launch the game in a fullscreen browser. Use a keyboard or plug in a controller and start playing!
- If you want to get back to the Desktop, press Alt+F4 to close the browser
  - The terminal will continue to run a local webserver at `localhost:8080`
  - If you want to stop and close the terminal, press Ctrl+C
- If you want to check for updates, the simplest way is to just turn the machine off and on again

Please report any bugs!
