import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import ReleaseItem from "../components/features/release/ReleaseItem";

const Release = () => {

  const releaseItems: { version: string; feature: string }[] = [
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
    { version: "Ver1.0", feature: "-ノウハウ共有機能" },
  ];

  return (
    <Layout title="リリースノート">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        <section className="w-full md:w-[80%] flex flex-wrap justify-center">
          {releaseItems.map((releaseItem, index) => (
              <ReleaseItem 
                key={index}
                version={releaseItem.version} 
                feature={releaseItem.feature} 
              />
            ))}
        </section>
        <div className="border-r-2 border-black opacity-40 self-stretch mx-2"></div>
        <aside className="w-full md:w-[18%] py-[2%]">
          <Text size="medium" textColor="black" className="text-left my-[1%] mx-[2%] md:text-center">
                    更新履歴
          </Text>
          <div className="hidden md:block border-t-2 border-black opacity-40 my-5"></div>
          <Text size="small" textColor="black" className="text-left mx-[2%] md:text-center">
                  yyyy/MM/dd Ver1.0リリース
          </Text>
        </aside>
      </div>
    </Layout>
  );
};

export default Release;