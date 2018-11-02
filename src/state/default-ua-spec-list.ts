import UaSpec from 'src/lib/ua-spec';

const DEFAULT_UA_SPEC_LIST: Array<UaSpec> = [
  {
    deviceType: 'desktop',
    name: 'Google Chrome (Windows 10)',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
  },
  {
    deviceType: 'desktop',
    name: 'Mozilla Firefox (Windows 10)',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0',
  },
  {
    deviceType: 'desktop',
    name: 'Microsoft Edge (Windows 10)',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393',
  },
  {
    deviceType: 'desktop',
    name: 'Microsoft Internet Explorer 11',
    value:
      'Mozilla/5.0 (compatible, MSIE 11, Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  },
  {
    deviceType: 'tablet',
    name: 'Safari (iPad)',
    value:
      'Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4',
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
      'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254',
  },
  {
    deviceType: 'mobile',
    name: 'Google Chrome (Android)',
    value:
      'Mozilla/5.0 (Linux; Android 8.0.0; SM-G9600) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36',
  },
];

export default DEFAULT_UA_SPEC_LIST;
