import React, { useState, useContext, useEffect } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WPContext from '../../context/WPContext';
  

const ShareMe = ({url,title,type})=> {

    const {isSharePopupActive,setSharePopupActive,isMobile,popupZindex,setPopupZindex} = useContext(WPContext)

    const [copied,setCopied] = useState(false)

    let permaClass = 'sipa-popup share-me'
    if (type !== undefined) permaClass = 'share-me'

    const setStatusVisibilities = ()=>{
        setSharePopupActive(false)
        setCopied(false)
    }

    useEffect(()=>{
        setPopupZindex((prev)=>prev+1)
        // console.log('popupZindex',popupZindex)
        // eslint-disable-next-line
    },[])


    return (
        <>
        <div className={isSharePopupActive ? permaClass+' active' : permaClass+' passive'} style={{zIndex:popupZindex}}>
            <div className='in-box'>
                <h2><i className='heady icon-child'></i> Share</h2>
                <p className='share-links'>
                    <a href={'https://www.linkedin.com/sharing/share-offsite/?url='+url+'&title='+title} target='_blank' rel="noopener noreferrer"><i className='heady icon-linkedin'></i></a>
                    <a href={'https://www.facebook.com/sharer.php?u='+url+'&t='+title} target='_blank' rel="noopener noreferrer"><i className='heady icon-facebook'></i></a>
                    <a href={'https://twitter.com/intent/tweet?text='+title+' '+url} target='_blank' rel="noopener noreferrer"><i className='heady icon-twitter'></i></a>
                    {
                        isMobile ? <a href={'whatsapp://send?text='+title+' '+url} target='_blank' rel="noopener noreferrer"><i className='heady icon-whatsapp'></i></a> : <a href={'https://web.whatsapp.com/send?text='+title+' '+url} target='_blank' rel="noopener noreferrer"><i className='heady icon-whatsapp'></i></a> 
                    }
                    <a href={'mailto:?subject='+title+'&body=You must see this: '+title+' '+url}><i className='heady icon-envelope-open-o'></i></a>
                    <CopyToClipboard text={title+' '+url} onCopy={() => setCopied(true)}>
                        <i className="heady icon-link" title='Copy to clipboard'>Copy</i>
                    </CopyToClipboard>
                    {copied && <span className='copied' onClick={()=>setCopied(false)}>Copied</span>}
                </p>
                <p><strong>{title}</strong> <br /> {url}</p>
                <button className='closeme' type='button' onClick={()=>setStatusVisibilities()}><i className='heady icon-cancel'></i></button>
            </div>
        </div>
        </>
        )
}

export default  ShareMe
