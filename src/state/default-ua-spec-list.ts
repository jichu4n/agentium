import UaSpec from 'src/lib/ua-spec';

const DEFAULT_UA_SPEC_LIST: Array<UaSpec> = [
  {
    id: '92ec566d-53ff-4ab6-a50a-a54ed12f981b',
    deviceType: 'desktop',
    name: 'Google Chrome',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
  },
  {
    id: '15c291c1-3529-4120-bff5-d84b439ec812',
    deviceType: 'desktop',
    name: 'Safari (macOS)',
    value:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
  },
  {
    id: 'eb4a6181-13b8-4f8d-ab52-01a2c33b9d07',
    deviceType: 'desktop',
    name: 'Microsoft Edge',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.67 Safari/537.36 Edg/87.0.664.52',
  },
  {
    id: '8e4f486a-fe3c-47dd-8b96-99eee9d674c9',
    deviceType: 'desktop',
    name: 'Microsoft Internet Explorer 11',
    value:
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko',
  },
  {
    id: 'c6003b93-235d-43a7-984c-b55b18d8636a',
    deviceType: 'desktop',
    name: 'Mozilla Firefox',
    value:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
  },
  {
    id: '2c80aea5-80d1-448d-9227-476d58895b99',
    deviceType: 'mobile',
    name: 'Google Chrome (Android)',
    value:
      'Mozilla/5.0 (Linux; Android 10; SM-N986U1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Mobile Safari/537.36',
  },
  {
    id: 'cfb8b051-7ecc-4664-9dd0-29f7684e0df8',
    deviceType: 'mobile',
    name: 'Safari (iPhone)',
    value:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1',
  },
  {
    id: 'f4e15410-f513-4aea-b733-2bd6b4cf5011',
    deviceType: 'mobile',
    name: 'Microsoft Edge (Windows Phone 10)',
    value:
      'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 650) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254',
  },
  {
    id: '43e4c688-f8cb-4cf8-bcc8-af8a6da62c22',
    deviceType: 'tablet',
    name: 'Safari (iPad)',
    value:
      'Mozilla/5.0 (iPad; CPU OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1',
  },
];

export default DEFAULT_UA_SPEC_LIST;
