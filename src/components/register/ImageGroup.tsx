import React, { useCallback } from 'react';
import { TargetComponentProps } from '../Field';
import { registerComponent } from './dict';
import styled from 'styled-components';
import { Modal } from 'antd';

interface xImageGroup extends TargetComponentProps {
  value?: string[];
}

const ImageGroupWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 20vh;
  overflow-x: scroll;
  overflow-y: hidden;
  align-items: center;

  > * {
    max-height: 100%;
    margin-right: 1rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

const DetailImageWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

const xImageGroup: React.FC<xImageGroup> = React.forwardRef(
  ({ fieldMeta, value = [], ...rest }, ref: any) => {
    const handleClickImage = useCallback(e => {
      Modal.info({
        title: '图片详情',
        content: (
          <DetailImageWrapper>
            <img src={e.target.src} style={{ maxWidth: '100%' }} />
          </DetailImageWrapper>
        ),
        onOk() {},
        width: '75vw',
        maskClosable: true,
      });
    }, []);
    return (
      <ImageGroupWrapper {...rest} ref={ref}>
        {value.map(url => (
          <img key={url} src={url} onClick={handleClickImage} />
        ))}
      </ImageGroupWrapper>
    );
  },
);

registerComponent('ImageGroup', xImageGroup);
