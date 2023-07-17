import React from 'react'
import './datamain.css'
import { Notificacion } from '../../Notifications/Notificacion'
import { Loading } from '../../Loading/Loading'
import { useTableData } from '../../../hooks/useTableData'


interface Props {
  ipInfo: any
  setIpInfo: (data: any)=> void
  setIpSelected: (ip:string) => void;
}

export const DatamainTab = ({ipInfo, setIpInfo, setIpSelected}: Props) => {

  const {ipSaveList, isLoading, openNotificacion, message, getData, ipSaveAndStatusList, setOpenNotificacion} = useTableData({setIpInfo, setIpSelected})

  return (
    <div className='datamain-container'>
      {isLoading && <Loading/>}
      {
        ipInfo ? (
          <>
            {
              openNotificacion && (
                <Notificacion
                message={message?.message}
                title={message?.title}
                onClose={setOpenNotificacion}
                />
                )
              }
            <div className='input-containers'>
              <div className='input-box'>
                <h3 className='title-input'>
                  País
                </h3>
                <span className='input-info'>
                  {ipInfo ? ipInfo?.data?.country_name : ''}
                </span>
              </div>
              <div className='input-box'>
                <h3 className='title-input'>
                  Ip
                </h3>
                <span className='input-info'>
                  {ipInfo ? ipInfo?.data?.ip : ''}
                </span>
              </div>
              <div className='input-box'>
                <h3 className='title-input'>
                  Codigo ISO
                </h3>
                <span className='input-info'>
                  {ipInfo ? ipInfo?.data?.country_code : ''}
                </span>
              </div>
              <div className='input-box'>
                <h3 className='title-input'>
                  Moneda
                </h3>
                <span className='input-info'>
                    {ipInfo ? ipInfo?.currency: ''}
                </span>
              </div>
              <div className='input-box'>
                <h3 className='title-input'>
                  Conversión
                </h3>
                <span className='input-info'>
                  {ipInfo ? ipInfo.conversion + ' USD': '0 USD'}
                </span>
              </div>
      
            </div>
            <div className='section-container'>
              <div>
                <img src={ipInfo?.data?.location?.country_flag} alt="flag" width={300} height={200} className='image-container' />
              </div>
              <div className='button-groups-tab'>
                <button className='button-input' onClick={()=>ipSaveList(ipInfo)}>
                  Guardar en mi lista
                </button>
                <button className='button-input fav-button-input' onClick={()=>ipSaveAndStatusList(ipInfo, 'favourite')}>
                  Agregar a favoritos
                </button>
              </div>
            </div>
              <button className='ban-button-tab' onClick={()=>ipSaveAndStatusList(ipInfo, 'ban')} >
                Bloquear IP
              </button>
          </>
        ) :(
          <button onClick={()=>getData()} className='button-ip-datamain'>
            Obtener datos de mi IP
          </button>
        )
      }
    </div>
  )
}
