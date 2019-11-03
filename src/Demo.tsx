import React, { useState } from 'react';
import FormEditor from './FormEditor';
import { EditorValue } from './form-type';

const baseValue = {
  schema: {
    title: 'Image judger form',
    description: 'simple description',
    type: 'object',
    properties: {
      images: {
        title: '图片集合',
        type: 'array',
        description: '展示用的图片',
        items: {
          type: 'string',
        },
        'x-component': 'ImageGroup',
        'x-params': {},
      },
      imagesDescription: {
        title: '简单介绍',
        type: 'string',
        description: '图片简介文字',
        'x-component': 'TextView',
        'x-params': {
          markdown: true,
        },
      },
      isQualified: {
        title: '是否合格',
        type: 'boolean',
        description: '图片是否合格',
        'x-component': 'Switch',
        'x-params': {
          size: 'small',
        },
      },
      satisfaction: {
        title: '满意度打分',
        type: 'string',
        description: '满意度',
        enum: ['ok', 'soso', 'bad'],
        'x-component': 'RadioGroup',
        'x-params': {
          buttonStyle: 'solid',
          enumLabels: ['很OK', '一般', '不好'],
        },
      },
      unqualifiedReason: {
        title: '不合格原因（合格可不填）',
        type: 'string',
        description: '',
        'x-component': 'TextArea',
        'x-params': {
          placeholder: '请简单介绍一下不合格的原因（合格可不填）',
          autoSize: {
            minRows: 4,
            maxRows: 10,
          },
        },
      },
    },
    required: ['isQualified'],
    'x-display': [
      'images',
      'imagesDescription',
      'satisfaction',
      'isQualified',
      'unqualifiedReason',
    ],
    'x-ignore': ['images', 'imagesDescription'],
  },
  prefetch: {
    imagesDescription: '# 这是一段对图片集合的描述',
    images: [
      'https://via.placeholder.com/300x300',
      'https://via.placeholder.com/350x350',
      'https://via.placeholder.com/400x400',
      'https://via.placeholder.com/450x450',
      'https://via.placeholder.com/500x500',
    ],
  },
};

const DemoEditor: React.FC = () => {
  const [value, setValue] = useState<EditorValue>(baseValue);
  return (
    <FormEditor
      value={value}
      onChange={val => {
        console.log('new', val);
        setValue(val);
      }}
    />
  );
};

export default DemoEditor;
