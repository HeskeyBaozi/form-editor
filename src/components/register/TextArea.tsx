import React from 'react';
import { Input } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import { TextAreaProps } from 'antd/es/input/TextArea';

interface xTextAreaProps extends TargetComponentProps, TextAreaProps {}

const xTextArea: React.FC<xTextAreaProps> = React.forwardRef(({ fieldMeta, ...rest }, ref) => {
  return <Input.TextArea ref={ref} {...rest} />;
});

registerComponent('TextArea', xTextArea);
