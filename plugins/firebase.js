import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
import config from './../firebaseConfig.json'

// firebase に json に定義してある設定値をセット
if (!firebase.apps.length) {
  firebase.initializeApp({ ...config })
}

// firebase の今回使用する機能を Vue インスタンスの Context に注入
// 各 vue ファイルで毎回 import しなくても firebase の機能が使用できるようになる
export default ({ app }, inject) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
  inject('fireAuth', firebase.auth())
  inject('fireStorage', firebase.storage())
}
