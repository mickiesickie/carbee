import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'cookies'

import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  Paper
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCookies } from 'react-cookie'

import style from './login.module.css'

const LoginComponent = ({ hasCookie }) => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [cookie, setCookie] = useCookies(['token'])
  const router = useRouter()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let success = false
    await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(user)
    })
      .then(res => {
        setIsOpen(true)
        if (res?.ok) {
          setIsError(false)
          setMessage('Login success')
          return res.json()
        } else {
          setIsError(true)
          setMessage(res.statusText)
        }
      })
      .then(responseJson => {
        setCookie('token', JSON.stringify(responseJson.token), {
          path: '/',
          maxAge: 36000,
          sameSite: true
        })
        success = true
      })
      .catch(error => console.log('error:::', error))
      .finally(() => {
        if (success) {
          router.push('/dashboard')
        }
      })
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setIsOpen(false)
  }
  useEffect(() => {
    if (hasCookie) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <>
      <Container maxWidth="sm" className={style.paperLogin}>
        <Paper elevation={1} className={style.loginWrapper}>
          <Typography variant="h2" align="center">
            Carbee
          </Typography>
          <form onSubmit={onSubmit}>
            <TextField
              id="username"
              margin="normal"
              label="Username"
              name="username"
              fullWidth
              placeholder="Username"
              //type="email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              value={user.username}
            />
            <TextField
              id="password"
              margin="normal"
              label="Password"
              fullWidth
              type="Password"
              name="password"
              placeholder="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
              value={user.password}
            />
            <Button type="submit" variant="outlined" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={isOpen}
          autoHideDuration={500}
          onClick={handleClose}
          sx={{ width: '100%' }}
        >
          <Alert severity={isError ? 'error' : 'success'}>
            {message}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Alert>
        </Snackbar>
      </Container>
    </>
  )
}

LoginComponent.getInitialProps = ({ req, res }) => {
  const isServer = !!req
  const cookies = new Cookies(req, res)
  let hasCookie = false
  if (isServer && cookies.get('token')) {
    hasCookie = true
  }

  return { hasCookie }
}
export default LoginComponent
