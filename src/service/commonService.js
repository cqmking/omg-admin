import httpRequest from '@/axios'

export const commonService = {
  getServerInfo: () =>
    httpRequest({ url: '/omgcms/api/server-info', method: 'get' })
}
