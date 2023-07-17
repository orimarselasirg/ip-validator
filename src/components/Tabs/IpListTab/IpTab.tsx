import React, { useState, useEffect } from 'react'
import { Table } from '../../Table/Table'
import { IpList } from '../../../interfaces/componentsInterfaces';

const columns = [
  {
    title: 'N°'
  },
  {
    title: 'Pais'
  },
  {
    title: 'ISO Code'
  },
  {
    title: 'Moneda'
  },
  {
    title: 'Ip'
  },
  {
    title: 'Bandera'
  },
  {
    title: 'Status'
  },
  {
    title: 'Cambiar Estado'
  },
  {
    title: '¿Eliminar?'
  }
]

interface Props {
  ipSelected: string,
  setIpSelected: (ip:string) => void;
}

export const IpTab = ({ipSelected, setIpSelected}: Props) => {

  const [ipList, setIpList] = useState<IpList[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [status, setStatus] = useState<string>('')
  useEffect(()=>{
    setIpList(JSON.parse(localStorage.getItem("ipList") as string))
  },[ipSelected])

  const openModalChange = (value: string, ip: string)=> {
    setOpenModal(!openModal)
    setStatus(value)
    setIpSelected(ip)
  }

  return (
    <Table
      ipSelected={ipSelected}
      bodyTable={ipList}
      columns={columns}
      openModalChange={openModalChange}
      status={status}
      openModal={openModal}
      statusTextButton='Cambiar status'
      confirmDeleteTextModal='¿Estas seguro de eliminar esta IP de tus listados?'
      deleteTextButton='Eliminar esta IP'
      modalFavTextButton='Agregar a favoritos'
      modalBanTextButton='Bloquear esta IP'
      modalListTextButton='Agregar a lista general'
    />
  )
}
