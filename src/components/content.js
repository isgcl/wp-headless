import React, { Component } from 'react'
import ErrorPage from './error-page'
import CategoryArticlesPageContent from './pages/category-articles'
import CategoriesPageContent from './pages/categories'
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
            { page === "news-detail" &&  <NewsDetailPageContent /> }
            { page === "category-articles" &&  <CategoryArticlesPageContent /> } 
            { page === "categories" && <CategoriesPageContent display={'thumbnail'} /> } 
            { page === "error" && <ErrorPage /> } 
        </div>
    )
  }
} 
export default Content