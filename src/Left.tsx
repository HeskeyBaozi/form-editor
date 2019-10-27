import React, { useMemo, useCallback } from 'react';
import { Typography, Button, Divider } from 'antd';
import { componentDict } from './components/register/dict';

const { Title, Text } = Typography;

interface LeftProps {}

const Left: React.FC<LeftProps> = () => {
  const list = useMemo(() => [...componentDict.keys()], []);
  const handleClick = useCallback(e => {
    console.log(e.target.dataset.component);
  }, []);
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
