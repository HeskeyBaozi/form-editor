import React from 'react';
import { Input, Descriptions } from 'antd';
import { useChosenContext } from './FormEditor';

interface RightProps {}

const Right: React.FC<RightProps> = () => {
  const { chosenKey } = useChosenContext();
  return (
    <>
      <Descriptions title="当前字段" column={1} layout="vertical">
        <Descriptions.Item label="字段键名">
          <Input value={chosenKey || undefined} />
        </Descriptions.Item>
        <Descriptions.Item label="数据类型">{chosenKey}</Descriptions.Item>
      </Descriptions>
      {/* <Title level={3}>当前属性</Title>
      <Text type="secondary">单击以将组件233</Text> */}
    </>
  );
};

export default Right;
