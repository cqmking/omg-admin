import httpRequest from '@/axios'

export const userService = {
  getLoginUser: () =>
    httpRequest({ url: '/omgcms/api/current-user', method: 'get' }),

  getUserList: params =>
    httpRequest({ url: '/omgcms/api/users', method: 'get', params }),

  // 参数必须用data，使用params传递会转为queryString提交
  saveUser: data =>
    httpRequest({ url: '/omgcms/api/user', method: 'post', data }),

  getUserById: params =>
    httpRequest({ url: '/omgcms/api/user', method: 'get', params }),

  deleteUserById: params =>
    httpRequest({ url: '/omgcms/api/user', method: 'delete', params }),

  deleteUserByIds: params =>
    httpRequest({ url: '/omgcms/api/users', method: 'delete', params }),

  searchUser: params =>
    httpRequest({ url: '/omgcms/api/user/search', method: 'get', params }),

  getUnassignedUsersByRoleId: params =>
    httpRequest({
      url: '/omgcms/api/user/get-unassigned-users',
      method: 'get',
      params
    }),

  getAssignedUsersByRoleId: params =>
    httpRequest({
      url: '/omgcms/api/user/get-assigned-users',
      method: 'get',
      params
    }),

  assignUsersToRole: params =>
    httpRequest({
      url: '/omgcms/api/user/assign-users-to-role',
      method: 'post',
      params
    })
}
