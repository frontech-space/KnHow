/**
 * SEOのためのメタデータを生成するユーティリティ
 */

import { METADATA } from "../constants/metadata";

/**
 * ページのメタデータを生成する
 * @param title ページタイトル
 * @param description ページの説明
 * @returns メタデータオブジェクト
 */
export function generateMetadata({
  title,
  description = METADATA.description,
}: {
  title: string;
  description?: string;
}) {
  // ページタイトルの形式
  const formattedTitle = `${METADATA.title} | ${title}`;

  return {
    // 基本メタデータ
    title: formattedTitle,
    description,
  };
}
