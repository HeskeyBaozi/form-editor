export const _dict = new Map<string, React.ComponentType<any>>();
export function registerComponent(name: string, component: React.ComponentType<any>) {
  _dict.set(name, component);
}
