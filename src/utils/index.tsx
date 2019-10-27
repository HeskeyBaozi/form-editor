import React from 'react';

export const nest = (...components: React.ComponentType<any>[]) =>
  (props => {
    const Result = components.reduceRight(
      (children, Current) => <Current {...props}>{children}</Current>,
      props.children,
    );
    return Result;
  }) as React.FC<any>;
