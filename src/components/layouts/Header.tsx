import React from "react";
import { Link } from "react-router-dom";
import { HeaderProps } from "../../types/layout";
import Image from "../common/Image";

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-md">
      <div className="container mx-auto px-4 md:px-7 py-3 md:py-5">
        <div className="flex items-center justify-between">
          {/* 左側：アイコン（固定） */}
          <div className="w-1/2 md:w-1/3 flex justify-start">
            <Link to="/" className="flex items-center">
              <Image 
                src="/assets/images/knhow-panda-icon.png" 
                alt="KnHow" 
                className="h-20 md:h-24 w-auto"
              />
            </Link>
          </div>

          {/* 中央：タイトル（動的） */}
          <div className="w-1/2 md:w-1/3 flex justify-center">
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800">
              {title}
            </h1>
          </div>

          {/* 右側：何もない（768px以下では非表示） */}
          <div className="hidden md:flex md:w-1/3 md:justify-end"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
