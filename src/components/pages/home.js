import React, {useContext, useEffect} from 'react'
// import NewsPageContent from './news'
import CategoriesPageContent from './categories'
import HomePromoSlide from '../slicks/HomePromoSlide'
import WPContext from '../../context/WPContext'

export default function Homepage() {

  const {setIsStartPointHome} = useContext(WPContext)

  useEffect(()=>{
    setIsStartPointHome(true)
    // eslint-disable-next-line
  },[])
  
  return (
    <>
        <HomePromoSlide category={'home-promo-slide'} />
        {/* <CategoriesPageContent display={'thumbnail'} /> */}
        <CategoriesPageContent display={'postin'} postcount={6} /> {/* other display types: title, excerpt, thumbnail, postin : if postin use set 'postcount={n}' max content */ }
        {/* <NewsPageContent /> */}
    </>
  )
}
