# Agentium: User agent switcher

Agentium is a extension for controlling the user agent identity reported by your browser, allowing you for instance to view the mobile version of a website on your computer.

Highlights:

- Quickly select user agent identity from a default list of popular browsers
- Add your own custom user agent identities
- Simple & clean UI

### Installation

Agentium is available on:

- Google Chrome: https://chrome.google.com/webstore/detail/agentium-user-agent-switc/kabejgcoafnliefbhejpfahdecimjcje
- Mozilla Firefox: https://addons.mozilla.org/en-US/firefox/addon/agentium/
- Microsoft Edge: _TBA_

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

To build the extension:

```bash
git clone https://github.com/jichu4n/agentium.git
cd agentium
npm install

# To produce unpacked extension for development in build/
npm run build
# Mozilla Firefox - build-firefox/extension.xpi
npm run build-firefox
# Google Chrome - build-chrome/extension.zip
npm run build-chrome
# Microsoft Edge - build-edge/edgeExtension.appx
npm run build-edge
```
