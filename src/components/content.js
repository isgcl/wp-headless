import React, { Component } from 'react'
import ErrorPage from './error-page'
import NewsPageContent from './pages/news'
import NewsDetailPageContent from './pages/news-detail'
import PageDetail from './pages/page-detail'
import Homepage from './pages/home'


class Content extends Component {
  render() {
    const {page} = this.props
    return (
        <div className='the-content'>
            { page === "home" && <Homepage /> } 
            { page === "page-detail" && <PageDetail /> } 
            { page === "news" && <NewsPageContent /> } 
            { page === "news-detail" && <NewsDetailPageContent /> } 
            { page === "error" && <ErrorPage /> } 
        </div>
    )
  }
} 
export default Content