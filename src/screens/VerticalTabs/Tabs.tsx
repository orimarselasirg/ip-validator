import {
  Nav,
  NavItem,
  TabContent,
  TabPane,
  NavLink,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './tabs.css'
import { DatamainTab } from '../../components/Tabs/DatamainTab/DatamainTab';
import { IpTab } from '../../components/Tabs/IpListTab/IpTab';
import { IpFavouritesTab } from '../../components/Tabs/FavouriteListIpTab/IpFavouritesTab';
import { IpBanTab } from '../../components/Tabs/BannedListIpTab/IpBanTab';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setIpInfo:(data: any) => void;
  ipInfo: any
  ipSelected: string
  setIpSelected: (ip:string) => void;
}

export const Tabs = ({activeTab, setActiveTab, ipInfo, setIpInfo, ipSelected, setIpSelected }: Props) => {

  const toogle = (tab: string) => {
    switch(tab) {
      case '1':
        setActiveTab(tab)
      break;
      case '2':
        setActiveTab(tab)
      break;
      case '3':
        setActiveTab(tab)
      break;
      case '4':
        setActiveTab(tab)
      break;
    }  
  }

  return (
    <div className='tabs-container'>
      <Nav tabs>
        <NavItem>
          <NavLink 
            href="#" 
            active={activeTab === '1' ? true : false}
            className='tab-item'
            style={activeTab === '1' ? {backgroundColor:'#f1f1f1'}: {backgroundColor:'#E2E2E2'}}
            onClick={()=>toogle('1')}
          >
            Información Ip
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink 
            href="#" 
            active={activeTab === '2' ? true : false}
            className='tab-item'
            style={activeTab === '2' ? {backgroundColor:'#f1f1f1'}: {backgroundColor:'#E2E2E2'}}
            onClick={()=>toogle('2')}
          >
            Lista Ip guardadas
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#" 
            active={activeTab === '3' ? true : false}
            className='tab-item'
            style={activeTab === '3' ? {backgroundColor:'#f1f1f1'}: {backgroundColor:'#E2E2E2'}}
            onClick={()=>toogle('3')}
          >
            Lista Ip favoritas
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#" 
            active={activeTab === '4' ? true : false}
            className='tab-item'
            style={activeTab === '4' ? {backgroundColor:'#f1f1f1'}: {backgroundColor:'#E2E2E2'}}
            onClick={()=>toogle('4')}
          >
            List Ip Bloqueadas
          </NavLink>
        </NavItem>
      </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1" style={{position: 'relative'}}>
            <DatamainTab
              ipInfo={ipInfo}
              setIpInfo={setIpInfo}
              setIpSelected={setIpSelected}
            />
          </TabPane >
          <TabPane tabId="2">
            <IpTab
              ipSelected={ipSelected}
              setIpSelected={setIpSelected}
            />
          </TabPane >
          <TabPane tabId="3">
            <IpFavouritesTab
              ipSelected={ipSelected}
              setIpSelected={setIpSelected}
            />
          </TabPane >
          <TabPane tabId="4">
            <IpBanTab
              ipSelected={ipSelected}
              setIpSelected={setIpSelected}
            />
          </TabPane >
        </TabContent>
    </div>
  )
}
