import constate from 'constate';
import React, { useState, useMemo } from 'react';
import { FormProps } from 'antd/es/form';
import { WrappedFormUtils } from 'antd/es/form/Form';
import { Form } from 'antd';

const [Provider, useForm] = constate(({ ctx }: { ctx: WrappedFormUtils<any> }) => {
  const [form, setForm] = useState(ctx);
  return useMemo(() => ({ form }), [form]);
});

export const useFormContext = useForm;

interface SchemaFormProps extends FormProps {}

const SchemaForm: React.FC<SchemaFormProps> = ({ form, children }) => {
  return (
    <Provider ctx={form!}>
      <Form layout="vertical">{children}</Form>
    </Provider>
  );
};

export default Form.create()(SchemaForm);
