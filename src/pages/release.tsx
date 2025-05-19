import { useState } from "react";
import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import ReleaseItem from "../components/features/release/ReleaseCards";
import Button from "../components/common/Button";

const Release = () => {

  const [isExpanded, setIsExpanded] = useState(false);

  const releaseItems: { version: string; feature: string }[] = [
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
  ];

    const visibleItems = isExpanded ? releaseItems : releaseItems.slice(0, 4);

  return (
    <Layout title="リリースノート">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <section className="w-full md:w-[80%] flex flex-wrap justify-center md:hidden">
          {visibleItems.map((item, index) => (
            <ReleaseItem
              key={`mobile-${index}`}
              version={item.version}
              feature={item.feature}
            />
          ))}

          <div className="w-full flex justify-center mt-4">
            {!isExpanded && releaseItems.length > 4 && (
              <Button
                size="medium"
                backgroundColor="primary"
                borderColor="tertiary"
                textColor="white"
                hoverColor="opacity"
                isRound={true}
                isOutline={true}
                onClick={() => setIsExpanded(true)}
                className="w-fit px-[5%] py-[1%] mx-[1%]"
              >
                もっと見る
              </Button>
            )}
          </div>
        </section>

        <section className="hidden md:flex md:w-[80%] flex-wrap justify-center">
          {releaseItems.map((item, index) => (
            <ReleaseItem
              key={`pc-${index}`}
              version={item.version}
              feature={item.feature}
            />
          ))}
        </section>
        
        <div className="border-r-2 border-black opacity-40 self-stretch mx-2"></div>
        <aside className="w-full md:w-[18%] py-[2%]">
          <Text
            size="medium"
            textColor="black"
            className="text-left my-[1%] mx-[2%] md:text-center"
          >
            更新履歴
          </Text>
          <div className="hidden md:block border-t-2 border-black opacity-40 my-5"></div>
          {releaseItems.map((releaseItem, index) => (
            <Text
              key={index}
              size="small"
              textColor="black"
              className="text-left mx-[2%] md:text-center"
            >
              {`yyyy/MM/dd ${releaseItem.version} ${releaseItem.feature}`}
            </Text>
          ))}
        </aside>
      </div>
    </Layout>
  );
};

export default Release;
