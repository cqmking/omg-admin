import httpRequest from '@/axios'

export const roleService = {
  getRoleList: params =>
    httpRequest({ url: '/omgcms/api/roles', method: 'get', params }),

  getRoleById: params =>
    httpRequest({ url: '/omgcms/api/role', method: 'get', params }),

  saveRole: data =>
    httpRequest({ url: '/omgcms/api/role', method: 'post', data }),

  deleteRoleById: params =>
    httpRequest({ url: '/omgcms/api/role', method: 'delete', params }),

  deleteRoleByIds: params =>
    httpRequest({ url: '/omgcms/api/roles', method: 'delete', params }),

  searchRole: params =>
    httpRequest({ url: '/omgcms/api/role/search', method: 'get', params }),

  removeUsersFromRole: params =>
    httpRequest({
      url: '/omgcms/api/role/remove-users',
      method: 'delete',
      params
    })
}
