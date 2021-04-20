// どこからでも呼び出せるように Vue インスタンスの Context に注入
export default ({ app }, inject) => {
    inject('auth', () => {
        return new Promise((resolve) => {
            // ログインチェックには Firebase のonAuthStateChangedメソッドを使用する必要があるため、app.$fireAuth.onAuthStateChangedにしている
            // app.$fireAuthは/plugins/firebase.jsで追加した inject('fireAuth', firebase.auth()) のこと
            app.$fireAuth.onAuthStateChanged((auth) => {
            resolve(auth || null)
            })
        })
    })
}