import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { EditorValue } from './form-type';
import Left from './Left';
import Right from './Right';
import Header from './Header';
import constate from 'constate';
import { nest } from './utils';
import Center from './Center';

interface FormEditorProps {
  value: EditorValue;
  onChange: (newValue: EditorValue) => void | Promise<void>;
}

const GridWrapper = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 64px auto;
  grid-template-columns: 150px auto 250px;
  grid-template-areas:
    'header header right'
    'left center right';
`;

const GridBlock = styled.div`
  padding: 1rem;
`;

const GridHeader = styled(GridBlock)`
  grid-column-start: 1;
  grid-column-end: span 2;
  border-bottom: 1px solid #d9d9d9;
`;

const GridLeft = styled(GridBlock)`
  grid-row-start: 2;
  grid-row-end: span 1;
  border-right: 1px solid #d9d9d9;
`;

const GridCenter = styled(GridBlock)`
  grid-row-start: 2;
  grid-row-end: span 1;
  max-width: 600px;
`;

const GridRight = styled(GridBlock)`
  grid-row-start: 1;
  grid-row-end: span 2;
  border-left: 1px solid #d9d9d9;
`;

const [EditorPropsProvider, useEditorProps] = constate(
  ({ value, onChange }: Pick<FormEditorProps, 'value' | 'onChange'>) => {
    return useMemo(() => ({ formValue: value, onFormValueChange: onChange }), [value]);
  },
);

const [ModeProvider, useMode] = constate(({ initialMode }: { initialMode: string }) => {
  const [mode, setMode] = useState(initialMode);
  return useMemo(() => ({ mode, setMode }), [mode]);
});

export const useEditorPropsContext = useEditorProps;
export const useModeContext = useMode;

const Provider = nest(EditorPropsProvider, ModeProvider);

const FormEditor: React.FC<FormEditorProps> = React.memo(
  ({ value, onChange }) => {
    return (
      <Provider value={value} onChange={onChange} initialMode="edit">
        <GridWrapper>
          <GridHeader>
            <Header />
          </GridHeader>
          <GridLeft>
            <Left />
          </GridLeft>
          <GridCenter>
            <Center />
          </GridCenter>
          <GridRight>
            <Right />
          </GridRight>
        </GridWrapper>
      </Provider>
    );
  },
  (prev, next) => prev.value === next.value,
  // ignore 'onChange'
);

export default FormEditor;
