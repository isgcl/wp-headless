import React, { useContext, useEffect, useState } from 'react'
import parseHtml from 'html-react-parser'
import ShareMe from '../tool/share';
import WPContext from '../../context/WPContext';
import moment from 'moment'
import Comments from './comments';


const NewsPopup = ()=> {


  const {
    isSharePopupActive,
    setSharePopupActive,
    isNewsPopupOpen,
    setNewsPopupOpen,
    newsPopupData
} = useContext(WPContext)

    const [isGoBack, setIsGoBack] = useState(false)
    const [isCommentsOpen,setIsCommentsOpen] = useState(false)

    const popupGoBack = ()=> {
        setIsGoBack(true)
        setTimeout(()=>{
            setNewsPopupOpen(false)
            setIsGoBack(false)
        },700)
    }

    useEffect(()=>{
        if (isNewsPopupOpen) document.querySelector('#post-popup-inside').scrollTop = 0
        setIsCommentsOpen(false)
        // eslint-disable-next-line
    },[newsPopupData])
    

  return (
    <>
    {
        newsPopupData &&  isNewsPopupOpen &&
        <>
        <section id='post-popup' className={ isGoBack ? `post-popup passive ${newsPopupData.slug}` : `post-popup active ${newsPopupData.slug}`}>
            <div className='inside' id='post-popup-inside'>
                <div className='post-header'>
                    <button type='button' className='go-back' onClick={()=> popupGoBack()}><i className='heady icon-left-big'></i></button>
                    <h1 className='post-title'>{parseHtml(newsPopupData.title.rendered)} <button title='Open comments' type='button' className='go-comment' onClick={()=> setIsCommentsOpen(true)}><i className='heady icon-comment-empty'></i> <em>{newsPopupData.comment_count}</em> </button></h1>
                    <div className='share-action' onClick={()=>setSharePopupActive(!isSharePopupActive)}> Share: <i className='heady icon-paper-plane' title='Share this article'></i></div>
                    <p className='post-date'><time>{moment(newsPopupData.date).format('DD MMMM YYYY, HH:MM')}</time></p>
                </div>
                
                <picture className='post-image' id='post-popup-img'><img src={newsPopupData.fimg_url} alt={newsPopupData.title.rendered} /></picture> 
                
                { // news detail text parser
                parseHtml(newsPopupData.content.rendered)
                }
                {
                isCommentsOpen && <Comments id={newsPopupData.id} count={newsPopupData.comment_count} inpopup={true} />
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