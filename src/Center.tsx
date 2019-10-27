import React, { useMemo, useCallback } from 'react';
import { useModeContext, useEditorPropsContext } from './FormEditor';
import SchemaForm from './components/SchemaForm';
import { Card, Tabs } from 'antd';

interface CenterProps {}

const Center: React.FC<CenterProps> = () => {
  const { mode } = useModeContext();
  const {
    formValue: { schema, prefetch },
  } = useEditorPropsContext();
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

  return (
    <>
      <Tabs activeKey={mode} renderTabBar={noop}>
        <Tabs.TabPane tab="Tab 1" key="edit">
          <SchemaForm schema={schema} defaultValues={prefetch}>
            {form =>
              list.map(props => (
                <Card key={props.name} style={{ marginBottom: '1rem' }}>
                  <SchemaForm.Field form={form} {...props} />
                </Card>
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
