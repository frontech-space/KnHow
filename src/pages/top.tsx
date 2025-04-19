import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";

const Top = () => {
  return (
    <Layout title="トップページ">
      <div className="max-w-4xl mx-auto">
        <section className="mb-10">
          <Text size="large" textColor="wine-red">
            テスト
          </Text>
        </section>
      </div>
    </Layout>
  );
};

export default Top;
