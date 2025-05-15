import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import Image from "../components/common/Image";
import Input from "../components/common/Input";

const Contact = () => {

  const isMobile: boolean = window.innerWidth < 768;
  if (window.innerWidth >= 768) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleSubmit = (): void => {
    console.log("フォーム送信");
  };

  return (
    <Layout title="お問い合わせ">
      <div className="flex flex-col md:flex-row w-full min-h-screen h-[calc(100vh-130px)]">
        <section className="w-full md:w-[60%] flex flex-wrap justify-center items-stretch">
          <Image
                src="/assets/images/contact/knhow-panda-background.jpeg"
                alt="KnHow"
                className="w-full h-[calc(100vh-130px)] object-cover"
              />
        </section>
        <aside className="w-full md:w-[40%]">
          <Text size="medium" textColor="black" className="hidden md:block my-[5%] mx-[2%] text-center">
            お問い合わせ内容をご入力ください
          </Text>
          
          <form onSubmit={handleSubmit} className="w-[100%] block">
            <div className="bg-black h-[calc(100vh*0.1)] py-[2%] px-[2%] w-[80%] my-[3%] mx-[10%] flex items-center justify-center rounded-lg">
              <Text size="small" className="text-white">件名&nbsp;:&nbsp;</Text>
              <Input backgroundColor="secondary" id="username" name="username" className="w-[80%]"/>
            </div>

            <div className="bg-black h-[calc(100vh*0.4)] py-[2%] px-[2%] w-[80%] mx-[10%] flex items-center justify-center rounded-lg">
              <Text size="small" className="text-white">内容&nbsp;:&nbsp;</Text>
              <textarea className="w-[80%] h-full bg-gray-500 py-[1%] px-[1%] rounded-md text-black" ></textarea>
            </div>

            <div className="flex justify-between my-[5%] mx-[10%]">
              <button type="reset" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded text-lg">
                リセット
              </button>

              <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded text-lg">
                送信
              </button>
            </div>
          </form>
        </aside>
      </div>
    </Layout>
  );
};

export default Contact;