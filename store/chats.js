export const state = () => ({
  chats: []
})

export const getters = {
  chats: state => state.chats
}

export const mutations = {
  add (state, { chat }) {
    const isEmpty = state.chats.length === 0
    const isNotAdded = !state.chats.find(c => c.id === chat.id)

    if (isEmpty || isNotAdded) {
      state.chats.push(chat)
    }
  },

  update (state, { chat }) {
    state.chats = state.chats.map((c) => {
      if (c.id === chat.id) {
        c = chat
      }
      return c
    })
  },

  remove (state, { chat }) {
    state.chats = state.chats.filter(c => c.id !== chat.id)
  },

  clear (state) {
    state.chats = []
  }
}

export const actions = {
  // roomId を受け取り対象のルームのチャットデータを取得
  // チャットの投稿時間が古いデータが上に来てほしいので.orderBy('createdAt', 'asc') で昇順で指定
  // リアルタイムにデータの追加を検知したいのでonSnapshotを使用
  subscribe ({ commit }, { roomId }) {
    return this.$firestore
      .collection('rooms')
      .doc(roomId)
      .collection('chats')
      .orderBy('createdAt', 'asc')
      .onSnapshot((chatsSnapShot) => {
        chatsSnapShot.docChanges().forEach((snapshot) => {
          const docData = snapshot.doc.data()
          const chat = {
            id: snapshot.doc.id,
            ...docData
          }

          switch (snapshot.type) {
            case 'added':
              commit('add', { chat })
              break

            case 'modified':
              commit('update', { chat })
              break

            case 'removed':
              commit('remove', { chat })
              break
          }
        })
      })
  },

  clear ({ commit }) {
    commit('clear')
  }
}
