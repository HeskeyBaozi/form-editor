import { GetFieldDecoratorOptions } from 'antd/es/form/Form';

export const componentDict = new Map<string, React.ComponentType<any>>();
export const enhancerDict = new Map<string, (options: any) => any>();
export function registerComponent(
  name: string,
  component: React.ComponentType<any>,
  enhancer: (options: GetFieldDecoratorOptions) => GetFieldDecoratorOptions = options => options,
) {
  componentDict.set(name, component);
  enhancerDict.set(name, enhancer);
}
