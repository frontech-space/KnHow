import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Image from "../components/common/Image";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/features/top/Navigation";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
  };

  return (
    <Layout title="ログイン">
      {/* Navigation */}
      <Navigation />
      
      <section
        className="flex flex-col md:flex-row w-full mt-1"
        style={{ height: "calc(100vh - 142px)" }}
      >
        {/* 左：画像 */}
        <div className="w-full md:w-1/2 flex justify-center h-screen md:h-full ">
          <Image
            src="/assets/images/auth/knhow-panda-background.jpeg"
            alt="パンダの画像"
            className="max-w-full max-h-full object-cover"
          />
        </div>
        {/* 中央：縦線 */}
        <div className="hidden md:block border-l-4 border-gray-300 md:h-full mx-8"></div>
        {/* 右：フォーム */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4 md:h-full">
          <form
            className="w-full max-w-3xl rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* ユーザ名 */}
            <div className="mb-6">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label htmlFor="username" className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32">
                  ユーザ名：
                </label>
                <Input
                  type="text"
                  id="username"
                  backgroundColor="secondary"
                  textColor="white"
                  className="flex-1 py-2 px-3"
                />
              </div>
            </div>
            {/* パスワード */}
            <div className="mb-8">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label htmlFor="password" className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32">
                  パスワード：
                </label>
                <Input
                  type="password"
                  id="password"
                  backgroundColor="secondary"
                  textColor="white"
                  className="flex-1 py-2 px-3"
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <Button
                backgroundColor="primary"
                textColor="white"
                className="py-3 px-6 text-lg"
                type="reset"
              >
                リセット
              </Button>
              <Button
                backgroundColor="primary"
                textColor="white"
                className="py-3 px-6 text-lg"
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
            <div className="relative flex items-center justify-center mt-4">
              <div className="flex-grow h-0.5 bg-gray-300"></div>
              <Text textColor="black" className="px-4 text-lg">
                アカウントをお持ちでない方
              </Text>
              <div className="flex-grow h-0.5 bg-gray-300"></div>
            </div>
            <Button
              backgroundColor="primary"
              textColor="white"
              className="w-full mt-4 py-3 px-6 text-lg"
              onClick={() => navigate("/signup")}
            >
              アカウント作成
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
