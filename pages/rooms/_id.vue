<template>
  <div class="relative">
    <div class="px-4 pb-32"></div>
    <form
      @submit.prevent="onSubmit"
      class="fixed bottom-0 bg-white w-full max-w-sm flex py-4 border-t border-gray-300"
    >
      <textarea
        v-model="form.message.val"
        placeholder="発言してみよう"
        class="block appearance-none w-full ml-2 py-3 px-4 rounded-lg border border-gray-400 text-darkGray focus:outline-none focus:bg-white overflow-hidden bg-blue-100"
        name="form.body"
      />
      <button
        :disable="isValidateError"
        :class="{ 'text-blue': !isValidateError }"
        class="w-2/12 flex items-center justify-center text-gray font-semibold"
      >
        送信
      </button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: ['checkAuth'],
  data () {
    return {
      form: {
        message: {
          val: null
        }
      }
    }
  },

  computed: {
    isValidateError () {
      return !this.form.message.val
    }
  },

  methods: {
    // データ登録
    async onSubmit () {
      if (this.isValidateError) {
        return
      }

      const user = await this.$user()

      // 未ログインの場合
      if (!user) {
        this.$router.push('/login')
      }

      // _からファイル名やディレクトリ名が始まる場合は、実際の画面を表示するときの path は http://3000/rooms/ルームID
      // 今回で言うとpages/rooms/_id.vue
      // 詳細：https://router.vuejs.org/ja/api/#%E3%83%AB%E3%83%BC%E3%83%88%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3
      const roomId = this.$route.params.id

      // 登録データを準備
      const chat = {
        userId: user.uid,
        name: user.name,
        iconImageUrl: user.iconImageUrl,
        body: this.form.message.val,
        createdAt: this.$firebase.firestore.FieldValue.serverTimestamp()
      }

      try {
        // Firestoreに登録
        // set ではなく add とすることで Firestore で UID を自動生成してデータを追加できる
        await this.$firestore
          .collection('rooms')
          .doc(roomId)
          .collection('chats')
          .add(chat)
        this.resetForm()
        this.scrollBottom()
      } catch (e) {
        this.setMessage({ message: '登録に失敗しました。' })
      }
    },

    scrollBottom () {
      const element = document.documentElement
      const bottom = element.scrollHeight - element.clientHeight
      window.scroll(0, bottom)
    },

    resetForm () {
      this.form.message.val = null
    }
  }
}
</script>
