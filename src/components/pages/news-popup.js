import React, { useContext, useState } from 'react'
import parseHtml from 'html-react-parser'
import ShareMe from '../tool/share';
import WPContext from '../../context/WPContext';
import moment from 'moment'


const NewsPopup = ()=> {

  const {
    isSharePopupActive,
    setSharePopupActive,
    isNewsPopupOpen,
    setNewsPopupOpen,
    newsPopupData
} = useContext(WPContext)

    const [isGoBack, setIsGoBack] = useState(false)

    const popupGoBack = ()=> {
        setIsGoBack(true)
        setTimeout(()=>{
            setNewsPopupOpen(false)
            setIsGoBack(false)
        },700)
    }

  return (
    <>
    {
        newsPopupData &&  isNewsPopupOpen &&
        <>
        <section id='post-popup' className={ isGoBack ? `post-popup passive ${newsPopupData.slug}` : `post-popup active ${newsPopupData.slug}`}>
            <div className='inside'>
            
                <div className='post-header'>
                    <button type='button' className='go-back' onClick={()=> popupGoBack()}><i className='heady icon-left-big'></i></button>
                    <h1 className='post-title'>{parseHtml(newsPopupData.title.rendered)}</h1>
                    <div className='share-action' onClick={()=>setSharePopupActive(!isSharePopupActive)}> Share: <i className='heady icon-paper-plane' title='Share this article'></i></div>
                    <p className='post-date'><time>{moment(newsPopupData.date).format('DD MMMM, YYYY')}</time></p>
                </div>
                
                <picture className='post-image'><img src={newsPopupData.fimg_url} alt={newsPopupData.title.rendered} /></picture> 
                
                { // news detail text parser
                parseHtml(newsPopupData.content.rendered)
                }

                
                
            </div>
        </section>
        <ShareMe title={parseHtml(newsPopupData.title.rendered)} url={process.env.REACT_APP_WP_PRODUCTION_URI+newsPopupData.slug} />
        </>
    }
    </>
    
  )
}
export default NewsPopup