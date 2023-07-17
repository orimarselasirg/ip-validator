import React from 'react'
import './notificacion.css'

interface Props {
  title: string;
  message: string;
  onClose: (bool: boolean) => void;
}

export const Notificacion = ({message, title, onClose}: Props) => {
  return (
    <div className='notification-position'>
      <div className='notificacion-container'>
        {title === 'success' &&
        <div className='title-container-notification'>
          <img src={require('../../assets/success-icon-23194.png')}  alt={'success'} width={30} height={30} style={{alignSelf: 'center'}}/>
          <h3 className='title-notification'>{title === 'success' ? 'Aviso' : title}</h3>
        </div>
        }
        {title === 'warning' && 
        <div className='title-container-notification'>
          <img src={require('../../assets/warning_icon.png')}  alt={'success'} width={50} height={40} style={{alignSelf: 'center'}}/>
          <h3 className='title-notification'>{title === 'warning' ? 'Atención' : 'test'}</h3>
        </div>
        }
        <p className='text-notification'>{message}</p>

        <button className='button-notification' onClick={()=>onClose(false)}>
          Ok
        </button>
      </div>
      </div>
  )
}
