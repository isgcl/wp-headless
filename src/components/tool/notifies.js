import React, { useContext } from 'react'
import WPContext from '../../context/WPContext'

 const Notifies = ()=> {

    const { 
        notifies,
        closeNotify
    } = useContext(WPContext)

  return (
    <>
        { 
            notifies.length > 0 &&
                <div className='notifies'>
                {
                    notifies.map(
                        (notify,id)=> notify.status === 1 && 
                        <div key={id} id={'notify-'+notify.id} className={`notify ${notify.cssclass}`} onClick={()=>closeNotify(notify.id)}>
                            {
                                notify.cssclass === 'red' && <i className='heady icon-attention'></i>
                            }
                            {
                                notify.cssclass === 'green' && <i className='heady icon-thumbs-up'></i>
                            }
                            {
                                (notify.cssclass === undefined || notify.cssclass === null || notify.cssclass === '') && <i className='heady icon-info-circled'></i>
                            }
                            {notify.notify}
                        </div>
                        )
                }
            </div>
        }
    </>
  )
}
export default Notifies