import DeviceType from './device-type';

interface UaSpec {
  id: string;
  deviceType: DeviceType;
  name: string;
  value: string;
}

export default UaSpec;
