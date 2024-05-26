flow.md

# Lift-off III: Arguments
## url: https://www.apollographql.com/tutorials/lift-off-part3/04-resolver-args-parameter
## API: https://odyssey-lift-off-rest-api.herokuapp.com/docs/#/Tracks/get_tracks

######################################################################

# Lift-off II: Resolvers
## url: https://www.apollographql.com/tutorials/lift-off-part2/01-journey-of-a-graphql-query
## API: https://odyssey-lift-off-rest-api.herokuapp.com/docs/

## 1
/server
`npm install && npm run dev`
/client
`npm install && npm start`

## 4
Let's add this RESTDataSource class to our project.
	Apollo DataSource REST: このライブラリは REST API からデータを取得し、それを GraphQL API を通じて提供するのに役立ちます。HTTP リクエストを行い、その応答をキャッシュしてパフォーマンスを最適化するためのユーティリティを提供します。
`npm install @apollo/datasource-rest`

## ★9 CODEGEN ON THE SERVER / models.ts
url: https://www.apollographql.com/tutorials/lift-off-part2/08-server-codegen

※ /server
`npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers`
<!-- サーバー・フォルダーのルートにcodegen.tsというファイルを作りましょう。フロントエンドで始めたのと同じボイラープレートを使用する。 -->
※ context.ts　を作成する
※ `server/src/types.ts` の export type Resolvers<ContextType = any> = {} の any を context.tsで設定したタイプで置き換える
※ server/src/datasources/track-api.ts でも `./models#AuthorModel` を作成し、mapperとして利用することで型定義を明確化する

######################################################################

## Lift-off I: Basics
# url: https://www.apollographql.com/tutorials/lift-off-part1/09-codegen

# /server dir　では、npm run dev を使用する
# /clinet dir　では、npm run start を使用する(vite)

## 4. BUILDING OUR SCHEMA
`npm install @apollo/server graphql graphql-tag`

## 5. APOLLO SERVER
モックデータを使用する
`npm install @graphql-tools/mock @graphql-tools/schema`

## 8. APOLLO CLIENT SETUP
- graphql provides the core logic for parsing GraphQL queries.
- @apollo/client contains pretty much everything we need to build our client, including an in-memory cache, local state management, and error handling.
`npm install graphql @apollo/client`

## 9. codegen
Step 1: Installing `@graphql-codegen/cli`
※ これらのパッケージが必要なのは開発時だけなので、devDependenciesの下にインストールする。
/client
`npm install -D @graphql-codegen/cli @graphql-codegen/client-preset`
