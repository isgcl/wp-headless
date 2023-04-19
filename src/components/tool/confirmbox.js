import React from 'react'
import parseHtml from 'html-react-parser'

const Confirmbox = ({cancelFn,confirmFn,title,message,icon,cancelButtonText,confirmButtonText})=> {
  
  title = title || 'Are you sure?'
  message = message || 'Please confirm to action.'
  icon = icon || 'attention'
  cancelButtonText = cancelButtonText || 'Cancel'
  confirmButtonText = confirmButtonText || 'Confirm'

  return (
    <div className='sipa-popup confirm-popup'>
        <div className='in-box confirm-box'>
            <h3><i className={`heady icon-${icon}`}></i> {parseHtml(title)}</h3>
            <p>{parseHtml(message)}</p>
            <p className='actions'><button type='button' className='go-cancel' onClick={()=> cancelFn(false)}>{cancelButtonText}</button> <button className='go-confirm' type='button' onClick={()=>confirmFn()}>{confirmButtonText}</button></p>
        </div>
    </div>
  )
}
export default Confirmbox
