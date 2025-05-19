/**
 * 環境に応じて正しいアセットパスを生成する
 * @param path アセットへの相対パス（/assets/から始まる）
 * @returns 環境に応じた正しいパス
 */
export const getAssetPath = (path: string): string => {
  const publicUrl = process.env.PUBLIC_URL || "";
  return publicUrl + path;
};
