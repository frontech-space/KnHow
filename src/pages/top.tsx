import Layout from "../components/layouts/Layout";
import Navigation from "../components/features/top/navigation";
import Image from "../components/common/Image";
import Text from "../components/common/Text";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

// スタイルを追加
const styles = {
  imageContainerDesktop: {
    clipPath: "polygon(100px 0, 100% 0, 100% 100%, 0 100%)",
  },
};

const Top = () => {
  const navigate = useNavigate();

  return (
    <Layout title="トップページ">
      {/* Navigation */}
      <Navigation />

      {/* メインコンテンツ - flex-growを使って残りの高さを全て使用 */}
      <div className="flex-grow grid grid-rows-1 grid-cols-1 md:grid-cols-12">
        {/* 左側：テキスト（モバイルでは下に表示） */}
        <div className="order-2 md:order-1 md:col-span-5 bg-white p-6 md:p-10 flex flex-col justify-center z-10">
          <Text size="large" textColor="black" className="text-center py-1">
            カンホー
          </Text>
          <Text textColor="wine-red" className="text-center py-1">
            - ノウハウ共有ツール -
          </Text>
          <Button
            size="large"
            backgroundColor="primary"
            borderColor="tertiary"
            textColor="white"
            hoverColor="opacity"
            isRound={true}
            isOutline={true}
            onClick={() => navigate("/signup")}
            className="w-fit mx-auto px-24 py-7 mt-4"
          >
            はじめる
          </Button>
        </div>

        {/* 右側：背景画像エリア（モバイルでは上に表示） */}
        <div className="order-1 md:order-2 md:col-span-7 min-h-[300px] md:min-h-0 relative">
          {/* モバイル表示用 */}
          <div className="absolute inset-0 overflow-hidden md:hidden">
            <Image
              src="/assets/images/top/background.jpeg"
              alt="KnHow"
              className="w-full h-full object-cover"
            />
          </div>

          {/* デスクトップ表示用（斜めカット） */}
          <div
            className="absolute inset-0 overflow-hidden hidden md:block"
            style={styles.imageContainerDesktop}
          >
            <Image
              src="/assets/images/top/background.jpeg"
              alt="KnHow"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Top;
