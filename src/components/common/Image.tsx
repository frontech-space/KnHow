import React from 'react';
import { ImageProps } from '~/types/common';

const Image = ({
  src, // 画像のURL
  alt, // 画像の代替テキスト
  width, // 画像の幅
  height, // 画像の高さ
  className = '', // 画像のクラス名
  lazy = true, // 画像の遅延読み込み
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