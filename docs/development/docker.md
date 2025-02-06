# **コマンド**
`docker-compose up`
→Docker環境用　ローカルで起動

`docker-compose down`
→Docker環境用　停止

`docker-compose build`
→Docker環境用　ビルド

`docker-compose logs`
→Docker環境用　ログ確認

`docker-compose exec {container_name} {command}`
→Docker環境用　コンテナ内でコマンド実行

`docker-compose exec {container_name} yarn start`
→Docker環境用　コンテナ内でyarn start実行

`docker-compose exec {container_name} yarn build`
→Docker環境用　コンテナ内でyarn build実行

`docker-compose exec {container_name} yarn test`
→Docker環境用　コンテナ内でyarn test実行

`docker-compose exec {container_name} yarn test -- --coverage`
→Docker環境用　コンテナ内でyarn test -- --coverage実行

`docker-compose exec {container_name} yarn test -- --coverage --watchAll=false`
→Docker環境用　コンテナ内でyarn test -- --coverage --watchAll=false実行






