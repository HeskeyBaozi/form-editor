import React from 'react';
import { Typography } from 'antd';
import { useChosenContext } from './FormEditor';

const { Title, Text } = Typography;

interface RightProps {}

const Right: React.FC<RightProps> = () => {
  const { chosenKey } = useChosenContext();
  return (
    <>
      <Title level={3}>当前字段</Title>
      <Text type="secondary">{chosenKey}</Text>
      <Title level={3}>当前属性</Title>
      <Text type="secondary">单击以将组件233</Text>
    </>
  );
};

export default Right;
