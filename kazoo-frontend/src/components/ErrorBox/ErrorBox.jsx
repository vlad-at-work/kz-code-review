import React from 'react'

import './ErrorBox.css'

const ErrorBox = (props) => {
  return (
    <div className="notification is-danger is-light">
      {/* <button class="delete"></button> */}
      {props.errorText}
    </div>
  )
}

export default ErrorBox