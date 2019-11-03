import React, { useMemo, useCallback } from 'react';
import { Input, Form, Button, Typography, Select, Switch } from 'antd';
import { useChosenContext, useEditorPropsContext } from './FormEditor';
import { FormProps, WrappedFormUtils } from 'antd/es/form/Form';
import styled from 'styled-components';
import produce from 'immer';
import { jsonSchemaTypes } from './utils';

const { Title, Text } = Typography;

interface RightProps extends FormProps {
  form?: WrappedFormUtils<EditorFormData>;
}

interface EditorFormData {
  name: string;
  type: string;
  title: string;
  description: string;
  required: number;
  ignored: number;
  defaultValue: any;
}

const SubmitGroup = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-end;
`;

const JSONSchemaTypesSelectOptions = jsonSchemaTypes.map(typeName => (
  <Select.Option key={typeName} value={typeName}>
    {typeName}
  </Select.Option>
));

const Right: React.FC<RightProps> = ({ form }) => {
  if (!form) {
    throw new Error('Right component should be wrapped by Form.create()');
  }
  const { chosenKey, setChosenKey } = useChosenContext();
  const { formValue, onFormValueChange } = useEditorPropsContext();
  const { schema, prefetch } = formValue;

  const chosenOne = useMemo(() => {
    if (chosenKey && schema && schema.properties && schema.properties[chosenKey]) {
      const one = schema.properties[chosenKey];
      return {
        ...one,
        requiredIndex: schema.required.findIndex(eleKey => eleKey === chosenKey),
        ignoredIndex: schema['x-ignore'].findIndex(eleKey => eleKey === chosenKey),
        displayIndex: schema['x-display'].findIndex(eleKey => eleKey === chosenKey),
        defaultValue: prefetch[chosenKey] || undefined,
      };
    }
    return null;
  }, [chosenKey, schema, prefetch]);

  const handleReset = useCallback(() => {
    form.resetFields();
  }, []);
  const handleSubmit = useCallback(() => {
    if (!chosenOne || !chosenKey) {
      return;
    }
    form.validateFields(
      async (err, { name: newName, required, ignored, defaultValue, ...rest }) => {
        if (!err) {
          const { requiredIndex, ignoredIndex, displayIndex } = chosenOne;
          await onFormValueChange(
            produce(formValue, draftFormValue => {
              const afterProperty = produce(
                draftFormValue.schema.properties[chosenKey],
                draftProperty => {
                  Object.assign(draftProperty, rest);
                },
              );
              delete draftFormValue.schema.properties[chosenKey];
              draftFormValue.schema.properties[newName] = afterProperty;

              // required
              if (required && requiredIndex < 0) {
                draftFormValue.schema.required.push(newName);
              }

              if (!required && requiredIndex >= 0) {
                draftFormValue.schema.required.splice(requiredIndex, 1);
              }

              // ignored
              if (ignored && ignoredIndex < 0) {
                draftFormValue.schema['x-ignore'].push(newName);
              }

              if (!ignored && ignoredIndex >= 0) {
                draftFormValue.schema['x-ignore'].splice(ignoredIndex, 1);
              }

              // draftFormValue.schema['x-ignore'].splice(
              //   ignoredIndex,
              //   1,
              //   ignored ? newKey : (undefined as any),
              // );
              // draftFormValue.schema['x-display'].splice(displayIndex, 1, newKey);
            }),
          );

          handleReset();
        }
      },
    );
  }, [form, chosenOne, chosenKey]);

  const isTouched = useMemo(() => form.isFieldsTouched(), [form]);

  if (!chosenOne) {
    return (
      <>
        <Title level={4}>选择一个组件以编辑</Title>
      </>
    );
  }

  return (
    <>
      <Title level={3}>元信息编辑</Title>
      <Form layout="vertical">
        <Form.Item label="字段键名">
          {form.getFieldDecorator('name', {
            initialValue: chosenKey,
            rules: [{ required: true, message: '不能为空' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="表单数据类型">
          {form.getFieldDecorator('type', {
            initialValue: chosenOne.type,
            rules: [{ required: true, message: '不能为空' }],
          })(<Select>{JSONSchemaTypesSelectOptions}</Select>)}
        </Form.Item>
        <Form.Item label="提示标题">
          {form.getFieldDecorator('title', {
            initialValue: chosenOne.title,
            rules: [{ required: true, message: '不能为空' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="是否必填">
          {form.getFieldDecorator('required', {
            initialValue: chosenOne.requiredIndex >= 0,
            valuePropName: 'checked',
            rules: [{ required: true, message: '不能为空' }],
          })(<Switch />)}
        </Form.Item>
        <Form.Item label="是否为展示组件且表单中忽略提交">
          {form.getFieldDecorator('ignored', {
            initialValue: chosenOne.ignoredIndex >= 0,
            valuePropName: 'checked',
            rules: [{ required: true, message: '不能为空' }],
          })(<Switch />)}
        </Form.Item>
        <Form.Item label="属性开发者描述">
          {form.getFieldDecorator('description', {
            initialValue: chosenOne.description || '',
            rules: [],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="UI组件">
          {form.getFieldDecorator('x-component', {
            initialValue: chosenOne['x-component'],
            rules: [{ required: true, message: '不能为空' }],
          })(<Input />)}
        </Form.Item>
      </Form>
      <SubmitGroup>
        <Button.Group size="small">
          <Button disabled={!isTouched} onClick={handleReset}>
            重置
          </Button>
          <Button type="primary" disabled={!isTouched} onClick={handleSubmit}>
            修改
          </Button>
        </Button.Group>
      </SubmitGroup>
    </>
  );
};

export default Form.create()(Right);
