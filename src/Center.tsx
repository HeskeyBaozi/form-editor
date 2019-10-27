import React from 'react';
import { useModeContext } from './FormEditor';

interface CenterProps {}

const Center: React.FC<CenterProps> = () => {
  const { mode } = useModeContext();
  return <div>{mode}</div>;
};

export default Center;
