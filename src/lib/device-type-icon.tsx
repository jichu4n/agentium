import Computer from '@material-ui/icons/Computer';
import PhoneAndroid from '@material-ui/icons/PhoneAndroid';
import Tablet from '@material-ui/icons/Tablet';
import * as _ from 'lodash';
import * as React from 'react';
import DeviceType from './device-type';

const DEVICE_TYPE_ICON_MAP = {
  desktop: Computer,
  tablet: Tablet,
  mobile: PhoneAndroid,
};

class DeviceTypeIcon extends React.Component<
  {deviceType: DeviceType; [s: string]: any},
  {}
> {
  render() {
    if (!_.has(DEVICE_TYPE_ICON_MAP, this.props.deviceType)) {
      return null;
    }
    let Icon = DEVICE_TYPE_ICON_MAP[this.props.deviceType];
    return <Icon {...this.props} />;
  }
}

export default DeviceTypeIcon;
