import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

interface LeftProps {}

const Left: React.FC<LeftProps> = () => {
  return (
    <>
      <Title level={3}>组件列表</Title>
      <Text type="secondary">
        单击以将组件
        <br />
        添加至表单尾部
      </Text>
    </>
  );
};

export default Left;
