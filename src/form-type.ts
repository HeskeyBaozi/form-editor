export interface FormSchema {
  title: string;
  description: string;
  type: string;
  properties: {
    [key: string]: SchemaProperty;
  };
  required: string[];
  'x-display': string[];
  'x-ignore': string[];
}

export type PrefetchType = {
  [key: string]: any;
};

export interface SchemaProperty {
  type: string;
  title: string;
  description: string;
  'x-component': string;
  'x-params'?: {
    [param: string]: any;
  };
  properties?: {
    [key: string]: SchemaProperty;
  };
  enum?: string[];
  items?: Pick<SchemaProperty, 'type'>[] | Pick<SchemaProperty, 'type'>;
}

export interface EditorValue {
  schema: FormSchema;
  prefetch: PrefetchType;
}
