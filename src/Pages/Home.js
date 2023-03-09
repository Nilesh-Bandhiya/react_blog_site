import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from "react-cookies"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if(cookie.load('token')){
      navigate("/")
    }
  },[navigate])
  return (
    <div>Home</div>
  )
}

export default Home