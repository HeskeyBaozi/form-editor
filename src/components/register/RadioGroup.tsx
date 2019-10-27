import React from 'react';
import { Radio } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';

interface xRadioGroupProps extends TargetComponentProps {
  enumLabels?: string[];
}

const xRadioGroup: React.FC<xRadioGroupProps> = React.forwardRef(
  ({ fieldMeta, enumLabels, ...rest }, ref: any) => {
    let options: any[] = [];
    if (fieldMeta.enum) {
      options = enumLabels
        ? fieldMeta.enum.map((value, index) => {
            let label = null;
            if (Array.isArray(enumLabels)) {
              label = enumLabels[index] || value;
            }
            return { label, value };
          })
        : fieldMeta.enum;
    }
    return <Radio.Group ref={ref} options={options} {...rest} />;
  },
);

registerComponent('RadioGroup', xRadioGroup);
