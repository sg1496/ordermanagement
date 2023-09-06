import React, { Component } from 'react'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center mt-5 mb-5 '  >
        <div className="spinner-border text-primary  "   role="status">
          <span  className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }
}

export default Spinner;



