import { Apps } from '@vtex/api'

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

const getAppId = (): string => {
  return process.env.VTEX_APP_ID || ''
}

export const queries = {
  getConfig: async (_: any, __: any, ctx: Context) => {
    const {
      clients: { apps },
    } = ctx
    const appId = process.env.VTEX_APP_ID
    const { storeKey, apiUser } = await apps.getAppSettings(appId)
    return {
      storeKey,
      apiUser,
    }
  },
  getSettings: async (_: any, __: any, ctx: Context) => {
    const {
      clients: { apps },
    } = ctx
    return apps.getAppSettings(process.env.VTEX_APP_ID)
  },
  postSettings: async (_: any, args: any, ctx: Context) => {
    const { settings } = args

    const apps = new Apps(ctx.vtex)
    const app: string = getAppId()
    await apps.saveAppSettings(app, settings)
    return true
  },
}