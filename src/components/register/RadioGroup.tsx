import React from 'react';
import { Radio } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import { RadioGroupProps } from 'antd/es/radio';

interface xRadioGroupProps extends TargetComponentProps, RadioGroupProps {
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
