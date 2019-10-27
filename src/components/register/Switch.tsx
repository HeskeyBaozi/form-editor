import React from 'react';
import { Switch } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import { SwitchProps } from 'antd/es/switch';

interface xSwitchProps extends TargetComponentProps, SwitchProps {}

const xSwitch: React.FC<xSwitchProps> = React.forwardRef(({ fieldMeta, ...rest }, ref: any) => {
  return <Switch ref={ref} {...rest} />;
});

registerComponent('Switch', xSwitch, options => ({
  ...options,
  valuePropName: 'checked',
}));
