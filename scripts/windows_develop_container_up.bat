@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

rem 開発環境用

rem スクリプトの場所を取得
set SCRIPT_DIR=%~dp0

rem プロジェクトのルートディレクトリを設定
set PROJECT_ROOT=%SCRIPT_DIR%..

rem 現在の作業ディレクトリをプロジェクトルートに変更
cd /d %PROJECT_ROOT%

rem ビルドから起動したい時に使用 .envの設定に注意
docker compose down
docker compose build
docker compose up -d