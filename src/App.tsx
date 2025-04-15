import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Button from "./components/common/Button";
import Input from "./components/common/Input";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-4 py-8 bg-red-500">
        {/* TODO テスト用のボタンと入力フォーム */}
        <Button
          onClick={() => {}}
          size="small"
          backgroundColor="primary"
          borderColor="secondary"
          textColor="white"
          hoverColor="secondary"
          isDisabled={false}
          isRound={false}
          isOutline={true}
          className=""
        >
          ボタン
        </Button>
        <Input
          size="small"
          backgroundColor="primary"
          borderColor="secondary"
          textColor="white"
          hoverColor="primary"
          isDisabled={false}
          isRound={false}
          isOutline={true}
          className=""
          placeholder="プレースホルダー"
          type="text"
          name="name"
          id="id"
        />
        <Routes></Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
