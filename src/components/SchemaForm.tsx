import React from 'react';
import { FormProps } from 'antd/es/form';
import { Form } from 'antd';
import Field from './Field';
import { FormSchema } from '../form-type';
import { WrappedFormUtils } from 'antd/es/form/Form';

interface SchemaFormProps extends FormProps {
  formValue: FormSchema;
  children: (form: WrappedFormUtils<any> | undefined) => any;
}

const SchemaForm: React.FC<SchemaFormProps> & { Field: typeof Field } = ({ form, children }) => {
  if (typeof children === 'function') {
    return <Form layout="vertical">{children(form)}</Form>;
  } else {
    console.error('Schema should received function as children');
  }

  return null;
};

SchemaForm.Field = Field;

export default (Form.create()(SchemaForm) as any) as typeof SchemaForm;
