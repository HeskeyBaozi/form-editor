import React, { useCallback, useEffect } from 'react';
import { Form, Button } from 'antd';
import Field from './Field';
import { FormSchema, PrefetchType } from '../form-type';
import { WrappedFormUtils } from 'antd/es/form/Form';

interface SchemaFormProps {
  form?: WrappedFormUtils<any>;
  schema: FormSchema;
  defaultValues?: PrefetchType;
  children: (form: WrappedFormUtils<any> | undefined) => any;
  onSubmit?: (form: WrappedFormUtils<any> | undefined) => void | Promise<void>;
}

const SchemaForm: React.FC<SchemaFormProps> & { Field: typeof Field } = ({
  form,
  children,
  onSubmit,
  defaultValues,
}) => {
  if (typeof children === 'function') {
    const handleClickSubmit = useCallback(() => onSubmit && onSubmit(form), [form, onSubmit]);

    return (
      <Form layout="vertical">
        {children(form)}
        {onSubmit ? (
          <Form.Item>
            <Button type="primary" icon="check" onClick={handleClickSubmit}>
              提交
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    );
  } else {
    console.error('Schema should received function as children');
  }

  return null;
};

SchemaForm.Field = Field;

export default (Form.create()(SchemaForm) as any) as typeof SchemaForm;
