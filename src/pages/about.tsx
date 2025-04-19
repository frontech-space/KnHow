import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";

const About = () => {
  return (
    <Layout title="このサイトについて">
      <div className="max-w-4xl mx-auto">
        <section className="mb-10">
          <Text size="medium" textColor="black" className="whitespace-pre-wrap">
            技術のキャッチアップをした{"\n"}ポートフォリオサイトになります
          </Text>
        </section>
      </div>
    </Layout>
  );
};

export default About;
