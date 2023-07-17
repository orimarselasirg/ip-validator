import {useState} from 'react'
import './homescreens.css'
import { Searchbar } from '../../components/SearchBar/Searchbar'
import { Tabs } from '../VerticalTabs/Tabs'
import { Loading } from '../../components/Loading/Loading'
import { Notificacion } from '../../components/Notifications/Notificacion'
import { Message } from '../../interfaces/componentsInterfaces'

type Props = {
  ipSelected: string
  setIpSelected: (ip:string) => void;
}


export const HomeScreens = ({ipSelected, setIpSelected}: Props) => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openNotificacion, setOpenNotificacion] = useState<boolean>(false)
  const [message, setMessage] = useState<Message>({title: '', message: ''})
  const [ipInfo, setIpInfo] = useState()

  return (
    <div className='home-container'>
      {isLoading && <Loading/>}
      {
        !isLoading && openNotificacion &&
        <Notificacion
          message={message.message}
          title={message.title}
          onClose={setOpenNotificacion}
        />
      }
      <Searchbar
        setIpInfo={setIpInfo}
        setIsLoading={setIsLoading}
        setOpenNotificacion={setOpenNotificacion}
        setMessage={setMessage}
      />
      <Tabs
        activeTab={activeTab}
        // listIp={listIp}
        setActiveTab={setActiveTab}
        ipInfo={ipInfo}
        setIpInfo={setIpInfo}
        ipSelected={ipSelected}
        setIpSelected={setIpSelected}
      />

    </div>
  )
}
  