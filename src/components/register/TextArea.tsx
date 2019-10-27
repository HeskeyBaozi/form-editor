import React from 'react';
import { Input } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import { TextAreaProps } from 'antd/es/input/TextArea';

interface xTextAreaProps extends TargetComponentProps, TextAreaProps {
  placeholder?: string;
}

const xTextArea: React.FC<xTextAreaProps> = React.forwardRef(
  ({ fieldMeta, placeholder, ...rest }, ref: any) => {
    return <Input.TextArea ref={ref} placeholder={placeholder} {...rest} />;
  },
);

registerComponent('TextArea', xTextArea);
