import React, { useMemo, useCallback } from 'react';
import { Typography, Button, Divider } from 'antd';
import { componentDict } from './components/register/dict';
import { useEditorPropsContext } from './FormEditor';

const { Title, Text } = Typography;

interface LeftProps {}

const Left: React.FC<LeftProps> = () => {
  const list = useMemo(() => [...componentDict.keys()], []);
  const { onFormValueChange, formValue } = useEditorPropsContext();
  const handleClick = useCallback(
    e => {
      const keyName = e.target.dataset.component + Date.now();
      onFormValueChange({
        ...formValue,
        schema: {
          ...formValue.schema,
          properties: {
            ...formValue.schema.properties,
            [keyName]: {
              title: keyName,
              type: 'string',
              'x-component': e.target.dataset.component,
            },
          },
          'x-display': [...formValue.schema['x-display'], keyName],
        },
      });
      console.log({
        ...formValue,
        schema: {
          ...formValue.schema,
          properties: {
            ...formValue.schema.properties,
            [keyName]: {
              'x-component': e.target.dataset.component,
            },
          },
          'x-display': [...formValue.schema['x-display'], keyName],
        },
      });
    },
    [formValue],
  );
  return (
    <>
      <Title level={3}>组件列表</Title>
      <Text type="secondary">
        单击以将组件
        <br />
        添加至表单尾部
      </Text>
      <Divider />
      {list.map(xComponent => (
        <Button
          block
          style={{ marginBottom: '1rem' }}
          key={xComponent}
          data-component={xComponent}
          onClick={handleClick}
        >
          {xComponent}
        </Button>
      ))}
    </>
  );
};

export default Left;
