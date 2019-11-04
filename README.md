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

## LICENSE

MIT
