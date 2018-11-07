# Agentium: User agent switcher

Agentium is a extension for controlling the user agent identity reported by your browser, allowing you for instance to view the mobile version of a website on your computer.

Highlights:

- Quickly select user agent identity from a default list of popular browsers
- Add your own custom user agent identities
- Simple & clean UI

### Installation

Agentium is available on:

- Mozilla Firefox: https://addons.mozilla.org/en-US/firefox/addon/agentium/
- Google Chrome: Pending
- Microsoft Edge: Pending

### Screenshots

- Click the icon to switch user agent identity:
  \
  ![](https://github.com/jichu4n/agentium/raw/master/packaging/chrome/screenshot-1.png 'Click the icon to switch user identity')

- Right click menu:
  \
  ![](https://github.com/jichu4n/agentium/raw/master/packaging/chrome/screenshot-2.png 'Right click menu')

- Customize by adding, editing or removing user agent identities:
  \
  ![](https://github.com/jichu4n/agentium/raw/master/packaging/chrome/screenshot-3.png 'Customize by adding, editing or removing user agent identities')

### Development

This extension was developed with Typescript / React / Material-UI.

To build the extension, use `yarn`:

```bash
git clone https://github.com/jichu4n/agentium.git
cd agentium
yarn install

# To produce unpacked extension for development in build/
yarn run build
# Mozilla Firefox - build-firefox/extension.xpi
yarn run build-firefox
# Google Chrome - build-chrome/extension.zip
yarn run build-chrome
# Microsoft Edge - build-edge/edgeExtension.appx
yarn run build-edge
```
