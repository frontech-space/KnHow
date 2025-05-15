import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";

const About = () => {
  return (
    <Layout title="このサイトについて">
      <section className="flex flex-col md:flex-row w-full">
        {/*テキスト＋リンク*/}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4">
          <Text size="medium" textColor="black" className="whitespace-pre-wrap">
            技術のキャッチアップをした{"\n"}ポートフォリオサイトになります
          </Text>
          <div className="border-t-4 border-black-500 full my-6"></div>
          <a
            href="https://github.com/frontech-space/KnHow"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text size="medium" textColor="red">
              ソースコードはこちら
            </Text>
          </a>
        </div>
        {/* 画像ブロック */}
        <div className="w-full md:1/2 h-full flex justify-center items-center" >
          <img
            src="/assets/images/about/pc.jpeg"
            alt="PCの画像"
            className="max-w-full max-h-full object-cover "
          />
        </div>
      </section>
    </Layout>
  );
};

export default About;
