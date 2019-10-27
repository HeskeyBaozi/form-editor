import React from 'react';
import styled from 'styled-components';
import { ColumnFlexWrapper } from './common-styled-components';

interface MetaProps {
  title: string;
}

const Meta: React.SFC<MetaProps> = ({ title }) => {
  return (
    <ColumnFlexWrapper>
      <h2>{title}</h2>
    </ColumnFlexWrapper>
  );
};

export default Meta;
