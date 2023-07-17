import { baseApi } from "./apiRequest"

export const changeStatusIp = async (ip: string, status: string) => {
  const data =  await baseApi.put(`/updateipstatus`,{ ip, status})
  return data
}

