import React from 'react'
import Header from './Header'
import { Container, CssBaseline } from '@mui/material'

const Layout = ({children} : {children:any}) => {
  return (
    <>
    <Header/>
    <CssBaseline />
      <Container maxWidth="xl">{children}</Container>
    </>
  )
}

export default Layout