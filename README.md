## 要件:

- Docker
- Docker compose

## プロジェクトの実行方法

- `bash start.sh`を実行します。
すると5つのオプションが表示されます。開発環境を開始するには1を入力してください。他のオプションは個別のアクションを実行するためのもので、詳細は`start.sh`ファイルを確認してください。

- 1を選択してプロジェクトが正常に実行された後、ターミナルから退出するには4を押すことができます。
- APIドキュメントは[http://localhost:8081](http://localhost:8081)で、フロントエンドは[http://localhost:3000](http://localhost:3000)でアクセスできます。

## デモを確認する

[https://generosity.subashrijal.com.np/](https://generosity.subashrijal.com.np/)

## APIドキュメントを確認する

[https://generosity-be.subashrijal.com.np/](https://generosity-be.subashrijal.com.np/)

## プロジェクトを確認する

[https://github.com/subashrijal5/generosity](https://github.com/subashrijal5/generosity)

## ホストされたサーバーの詳細:

1. 自宅サーバー
2. 静的IPアドレスを持っていないため、個人のDDNSを使用
3. Cloudflare
4. Ubuntu Server OS
5. PM2
6. Nginx

## 使用技術

### バックエンド

- Express.js
- Typescript
- Zod
- Drizzle ORM/ PGClient
- JWT (json web token)
- Vitest

### データベース

- PostgreSql

### フロントエンド

- Nuxt.js
- Typescript
- UI関連/ Tailwind css
- Vitest

### これまでにかかった時間

- 5日間（1日約6時間）

### TODO

- テストケースの追加（時間が取れないため）
- CICDの適切な設定
