import React, { useMemo, useCallback } from 'react';
import { Input, Form, Button, Typography, Select } from 'antd';
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
  key: string;
  type: string;
  title: string;
  description: string;
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

  const chosenOne = useMemo(
    () =>
      (chosenKey &&
        formValue &&
        formValue.schema &&
        formValue.schema.properties &&
        formValue.schema.properties[chosenKey]) ||
      null,
    [chosenKey, formValue],
  );

  const handleReset = useCallback(() => {
    form.resetFields();
  }, []);
  const handleSubmit = useCallback(() => {
    if (!chosenOne || !chosenKey) {
      return;
    }
    form.validateFields(async (err, values) => {
      if (!err) {
        await onFormValueChange(
          produce(formValue, draftFormValue => {
            const afterProperty = produce(chosenOne, draftProperty => {
              const { key, ...rest } = values;
              Object.assign(draftProperty, rest);
            });
            delete draftFormValue.schema.properties[chosenKey];
            draftFormValue.schema.properties[values.key] = afterProperty;
          }),
        );

        handleReset();
      }
    });
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
          {form.getFieldDecorator('key', {
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
        <Form.Item label="属性开发者描述">
          {form.getFieldDecorator('description', {
            initialValue: chosenOne.description,
            rules: [{ required: true, message: '不能为空' }],
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
