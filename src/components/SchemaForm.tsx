import constate from 'constate';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FormProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Form, Card } from 'antd';
import Field from './Field';
import { useEditorPropsContext } from '../FormEditor';

interface SchemaFormProps extends FormProps {}

const SchemaForm: React.FC<SchemaFormProps> & { Field: typeof Field } = ({ form, children }) => {
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
    <Form layout="vertical">
      {list.map(
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
      )}
    </Form>
  );
};

SchemaForm.Field = Field;

export default Form.create()(SchemaForm);
