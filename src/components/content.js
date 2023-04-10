import React, { Component } from 'react'
import ErrorPage from './error-page'
import NewsPageContent from './pages/news'
import NewsDetailPageContent from './pages/news-detail'


class Content extends Component {
  render() {
    const {page} = this.props
    return (
        <div className='the-content'>
            { page === "news" && <NewsPageContent /> } 
            { page === "news-detail" && <NewsDetailPageContent /> } 
            { page === "error" && <ErrorPage /> } 
        </div>
    )
  }
} 
export default Content