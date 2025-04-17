import React from 'react';
import { ImageProps } from '~/types/common';

const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  lazy = true,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={lazy ? 'lazy' : 'eager'}
    />
  );
};

export default Image; 