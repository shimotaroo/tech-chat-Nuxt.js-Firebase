export const state = () => ({
  // 全てのチャットルームを配列でほじ
  rooms: []
})

export const getters = {
  rooms: state => state.rooms
}

export const mutations = {
  // 同じデータが 2 重で表示されてしまうのを防ぐために、同じ ID のデータが存在しないかチェックしてからデータを配列の先頭に追加
  add (state, { room }) {
    const isNotAdded = !state.rooms.find(r => r.id === room.id)

    if (isNotAdded) {
      state.rooms.unshift(room)
    }
  },

  update (state, { room }) {
    state.rooms = state.rooms.map((r) => {
      if (r.id === room.id) {
        r = room
      }
      return r
    })
  },

  remove (state, { room }) {
    state.rooms = state.rooms.filter(r => r.id !== room.id)
  },

  clear (state) {
    state.rooms = []
  }
}

export const actions = {
  subscribe ({ commit }) {
    // this.$firestore.collection('rooms').orderBy('createdAt', 'asc')：roomsコレクションのデータを作成日の昇順で取得
    return this.$firestore
      .collection('rooms')
      .orderBy('createdAt', 'asc')
      // データベース上に変更があった場合、すぐに反映させるリアルタイムアップデートを行う
      // Firestore でリアルタイムアップデートを取得するには、onSnapshot を使用
      .onSnapshot((roomsSnapShot) => {
        roomsSnapShot.docChanges().forEach((snapshot) => {
          const room = {
            // id: snapshot.doc.id はrooms内のドキュメントの UID が取得できる
            id: snapshot.doc.id,
            // 実際のデータ(部屋の名前とか)は、snapshot.doc.data() で受け取ることができる
            // {
            //   name: '今日の晩御飯について話す部屋',
            //   topImageUrl: 'https://firebasestorage....',
            //   createdAt: '2020/1/7 7:43:40'
            // }
            ...snapshot.doc.data()
          }

          // snapshot.type とはドキュメントに発生したイベントの種類が含まれており、それぞれ、追加、変更、削除の 3 タイプがある
          switch (snapshot.type) {
            case 'added':
              commit('add', { room })
              break

            case 'modified':
              commit('update', { room })
              break

            case 'removed':
              commit('remove', { room })
              break
          }
        })
      })
  },

  clear ({ commit }) {
    commit('clear')
  }
}
