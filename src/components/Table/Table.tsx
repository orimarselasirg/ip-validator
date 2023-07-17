import './table.css'
import { Notificacion } from '../Notifications/Notificacion';
import { Loading } from '../Loading/Loading';
import { usePaginator } from '../../hooks/usePaginator';
import { useTableData } from '../../hooks/useTableData';
import { IpList } from '../../interfaces/componentsInterfaces';



type Columns = {
  title: string
}

interface Props {
  columns: Columns[]
  bodyTable: IpList[]
  openModal: boolean
  openModalChange: (value: string, ip: string) => void
  status: string
  ipSelected: string
  statusTextButton: string
  deleteTextButton: string
  modalFavTextButton: string
  modalBanTextButton: string
  modalListTextButton: string
  confirmDeleteTextModal: string
}

export const Table = ({columns, bodyTable, openModal= false, openModalChange, statusTextButton, deleteTextButton, modalFavTextButton, modalBanTextButton, modalListTextButton, confirmDeleteTextModal, status, ipSelected}: Props) => {
  const {goToPreviousPage, goToNextPage, displayedItems, currentPage, itemsPerPage} = usePaginator(bodyTable)
  const {changeStatusIpList,deleteIpOnList,isLoading,message,openNotificacion, setOpenNotificacion} = useTableData({openModalChange})

  return (
    <div className='iptab-container'>
      {isLoading && <Loading/>}
      <table className='table-container'>
          <tr className='headeriplist-container'>
            {
            columns.map((column) => (
              <th className='headertitle'>{column.title}</th>
              ))
            }
          </tr>

          {displayedItems && displayedItems.map((e: any)=> (
            <tr className='row-container'>
            <td>{e.id}</td>
            <td>{e.country}</td>
            <td>{e.isoCode}</td>
            <td>{e.currency}</td>
            <td>{e.ip}</td>
            <td>
              <img src={e.flag} alt={e.country} width={50} height={30} />
            </td>
            <td>{e.status}</td>
            <td>
              <button onClick={()=>openModalChange(e.status, e.ip)} className='status-button'>
                {statusTextButton}
              </button>
            </td>
            <td>
              <button onClick={()=>openModalChange('Eliminar', e.ip)} className='status-button button-delete'>
                {deleteTextButton}
              </button>
            </td>
          </tr>
          ))}
      </table>
      {
        openNotificacion && (
          <Notificacion
            message={message?.message}
            title={message?.title}
            onClose={setOpenNotificacion}
          />
        )
      }
        {
          openModal && (
            <div className='modal-container'>
              <span className='modal-close-button' onClick={()=>openModalChange('eliminar', '')}>X</span>
              {status !== 'Eliminar' ? (
                <h3 className='modal-title'>
                  Favor seleccione que estado desea asignarle a esta IP
                </h3>)
                :
                (
                <h3 className='modal-title'>{confirmDeleteTextModal}</h3>
                )
              }
              <div className='button-group-container'>
                {status === 'En lista' && 
                <>
                  <button className='modal-buttons fav-button' onClick={()=>changeStatusIpList(ipSelected, 'favourite')}>{modalFavTextButton}</button>
                  <button className='modal-buttons ban-button' onClick={()=>changeStatusIpList(ipSelected, 'ban')}>{modalBanTextButton}</button>
                </>
                }
                {
                status === 'Bloqueada' &&
                <>
                  <button className='modal-buttons fav-button' onClick={()=>changeStatusIpList(ipSelected, 'favourite')}>{modalFavTextButton}</button>
                  <button className='modal-buttons' onClick={()=>changeStatusIpList(ipSelected, 'on list')}>{modalListTextButton}</button>
                </>
                }
                {
                status === 'Favorita' &&
                <>
                  <button className='modal-buttons ban-button' onClick={()=>changeStatusIpList(ipSelected, 'ban')}>{modalBanTextButton}</button>
                  <button className='modal-buttons' onClick={()=>changeStatusIpList(ipSelected, 'on list')}>{modalListTextButton}</button>
                </>
                }
                {
                status === 'Eliminar' && 
                <>
                  
                  <button className='modal-buttons ban-button' style={{fontSize: '20px'}} onClick={()=>deleteIpOnList(ipSelected)}>Si</button>
                  <button className='modal-buttons' style={{fontSize: '20px'}}onClick={()=>openModalChange('eliminar', '')}>No</button>
                </>
                }
              </div>
            </div>
          )
        }
        <div className='pagination-container'>
          <button className='pagination-button' disabled={currentPage === 1} onClick={()=>goToPreviousPage()}>prev</button>
          <button className='pagination-button' disabled={currentPage === Math.ceil(bodyTable.length / itemsPerPage)} onClick={()=>goToNextPage()}>next</button>
        </div>
    </div>
  )
}
