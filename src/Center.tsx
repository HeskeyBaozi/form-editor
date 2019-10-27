import React, { useMemo } from 'react';
import { useModeContext, useEditorPropsContext } from './FormEditor';
import SchemaForm from './components/SchemaForm';
import { Card } from 'antd';

interface CenterProps {}

const Center: React.FC<CenterProps> = () => {
  const { mode } = useModeContext();
  const { formValue } = useEditorPropsContext();
  const list = useMemo(
    () =>
      formValue['x-display'].map(property => ({
        name: property,
        required: formValue.required.findIndex(eleKey => eleKey === property) >= 0,
        ...formValue.properties[property],
      })),
    [formValue['x-display'], formValue.properties, formValue.required],
  );

  return (
    <>
      <div>{mode}</div>
      <SchemaForm formValue={formValue}>
        {form =>
          list.map(
            ({
              name,
              required,
              title,
              type,
              description,
              'x-component': xComponent,
              'x-params': xParams,
            }) => (
              <Card key={name}>
                <SchemaForm.Field
                  form={form}
                  name={name}
                  required={required}
                  title={title}
                  type={type}
                  description={description}
                  x-component={xComponent}
                  x-params={xParams}
                />
              </Card>
            ),
          )
        }
      </SchemaForm>
    </>
  );
};

export default Center;
