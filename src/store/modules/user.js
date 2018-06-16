const user = {
  // 状态仓库
  state: {
    userInfo: ''
  },
  // 更新状态
  mutations: {
    setUser(state, payload) {
      state.userInfo = payload.user
    }
  },

  actions: {
    setUser(context, data) {
      context.commit({
        type: 'setUser',
        user: data.user
      })
    }
  }
}

export default user
