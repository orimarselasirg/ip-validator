import {useState, useEffect} from 'react'

import './App.css';
import { getAllIp } from './api/get';
import { HomeScreens } from './screens/HomeScreen/HomeScreens';
import { Data } from './interfaces/apiInterface';

function App() {
  const [ipSelected, setIpSelected] = useState<string>('')
  
  useEffect(()=>{
    getInitialData()
  },[]) 

  const getInitialData = async () =>{
  const dataIp = JSON.parse(localStorage.getItem("ipList") as string)
  if(!dataIp) {
    const dataList: Data[] = await  getAllIp()
    const results = dataList?.filter(e => e.isDeleted !== true).map((data: Data) => {
      return {
        id: data.id,
        ip: data.ipData.ipAddress,
        country: data.ipData.countryName,
        isoCode: data.ipData.isoCode,
        currency: data.ipData.currency,
        flag: data.ipData.countryFlag,
        status: data.isBanned ? 'Bloqueada' : data.isFavourited ? 'Favorita' : 'En lista',
        isDeleted: data.isDeleted,
        conversion: data.conversion
      }
    })
      localStorage.setItem('ipList', JSON.stringify(results) );
      setIpSelected('1')
    }
  }
  
  return (
    <div style={{marginInline: '10px', backgroundColor: '#f1f1f1', borderRadius: '10px'}}>
      <HomeScreens
       ipSelected={ipSelected}
       setIpSelected={setIpSelected}
      />
    </div>
  );
}

export default App;
