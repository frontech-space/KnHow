import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Image from "../components/common/Image";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 必須項目のチェック
    if (!email || !username || !password || !confirmPassword) {
      setError("必須項目を入力してください");
      return;
    }

    // パスワード不一致のチェック
    if (password !== confirmPassword) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "アカウント作成に失敗しました");
      }

      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "アカウント作成に失敗しました");
    }
  };

  return (
    <Layout title="アカウント作成">
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
        <div className="w-full md:w-1/2 flex justify-center items-center p-4">
          <form
            className="w-full max-w-3xl rounded-lg"
            onSubmit={handleSubmit}
            role="form"
          >
            {/* メールアドレス */}
            <div className="mb-6">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="email"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  メールアドレス：
                </label>
                <Input
                  type="email"
                  id="email"
                  data-testid="email"
                  value={email}
                  className="rounded-md  bg-gray-500 text-white text-base px-12 py-3 hover:border-gray-500 flex-1 py-2 px-3"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* ユーザ名*/}
            <div className="mb-8">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="username"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  ユーザ名：
                </label>
                <Input
                  type="text"
                  id="username"
                  data-testid="username"
                  value={username}
                  className="rounded-md  bg-gray-500 text-white text-base px-12 py-3 hover:border-gray-500 flex-1 py-2 px-3"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {/* パスワード*/}
            <div className="mb-8">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="password"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  パスワード：
                </label>
                <Input
                  type="password"
                  id="password"
                  data-testid="password"
                  value={password}
                  className="rounded-md  bg-gray-500 text-white text-base px-12 py-3 hover:border-gray-500 flex-1 py-2 px-3"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* パスワード確認*/}
            <div className="mb-8">
              <div className="flex items-center bg-black rounded px-4 py-3">
                <label
                  htmlFor="password_confirmation"
                  className="text-white text-lg font-bold mr-4 whitespace-nowrap w-32"
                >
                  パスワード確認：
                </label>
                <Input
                  type="password"
                  id="password_confirmation"
                  data-testid="password_confirmation"
                  value={confirmPassword}
                  className="rounded-md  bg-gray-500 text-white text-base px-12 py-3 hover:border-gray-500 flex-1 py-2 px-3"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {/* エラーメッセージ */}
            {error && (
              <div 
                className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded relative" 
                data-testid="error-message"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}
            <div className="flex justify-between mb-6">
              <Button
                backgroundColor="primary"
                textColor="white"
                className="py-3 px-6 text-lg"
                type="reset"
                onClick={() => {
                  setEmail("");
                  setUsername("");
                  setPassword("");
                  setConfirmPassword("");
                  setError("");
                }}
              >
                リセット
              </Button>
              <Button
                backgroundColor="primary"
                textColor="white"
                className="py-3 px-6 text-lg"
                type="submit"
              >
                送信
              </Button>
            </div>
            <div className="relative flex items-center justify-center mt-4">
              <div className="flex-grow h-0.5 bg-gray-300"></div>
              <Text textColor="black" className="px-4 text-lg">
                アカウントをお持ちの方
              </Text>
              <div className="flex-grow h-0.5 bg-gray-300"></div>
            </div>
            <Button
              backgroundColor="primary"
              textColor="white"
              className="w-full mt-4 py-3 px-6 text-lg"
              onClick={() => navigate("/login")}
            >
              ログイン画面へ
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
