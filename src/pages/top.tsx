import Layout from "../components/layouts/Layout";
import Navigation from "../components/features/top/navigation";

const Top = () => {
  return (
    <Layout title="トップページ">
      <div className="w-full mx-auto">
        <section className="mb-10">
          <Navigation />
        </section>
      </div>
    </Layout>
  );
};

export default Top;
