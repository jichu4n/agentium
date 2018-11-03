import UaSpec from 'src/lib/ua-spec';

const DEFAULT_UA_SPEC_LIST: Array<UaSpec> = [
  {
    deviceType: 'desktop',
    name: 'Google Chrome',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
  },
  {
    deviceType: 'desktop',
    name: 'Safari (macOS)',
    value:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Safari/605.1.15',
  },
  {
    deviceType: 'desktop',
    name: 'Microsoft Edge',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134',
  },
  {
    deviceType: 'desktop',
    name: 'Microsoft Internet Explorer 11',
    value:
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  },
  {
    deviceType: 'desktop',
    name: 'Mozilla Firefox',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:63.0) Gecko/20100101 Firefox/63.0',
  },
  {
    deviceType: 'mobile',
    name: 'Google Chrome (Android)',
    value:
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G9600) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36',
  },
  {
    deviceType: 'mobile',
    name: 'Safari (iPhone)',
    value:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  },
  {
    deviceType: 'mobile',
    name: 'Microsoft Edge (Windows Phone 10)',
    value:
      'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 650) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254',
  },
  {
    deviceType: 'tablet',
    name: 'Safari (iPad)',
    value:
      ' Mozilla/5.0 (iPad; CPU OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  },
];

export default DEFAULT_UA_SPEC_LIST;
