import { useState, ChangeEvent, FormEvent } from "react";
import Layout from "../components/layouts/Layout";
import Text from "../components/common/Text";
import Image from "../components/common/Image";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Contact = () => {

  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleReset = (): void => {
    setSubject("");
    setMessage("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("件名:", subject);
    console.log("内容:", message);
  };

  //inputにvalueとonChangeが引数で含まれないため、一旦仮実装
  const handleSubjectChange = (e: ChangeEvent<HTMLInputElement>): void => {
  setSubject(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value);
  };

  return (
    <Layout title="お問い合わせ">
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-180px)]">
        <section className="w-full md:w-[60%] flex flex-wrap justify-center items-stretch">
          <Image
                src="/assets/images/contact/knhow-panda-background.jpeg"
                alt="KnHow"
                className="w-full h-[calc(80vh)] object-cover"
              />
        </section>
        <aside className="w-full md:w-[40%] min-h-[calc(100vh-180px)]">
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
              <textarea className="w-[80%] h-full bg-gray-500 py-[1%] px-[1%] rounded-md text-black" value={message} onChange={handleMessageChange} ></textarea>
            </div>

            <div className="flex justify-between my-[5%] mx-[10%]">
              <Button
              size="medium"
              backgroundColor="primary"
              borderColor="tertiary"
              textColor="white"
              hoverColor="opacity"
              isRound={true}
              isOutline={true}
              onClick={handleReset}
              className="w-fit px-[5%] py-[1%] mx-[1%]"
              >
                リセット
              </Button>

              <Button
                size="medium"
                backgroundColor="primary"
                borderColor="tertiary"
                textColor="white"
                hoverColor="opacity"
                isRound={true}
                isOutline={true}
                onClick={() => (handleSubmit)}
                className="w-fit px-[5%] py-[1%] mx-[1%]"
                >
                  送信
              </Button>
            </div>
          </form>
        </aside>
      </div>
    </Layout>
  );
};

export default Contact;