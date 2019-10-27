import React, { useMemo } from 'react';
import { SchemaProperty } from '../form-type';
import { Form } from 'antd';
import './register';
import { registerComponent, componentDict, enhancerDict } from './register/dict';
import { GetFieldDecoratorOptions, FormProps } from 'antd/es/form/Form';

interface FieldProps extends SchemaProperty, Pick<FormProps, 'form'> {
  name: string;
  required: boolean;
  ignored: boolean;
}

export interface TargetComponentProps {
  fieldMeta: Omit<FieldProps, 'title' | 'name' | 'x-component' | 'x-params'>;
}

const Field: React.FC<FieldProps> & { registerComponent: typeof registerComponent } = ({
  title,
  name,
  ignored,
  required,
  'x-component': xComponent,
  'x-params': xParams,
  form,
  ...rest
}) => {
  const TargetComponent = componentDict.get(xComponent);
  if (!TargetComponent || !xParams) {
    console.error(`[Target:${xComponent}, xParams] =`, TargetComponent, xParams);
    return <Form.Item label={title} required={required} />;
  }

  if (ignored) {
    return <TargetComponent {...xParams} fieldMeta={rest} />;
  }

  if (!form) {
    console.error(`[Target:${xComponent}, form] =`, TargetComponent, form);
    return <Form.Item label={title} required={required} />;
  }

  const TargetEnhancer = enhancerDict.get(xComponent);

  const decorator = useMemo(() => {
    const options: GetFieldDecoratorOptions = { rules: [] };
    if (required) {
      options.rules!.push({
        required: true,
        message: '不能为空',
      });
    }
    return form.getFieldDecorator(name, TargetEnhancer ? TargetEnhancer(options) : options);
  }, [name, required, form, TargetEnhancer]);

  return (
    <Form.Item label={title}>
      {decorator(<TargetComponent {...xParams} fieldMeta={rest} />)}
    </Form.Item>
  );
};

Field.registerComponent = registerComponent;

export default Field;
