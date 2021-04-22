export default ({ app, redirect }, inject) => {
  inject('user', async () => {
    // ログイン中かどうかを判定
    // すでにauth.jsというプラグインを実装済みなのでそれを呼び出す
    const auth = await app.$auth()
    if (!auth) {
      redirect('/login')
    }

    // ログイン中であればusersCollection からUIDに紐付くアカウントデータを取得
    // データは snapShot という firebase の用意した形で返却される
    const usersSnapShot = await app.$firestore
      .collection('users')
      .doc(auth.uid)
      .get()

    // スナップショットはdata() メソッドを呼び出せば、登録してある name や iconImageUrl のデータが取得出来る
    const user = usersSnapShot.data()
    if (!user) {
      return null
    }

    return {
      uid: auth.uid,
      ...user
    }
  })
}