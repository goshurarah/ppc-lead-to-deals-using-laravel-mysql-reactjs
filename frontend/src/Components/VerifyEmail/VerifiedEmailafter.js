import React from 'react'
import { Link } from 'react-router-dom'

function VerifiedEmailafter() {
  return (
    <div>
      <p>email has been verified</p>
      <Link to="/signin">
      <buttion>back to login</buttion>
      </Link>
    </div>
  )
}

export default VerifiedEmailafter
