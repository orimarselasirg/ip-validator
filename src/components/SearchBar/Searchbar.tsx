import React, { useState } from 'react'
import './searchbar.css'
import { getIpInfo } from '../../api/get'

interface Props {
  setIpInfo: (data:any) => void
  setIsLoading: (bool: boolean) => void;
  setOpenNotificacion: (bool:boolean) => void
  setMessage: (data:{title: string, message: string}) => void
} 

export const Searchbar = ({setIpInfo, setIsLoading, setOpenNotificacion, setMessage}: Props) => {
  const [ipInput, setIpInput] = useState<string>('')


  const handleChange = (e: any) => {
    const value = e.target.value
    const filteredValue = value.replace(/[^0-9.]/g, '');
    setIpInput(filteredValue)
  }


  const getIpData = async (ip: string) => {
    setIsLoading(true)
    try {
      const data =  await getIpInfo(ip)
      setIpInput('')
      setIpInfo(data)
    } catch (error: any) {
      setMessage({
        title: 'warning',
        message: 'La ip buscada no existe'
      })
      setOpenNotificacion(true)
    }
    setIsLoading(false)
  }
  return (
    <div className='home-searchbar'>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <input type="text" placeholder='Ingresa una direccion Ip valida' className='input-search' onChange={(e) => handleChange(e)} value={ipInput}/>
      </div>
      <button className='input-button' onClick={()=>getIpData(ipInput)}>Buscar</button>
    </div>
  )
}
