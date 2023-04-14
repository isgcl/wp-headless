import React, {useContext} from 'react'
import NewsPageContent from './news'
import HomePromoSlide from '../slicks/HomePromoSlide'
import WPContext from '../../context/WPContext'

export default function Homepage() {

  const {setIsStartPointHome} = useContext(WPContext)
  
  setIsStartPointHome(true)

  return (
    <>
        <HomePromoSlide category={'home-promo-slide'} />
        <NewsPageContent />
    </>
  )
}
