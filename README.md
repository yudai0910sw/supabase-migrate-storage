## これは何
supabaseの旧プロジェクトから新プロジェクトにstorageを全て移行するスクリプト

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
