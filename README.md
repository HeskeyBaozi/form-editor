# Form Editor

## Get Started

所需环境：`nodejs 10.0+`, `npm` 或 `yarn` 管理器

```bash
$ yarn install # 稍等片刻安装依赖，与网络环境有关
$ yarn link
$ cd path/to/your/project
$ yarn link "form-editor" # 在你的项目中符号链接至此包
```

## Usage

```tsx
import { FormEditor, EditorValue } from 'form-editor';

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
```

## Component Devlopment

组件注册函数 `registerComponent()` 接口如下
```tsx
type registerComponent = (
  name: string, // 注册的组件名字，即 `x-component`
  component: React.ComponentType<any>, // 实际使用组件
  enhancer?: (options: GetFieldDecoratorOptions) => GetFieldDecoratorOptions,
) => void // （可选）绑定表单时对 `antd.form` 的 `options` 进行加强
```

以开发一个开关组件为例

```tsx
import React from 'react';
import { Switch } from 'antd';
import { SwitchProps } from 'antd/es/switch';

// 导入注册函数 `registerComponent` 和基本组件类型
import { registerComponent, TargetComponentProps } from 'form-editor';

interface xSwitchProps extends TargetComponentProps, SwitchProps {}

const xSwitch: React.FC<xSwitchProps> = React.forwardRef(({ fieldMeta, ...rest }, ref: any) => {

  // 注意转发 Ref 
  return <Switch ref={ref} {...rest} />;
});


// 注册组件
registerComponent('Switch', xSwitch, options => ({
  ...options,
  valuePropName: 'checked', // `value` 值对开关组件来说是 `checked`
}));
```

如果组件在页面左边栏展示，表示注册成功

## LICENSE

MIT
