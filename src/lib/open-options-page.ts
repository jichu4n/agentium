import {detect} from 'detect-browser';
import {browser} from 'webextension-polyfill-ts';

function openOptionsPage() {
  let detectedBrowser = detect();
  if (detectedBrowser && detectedBrowser.name == 'edge') {
    let optionsPageUrl = browser.runtime.getManifest()['options_page'];
    browser.tabs.create({url: optionsPageUrl});
  } else {
    browser.runtime.openOptionsPage();
  }
}

export default openOptionsPage;
