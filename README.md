## 要件:

-   Docker
-   Docker compose

## プロジェクトの実行方法

-   `bash start.sh`を実行します。
    すると 5 つのオプションが表示されます。開発環境を開始するには 1 を入力してください。他のオプションは個別のアクションを実行するためのもので、詳細は`start.sh`ファイルを確認してください。

-   1 を選択してプロジェクトが正常に実行された後、ターミナルから退出するには 4 を押すことができます。
-   API ドキュメントは[http://localhost:8081](http://localhost:8081)で、フロントエンドは[http://localhost:3000](http://localhost:3000)でアクセスできます。

## デモを確認する

[https://generosity.subashrijal.com.np/](https://generosity.subashrijal.com.np/)

## API ドキュメントを確認する

[https://generosity-be.subashrijal.com.np/](https://generosity-be.subashrijal.com.np/)

## プロジェクトを確認する

[https://github.com/subashrijal5/generosity](https://github.com/subashrijal5/generosity)

## ホストされたサーバーの詳細:

1. 自宅サーバー
2. 静的 IP アドレスを持っていないため、個人の DDNS を使用
3. Cloudflare
4. Ubuntu Server OS
5. PM2
6. Nginx

## 使用技術

### バックエンド

-   Express.js
-   Typescript
-   Zod
-   Drizzle ORM/ PGClient
-   JWT (json web token)
-   Vitest

### データベース

-   PostgreSql

### フロントエンド

-   Nuxt.js
-   Typescript
-   UI 関連/ Tailwind css
-   Vitest

### これまでにかかった時間

-   5 日間（1 日約 6 時間）

### TODO

-   テストケースの追加（時間が取れないため）
-   CICD の適切な設定
-   新しいコースの追加、コースの編集と削除、ユーザーの管理などの管理機能。
