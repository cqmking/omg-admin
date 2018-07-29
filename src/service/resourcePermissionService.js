import httpRequest from '@/axios'

export const resourcePermissionService = {
  getResourcePermission: (params) =>
    httpRequest({ url: '/omgcms/api/resource-permission', method: 'get', params }),

  updateResourcePermission: data =>
    httpRequest({ url: '/omgcms/api/resource-permission', method: 'post', data })

}
