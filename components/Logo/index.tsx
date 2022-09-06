import React from 'react';
import { Orb } from '@zoralabs/ui';

interface LogoProps {
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ size = 30 }) => {
  return (
    /* eslint-disable-next-line react/jsx-no-target-blank */
    <a href="https://zora.co" target="_blank">
      <Orb size={size} />
    </a>
  )
};

export { Logo };
