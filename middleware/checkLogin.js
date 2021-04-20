// redirect、appはNuxtのContextに含まれるもの
// Context : https://ja.nuxtjs.org/docs/2.x/internals-glossary/context/
// plugin を含むルートの Vue インスタンスである app
// ユーザーを別のルートにリダイレクトさせる関数のredirect

export default async function ({ redirect, app }) {
  // app.$auth() で認証中ユーザーを取得する plugin の処理を呼び出す
  // 同期処理にするため await をつける
  if (await app.$auth()) {
    // ログイン中だったらTOPページに遷移する
    redirect('/')
  }
}
