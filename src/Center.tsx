import React, { useMemo, useCallback } from 'react';
import { useModeContext, useEditorPropsContext, useChosenContext } from './FormEditor';
import SchemaForm from './components/SchemaForm';
import { Card, Tabs } from 'antd';
import styled, { css } from 'styled-components';
import OverLay from './components/OverLay';

interface CenterProps {}

const ClickableCard = styled(Card)`
  margin-bottom: 1rem !important;

  &:hover {
    border-color: #2d3746;
  }

  ${(props: { actived: 'actived' | 'none' }) =>
    props.actived === 'actived'
      ? css`
          border: 2.5px solid #2d3746 !important;
        `
      : ``}
`;

const Center: React.FC<CenterProps> = () => {
  const { mode } = useModeContext();
  const {
    formValue: { schema, prefetch },
  } = useEditorPropsContext();
  const { chosenKey, setChosenKey } = useChosenContext();
  const noop = useCallback(() => <></>, []);
  const list = useMemo(
    () =>
      schema['x-display'].map(property => ({
        name: property,
        required: schema.required.findIndex(eleKey => eleKey === property) >= 0,
        ignored: schema['x-ignore'].findIndex(eleKey => eleKey === property) >= 0,
        ...schema.properties[property],
        defaultValue: prefetch[property] || undefined,
      })),
    [schema, prefetch],
  );

  const handleClickCard = useCallback(
    (key: string) => {
      setChosenKey(key === chosenKey ? null : key);
    },
    [chosenKey],
  );

  return (
    <>
      <Tabs activeKey={mode} renderTabBar={noop}>
        <Tabs.TabPane tab="Tab 1" key="edit">
          <SchemaForm schema={schema} defaultValues={prefetch}>
            {form =>
              list.map(props => (
                <ClickableCard
                  actived={chosenKey === props.name ? 'actived' : 'none'}
                  onClick={() => handleClickCard(props.name)}
                  key={props.name}
                >
                  <SchemaForm.Field form={form} {...props} />
                  <OverLay />
                </ClickableCard>
              ))
            }
          </SchemaForm>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="preview">
          <SchemaForm
            schema={schema}
            defaultValues={prefetch}
            onSubmit={form => {
              if (form) {
                form.validateFields((err, values) => {
                  if (!err) {
                    console.log('Received values of form: ', values);
                  }
                });
              }
            }}
          >
            {form =>
              list.map(props => <SchemaForm.Field key={props.name} form={form} {...props} />)
            }
          </SchemaForm>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 3" key="json">
          Content of Tab Pane 3
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Center;
