import { baseApi } from "./apiRequest"

export const getIpInfo = async (ip: any) => {
  try {
    const {data} =  await baseApi.get(`/getip?ip=${ip}`)
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getMyIp = async () => {
  try {
    const {data} = await baseApi.get(`/getmyip`)
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const getAllIp = async () => {
  try {
    const {data} = await baseApi.get(`/getallipstore`)
    return data
  } catch (error: any) {
    throw new Error(error.message)
  }
}
