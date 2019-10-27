import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Radio, Icon } from 'antd';
import { useModeContext } from './FormEditor';

interface HeaderProps {}

const HeaderWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;

  > * {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const LogoWrapper = styled.div`
  font-size: 2rem;
`;

const Header: React.FC<HeaderProps> = () => {
  const { mode, setMode } = useModeContext();
  const handleModeChange = useCallback(e => setMode(e.target.value), []);
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Icon type="edit" theme="twoTone" />
      </LogoWrapper>
      <Radio.Group value={mode} onChange={handleModeChange}>
        <Radio.Button value="edit">可视编辑</Radio.Button>
        <Radio.Button value="preview">输出预览</Radio.Button>
        <Radio.Button value="json">JSON</Radio.Button>
      </Radio.Group>
    </HeaderWrapper>
  );
};

export default Header;
