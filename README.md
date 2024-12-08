## これは何
supabaseの旧プロジェクトから新プロジェクトにstorageを全て移行するスクリプト
## 処理の流れ
1. 旧プロジェクトからstorageの中身を取得
2. 旧プロジェクトからデータをダウンロード
3. 新プロジェクトに旧プロジェクトから取ってきたデータをアップロード
## 使い方
1. supabaseのプロジェクト情報を元に、以下コードの部分を変更する
`````
// 旧supabaseのURLとサービスキー
const OLD_PROJECT_URL = '';
const OLD_PROJECT_SERVICE_KEY = '';

// 新supabaseのURLとサービスキーs
const NEW_PROJECT_URL = '';
const NEW_PROJECT_SERVICE_KEY = '';
`````

2. npm installをする。
`````
npm install
`````

3. スクリプトを実行。
`````
npx ts-node migrateStorage.ts
`````
