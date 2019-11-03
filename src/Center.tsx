import React, { useMemo, useCallback } from 'react';
import { useModeContext, useEditorPropsContext, useChosenContext } from './FormEditor';
import SchemaForm from './components/SchemaForm';
import { Card, Tabs } from 'antd';
import styled, { css } from 'styled-components';
import OverLay from './components/OverLay';
import prettier from 'prettier/standalone';
import parserPlugin from 'prettier/parser-babylon';
import produce from 'immer';

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
  const { formValue, onFormValueChange } = useEditorPropsContext();
  const { schema, prefetch } = formValue;
  const { chosenKey, setChosenKey } = useChosenContext();
  const noop = useCallback(() => <></>, []);
  const list = useMemo(
    () =>
      schema['x-display'].map(property => ({
        name: property,
        requiredIndex: schema.required.findIndex(eleKey => eleKey === property),
        ignoredIndex: schema['x-ignore'].findIndex(eleKey => eleKey === property),
        ...schema.properties[property],
        defaultValue: prefetch[property] || undefined,
        displayIndex: schema['x-display'].findIndex(eleKey => eleKey === property),
      })),
    [formValue],
  );

  const handleClickCard = useCallback(
    (key: string) => {
      setChosenKey(key === chosenKey ? null : key);
    },
    [chosenKey],
  );

  const jsonString = useMemo(
    () =>
      prettier.format(JSON.stringify(formValue), {
        parser: 'json5',
        plugins: [parserPlugin],
      }),
    [formValue],
  );

  const onDeleteOne = useCallback(
    async (
      deleteKey: string,
      { requiredIndex, ignoredIndex, displayIndex }: { [index: string]: number },
    ) => {
      await onFormValueChange(
        produce(formValue, draftFormValue => {
          if (draftFormValue.prefetch[deleteKey]) {
            delete draftFormValue.prefetch[deleteKey];
          }
          if (draftFormValue.schema.properties[deleteKey]) {
            delete draftFormValue.schema.properties[deleteKey];
          }

          if (requiredIndex >= 0) {
            draftFormValue.schema.required.splice(requiredIndex, 1);
          }

          if (ignoredIndex >= 0) {
            draftFormValue.schema['x-ignore'].splice(ignoredIndex, 1);
          }

          if (displayIndex >= 0) {
            draftFormValue.schema['x-display'].splice(displayIndex, 1);
          }
        }),
      );
    },
    [formValue],
  );

  const onChangeOrder = useCallback(
    async (displayIndex: number, nextIndex: number) => {
      await onFormValueChange(
        produce(formValue, draftFormValue => {
          const current = draftFormValue.schema['x-display'][displayIndex];
          const next = draftFormValue.schema['x-display'][nextIndex];
          if (current !== next && typeof current === 'string' && typeof next === 'string') {
            draftFormValue.schema['x-display'][nextIndex] = current;
            draftFormValue.schema['x-display'][displayIndex] = next;
          }
        }),
      );
    },
    [formValue],
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
                  <OverLay
                    displayIndex={props.displayIndex}
                    isLast={props.displayIndex === list.length - 1}
                    onDelete={() =>
                      onDeleteOne(props.name, {
                        requiredIndex: props.requiredIndex,
                        ignoredIndex: props.ignoredIndex,
                        displayIndex: props.displayIndex,
                      })
                    }
                    onUp={() => {
                      onChangeOrder(props.displayIndex, props.displayIndex - 1);
                    }}
                    onDown={() => {
                      onChangeOrder(props.displayIndex, props.displayIndex + 1);
                    }}
                  />
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
          <pre>
            <code>{jsonString}</code>
          </pre>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Center;
