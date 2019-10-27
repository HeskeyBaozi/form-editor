import React from 'react';
import { SchemaProperty } from '../form-type';
import { Form } from 'antd';

interface FieldProps extends SchemaProperty {
  name: string;
}

const _dict = new Map<string, React.ComponentType<any>>();
function registerComponent(name: string, component: React.ComponentType) {
  _dict.set(name, component);
}

const Field: React.FC<FieldProps> & { registerComponent: typeof registerComponent } = ({
  title,
  'x-component': xComponent,
  'x-params': xParams,
  ...rest
}) => {
  const TargetComponent = _dict.get(xComponent);
  if (!TargetComponent || !xParams) {
    return null;
  }
  return (
    <Form.Item label={title}>
      <TargetComponent {...xParams} meta={rest} />
    </Form.Item>
  );
};

Field.registerComponent = registerComponent;

export default Field;
