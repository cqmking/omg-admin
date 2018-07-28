import httpRequest from '@/axios'

export const resourceService = {
  getResourceTree: params =>
    httpRequest({ url: '/omgcms/api/resource/tree', method: 'get' })

}
