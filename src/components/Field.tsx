import React, { useMemo } from 'react';
import { SchemaProperty } from '../form-type';
import { Form } from 'antd';
import './register';
import { registerComponent, _dict } from './register/dict';
import { GetFieldDecoratorOptions, FormProps } from 'antd/es/form/Form';

interface FieldProps extends SchemaProperty, Pick<FormProps, 'form'> {
  name: string;
  required: boolean;
}

export interface TargetComponentProps {
  fieldMeta: Omit<FieldProps, 'title' | 'name' | 'x-component' | 'x-params'>;
}

const Field: React.FC<FieldProps> & { registerComponent: typeof registerComponent } = ({
  title,
  name,
  required,
  'x-component': xComponent,
  'x-params': xParams,
  form,
  ...rest
}) => {
  const TargetComponent = _dict.get(xComponent);
  if (!TargetComponent || !xParams || !form) {
    console.error(
      `[TargetComponent:${xComponent}, xParams, form] =`,
      TargetComponent,
      xParams,
      form,
    );
    return null;
  }

  const decorator = useMemo(() => {
    const options: GetFieldDecoratorOptions = { rules: [] };
    if (required) {
      options.rules!.push({
        required: true,
        message: '不能为空',
      });
    }
    return form.getFieldDecorator(name, options);
  }, [name, required, form]);

  return (
    <Form.Item label={title}>
      {decorator(<TargetComponent {...xParams} fieldMeta={rest} />)}
    </Form.Item>
  );
};

Field.registerComponent = registerComponent;

export default Field;
