import { Link } from "react-router-dom";
import Text from "../../common/Text";

const Navigation = () => {
  return (
    <div className="bg-black flex justify-around gap-4">
      <Link to="/about">
        <Text size="medium" textColor="white">
          このサイトについて
        </Text>
      </Link>
      <Link to="/release">
        <Text size="medium" textColor="white">
          リリースノート
        </Text>
      </Link>
      <Link to="/contact">
        <Text size="medium" textColor="white">
          お問い合わせ
        </Text>
      </Link>
    </div>
  );
};

export default Navigation;
