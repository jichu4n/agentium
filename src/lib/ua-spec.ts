import DeviceType from './device-type';

/** A user agent identity configuration. */
interface UaSpec {
  id: string;
  deviceType: DeviceType;
  name: string;
  value: string;
}

export default UaSpec;
