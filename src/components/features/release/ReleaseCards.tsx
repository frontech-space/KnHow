import Text from "../../common/Text";
import { ReleaseCardsProps } from "../../../types/common";

const ReleaseCards: React.FC<ReleaseCardsProps> = ({ version, feature }) => {
  return (
    <div className="bg-gray-300 w-[330px] h-auto my-[2%] mx-[2%] py-[10%] px-[5%] text-center rounded-lg">
      <Text size="small" textColor="black" className="whitespace-pre-wrap">
        {`${version}\n${feature}`}
      </Text>
    </div>
  );
};

export default ReleaseCards;
