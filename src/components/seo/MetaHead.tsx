import { Helmet } from "react-helmet-async";
import { generateMetadata } from "../../utils/metadata";
import type { MetaHeadProps } from "../../types/seo";

/**
 * メタデータを含むHeadタグを生成するコンポーネント
 */
const MetaHead = ({ title, description }: MetaHeadProps) => {
  // メタデータを生成
  const metadata = generateMetadata({
    title,
    description,
  });

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </Helmet>
  );
};

export default MetaHead;
