import { useState } from 'react'
import { Data, IPData } from '../interfaces/apiInterface'
import { Message } from '../interfaces/componentsInterfaces'
import { getAllIp, getMyIp } from '../api/get'
import { changeStatusIp } from '../api/put'
import { deleteStatusIp } from '../api/delete'
import { saveIpAndStatusOnList, saveIpOnList } from '../api/post'

type Props = {
  openModalChange?: any;
  setIpInfo?: any;
  setIpSelected?: any
}



export const useTableData = ({openModalChange, setIpInfo, setIpSelected}: Props ) => {

  const [message, setMessage] = useState<Message>({title: '', message: ''})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openNotificacion, setOpenNotificacion] = useState<boolean>(false)

  const getInitialData = async () =>{
    setIsLoading(true)
      try {
        localStorage.removeItem("ipList")
          const dataList: Data[] = await  getAllIp()
          const results = dataList?.filter(e => e.isDeleted !== true).map((data: Data) => {
            return {
              id: data.id,
              ip: data.ipData.ipAddress,
              country: data.ipData.countryName,
              isoCode: data.ipData.isoCode,
              currency: data.ipData.currency,
              flag: data.ipData.countryFlag,
              status: data.isBanned ? 'Bloqueada' : data.isFavourited ? 'Favorita' : 'En lista'
            }
          })
            localStorage.setItem('ipList', JSON.stringify(results) );
      } catch (error) {
        setMessage({
          title: 'warning',
          message: 'Hubo un error, por favor contactar con el administrador'
        })
        setOpenNotificacion(true)
     }
     setIsLoading(false)
    }

  const changeStatusIpList = async (ip: string, status: string) => {
    setIsLoading(true)
    try {
      const {data} = await changeStatusIp(ip, status)
      await getInitialData()
      setMessage({
        title: data.status,
        message: data.message
      })
      setOpenNotificacion(true)
      openModalChange('', '')
    } catch (error:any) {
      setMessage({
        title: 'Hubo un error',
        message: error.message
      })  
      setOpenNotificacion(true)
    }
    setIsLoading(false)
  }

  const deleteIpOnList = async (ip: string) => {
    setIsLoading(true)
    try {
      const {data}= await deleteStatusIp(ip)
      setMessage({
        title: data.status,
        message: data.message
      })
      setOpenNotificacion(true)
      await getInitialData()
      openModalChange('', '')
    } catch (error:any) {
      setMessage({
        title: 'Hubo un error',
        message: error.message
      })  
      setOpenNotificacion(true)
    }
    setIsLoading(false)
  }

  const getData = async () => {
    setIsLoading(true)
    try {
      const data =  await getMyIp()
      setIpInfo(data)
    } catch (error: any) {
      setMessage({
        title: 'Warning',
        message: error.message
      })
      setOpenNotificacion(true)
    }
    setIsLoading(false)
   }

  const ipSaveList = async ({data, currency}: any) => {
    setIsLoading(true)
    try {
      const ipDataadapted:IPData = {
        ipAddress: data.ip,
        isoCode: data.country_code,
        countryName: data.country_name,
        regionName: data.region_name,
        cityName: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        countryFlag: data?.location?.country_flag,
        currency: currency,
        conversion: 's'
      }
      const res = await saveIpOnList(data.ip, ipDataadapted)
      const dataList: Data[] = await  getAllIp()
      const results = dataList?.filter(e => e.isDeleted !== true).map((data: Data) => {
        return {
          id: data.id,
          ip: data.ipData.ipAddress,
          country: data.ipData.countryName,
          isoCode: data.ipData.isoCode,
          currency: data.ipData.currency,
          flag: data.ipData.countryFlag,
          status: data.isBanned ? 'Bloqueada' : data.isFavourited ? 'Favorita' : 'En lista'
        }
      })
        localStorage.setItem('ipList', JSON.stringify(results) );
        setIpSelected('1')
        setMessage({
          title: res.status,
          message: res.message
        })
        setOpenNotificacion(true)
        
      } catch (error: any) {
        setMessage({
          title: 'Hubo un error',
          message: error.message
        })
        setOpenNotificacion(true)
      }
      setIsLoading(false)
  } 
  const ipSaveAndStatusList = async ({data, currency}: any, status: string) => {
    setIsLoading(true)
    try {
      // localStorage.removeItem("ipList")
      const ipDataadapted:IPData = {
        ipAddress: data.ip,
        isoCode: data.country_code,
        countryName: data.country_name,
        regionName: data.region_name,
        cityName: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        countryFlag: data?.location?.country_flag,
        currency: currency,
        conversion: 'gg'
      }
      const res = await saveIpAndStatusOnList(data.ip, status, ipDataadapted)
      const dataList: Data[] = await  getAllIp()
      const results = dataList?.filter(e => e.isDeleted !== true).map((data: Data) => {
        return {
          id: data.id,
          ip: data.ipData.ipAddress,
          country: data.ipData.countryName,
          isoCode: data.ipData.isoCode,
          currency: data.ipData.currency,
          flag: data.ipData.countryFlag,
          status: data.isBanned ? 'Bloqueada' : data.isFavourited ? 'Favorita' : 'En lista'
        }
      })
        localStorage.setItem('ipList', JSON.stringify(results) );
        setIpSelected('2')
        setMessage({
          title: res.status,
          message: res.message
        })
        setOpenNotificacion(true)
      } catch (error: any) {
        setMessage({
          title: 'Hubo un error',
          message: error.message
        })
        setOpenNotificacion(true)
    }
    setIsLoading(false)
  } 

  return {
    message,
    isLoading,
    openNotificacion,
    changeStatusIpList,
    deleteIpOnList,
    setOpenNotificacion,
    getData,
    ipSaveAndStatusList,
    ipSaveList
  }
}