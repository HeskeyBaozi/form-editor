import React from 'react';
import { Typography } from 'antd';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import Markdown from 'react-markdown';

interface xTextViewProps extends TargetComponentProps {
  value?: string;
  markdown?: boolean;
}

const xTextView: React.FC<xTextViewProps> = React.forwardRef(
  ({ fieldMeta, value = '{{ TextView }}', markdown, ...rest }, ref: any) => {
    if (markdown) {
      return <Markdown source={value} escapeHtml={true} />;
    }
    return <Typography.Text {...rest}>{value}</Typography.Text>;
  },
);

registerComponent('TextView', xTextView);
