import httpRequest from '@/axios'

export const resourceService = {
  getResourceTree: () =>
    httpRequest({ url: '/omgcms/api/resource/tree', method: 'get' }),

  getResourceActions: params =>
    httpRequest({
      url: '/omgcms/api/resource/get-resource-actions',
      method: 'get',
      params
    })
}
