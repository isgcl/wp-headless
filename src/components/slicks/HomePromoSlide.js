import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import SlickSingle from './slick-single'
import axios from 'axios'
import Processing from '../processing'

const HomePromoSlide = ({category})=> {

    const [isLoading,setIsLoading] = useState(true)
    const [slideItems,setSlidesItem] = useState([])

    let slickSettings = {
        dots: true,
        infinite: false,
        autoplay:true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    
    let fetchUri = process.env.REACT_APP_WP_HEADLESS_URI+'sipaslides/?category_slug='
    
    useEffect(()=>{
        // console.log('fetchUri',fetchUri+category)
        if (category) axios(fetchUri+category)
        .then(res => {
            // console.log('Slide',res.data)
            setSlidesItem(res.data)
            setIsLoading(false)
        })
        // eslint-disable-next-line
    },[])

    return (
        <>
        {  isLoading ? <Processing message='Slider loading please wait...' /> :
          <Slider className='home-promo-slide' {...slickSettings}>
            {
                //parseHtml(this.props.nodes)
                slideItems.map((slide,ind)=> <SlickSingle key={ind} title={slide.title.rendered} content={slide.content.rendered} href={slide.acf.internal_link.url} externalhref={slide.acf.react_permalink} imguri={slide.fimg_url} /> )
                
            }
         </Slider>
         
        }
        </>
        
    )
}

export default HomePromoSlide