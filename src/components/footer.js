import React, { Component } from 'react'

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className='pg'>
          <p>We care <strong>#purecode #quality #pixelperfect #standards</strong></p>
          <p>Copyright &copy; 2023 <br /><a href='https://sipa.web.tr'> <i className='heady icon-sipa'></i> SIPA Agency</a></p>
        </div>
      </footer>
    )
  }
}

export default React.memo(Footer)