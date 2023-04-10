import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer><div className='pg'> Copyright &copy; 2023 | <a href='https://sipa.web.tr'>SIPA Agency</a></div></footer>
    )
  }
}

export default React.memo(Footer)