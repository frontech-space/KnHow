import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";

const Login = () => {
  return (
    <Layout title="ログイン">
      <section className="flex flex-col md:flex-row w-full mt-1" style={{ height: "calc(100vh - 142px)" }}>
        {/* 左：画像 */}
        <div className="w-full md:w-1/2 flex justify-center h-screen md:h-full ">
          <img
            src="/assets/images/auth/knhow-panda-background.jpeg"
            alt="パンダの画像"
            className="max-w-full max-h-full object-cover "
          />
        </div>
        {/* 中央：縦線 */}
        <div className="hidden md:block border-l-4 border-gray-300 md:h-full mx-8"></div>
        {/* 右：フォーム */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center px-4 md:h-full">
          {/* <form className="w-full max-w-xs bg-transparent rounded-lg p-0"> */}
          <form className="w-full max-w-3xl rounded-lg">
            {/* ユーザ名 */}
            <div className="mb-6">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="username"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  ユーザ名：
                </label>
                <input
                  type="text"
                  id="username"
                  className="flex-1 py-2 px-3 bg-gray-600 text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder=""
                />
              </div>
            </div>
            {/* パスワード */}
            <div className="mb-8">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="password"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  パスワード：
                </label>
                <input
                  type="password"
                  id="password"
                  className="flex-1 py-2 px-3 bg-gray-600 text-white border-none rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <button
                type="reset"
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded text-lg"
              >
                リセット
              </button>
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded text-lg"
              >
                送信
              </button>
            </div>
            <div className="text-white text-lg mt-4 text-center">
              アカウントをお持ちでない方
            </div>
            <button
              type="button"
              className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded w-full mt-4 text-lg"
            >
              アカウント作成
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
