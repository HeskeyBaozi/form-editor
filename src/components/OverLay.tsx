import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Icon, Button } from 'antd';

const DragHints = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  background: #2d37468c;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  color: #fff;
  cursor: pointer;

  > * {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const FunctionWrapper = styled.div`
  width: calc(28px * 3);
  left: calc(50% - 28px * 3 / 2);
  height: 24px;
  border-radius: 4px 4px 0 0;
  position: absolute;
  bottom: 0;
  margin: auto;
  text-align: center;
  overflow: hidden;
  opacity: 0;
  z-index: 100;

  .ant-btn {
    line-height: 24px;
    height: 24px;
    width: 28px;
    border-radius: 0;
    padding: 0;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  z-index: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  &:hover {
    ${DragHints} {
      opacity: 1;
    }

    ${FunctionWrapper} {
      opacity: 1;
    }
  }
`;

interface OverLayProps {
  onUp: () => any;
  onDown: () => any;
  onDelete: () => any;
  displayIndex: number;
  isLast: boolean;
}

const OverLay: React.SFC<OverLayProps> = ({ onUp, onDelete, onDown, displayIndex, isLast }) => {
  const handleClickUp: React.MouseEventHandler<HTMLElement> = useCallback(e => {
    e.stopPropagation();
    onUp();
  }, []);

  const handleClickDown: React.MouseEventHandler<HTMLElement> = useCallback(e => {
    e.stopPropagation();
    onDown();
  }, []);

  const handleClickDelete: React.MouseEventHandler<HTMLElement> = useCallback(e => {
    e.stopPropagation();
    onDelete();
  }, []);

  return (
    <CardOverlay>
      <DragHints>
        <Icon type="drag" />
        <span>点击下侧按钮可更换位置</span>
      </DragHints>
      <FunctionWrapper>
        {displayIndex === 0 ? null : (
          <Button onClick={handleClickUp} type="primary" size="small">
            <Icon type="up" />
          </Button>
        )}
        {isLast ? null : (
          <Button onClick={handleClickDown} type="primary" size="small">
            <Icon type="down" />
          </Button>
        )}
        <Button onClick={handleClickDelete} type="primary" size="small">
          <Icon type="delete" />
        </Button>
      </FunctionWrapper>
    </CardOverlay>
  );
};

export default OverLay;
