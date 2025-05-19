import { Link } from "react-router-dom";
import Text from "../../common/Text";

const Navigation = () => {
  return (
    <div className="bg-black flex flex-col md:flex-row w-full relative">
      <Link to="/about" className="w-full md:w-1/3 py-5 md:py-5 relative">
        <div className="flex justify-center items-center h-full">
          <Text
            size="small"
            textColor="white"
            className="hover:text-red-500 transition-colors duration-200"
          >
            このサイトについて
          </Text>
        </div>
        {/* モバイル用区切り線 */}
        <div className="md:hidden absolute bottom-0 left-0 w-full h-px bg-gray-700"></div>
        {/* デスクトップ用区切り線 */}
        <div className="hidden md:block absolute top-1/4 right-0 w-px h-1/2 bg-gray-700 transform rotate-[15deg] origin-top"></div>
      </Link>
      <Link to="/release" className="w-full md:w-1/3 py-5 md:py-5 relative">
        <div className="flex justify-center items-center h-full">
          <Text
            size="small"
            textColor="white"
            className="hover:text-red-500 transition-colors duration-200"
          >
            リリースノート
          </Text>
        </div>
        {/* モバイル用区切り線 */}
        <div className="md:hidden absolute bottom-0 left-0 w-full h-px bg-gray-700"></div>
        {/* デスクトップ用区切り線 */}
        <div className="hidden md:block absolute top-1/4 right-0 w-px h-1/2 bg-gray-700 transform rotate-[15deg] origin-top"></div>
      </Link>
      <Link to="/contact" className="w-full md:w-1/3 py-5 md:py-5 relative">
        <div className="flex justify-center items-center h-full">
          <Text
            size="small"
            textColor="white"
            className="hover:text-red-500 transition-colors duration-200"
          >
            お問い合わせ
          </Text>
        </div>
      </Link>
    </div>
  );
};

export default Navigation;
