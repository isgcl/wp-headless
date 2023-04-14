import React, { Component } from 'react'
import Sidebar from './sidebar'
import Header from './header'
import Footer from './footer'
import Content from './content'
import NewsPopup from './pages/news-popup'
import { Helmet } from 'react-helmet'
import { WPThemeProvider } from '../context/WPContext'

class MainPage extends Component {
  
  render() {
    const {page} = this.props
    return (
      <>
      <Helmet>
        <title>WordPress Headless React CMS</title>
        <meta name="description" content="This is the first WordPress headless React App" />
      </Helmet>
      <main className='main-site'>
        <WPThemeProvider>
          <Header />
          <Content page={page} />
          <Sidebar />
          <Footer />
          <NewsPopup />
        </WPThemeProvider>
      </main>

      </>
    )
  }
}
export default MainPage