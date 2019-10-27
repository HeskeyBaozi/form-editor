export interface FormSchema {
  title: string;
  description: string;
  type: 'object';
  properties: {
    [key: string]: SchemaProperty;
  };
  required: string[];
  'x-display': string[];
  'x-ignore': string[];
}

export type PrefetchType = {
  [key: string]: string | number | boolean | any[] | object;
};

export interface SchemaProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  title: string;
  description: string;
  'x-component': string;
  'x-params': {
    [param: string]: string | number | boolean | any[];
  };
  properties?: {
    [key: string]: SchemaProperty;
  };
  enum?: string[];
  items?: SchemaProperty[];
}

export interface EditorValue {
  schema: FormSchema;
  prefetch: PrefetchType;
}
