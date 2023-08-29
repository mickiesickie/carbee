import { Container } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import styles from './header.module.css'
const Header = () => {
  return (
    <>
      <AppBar color="primary" className={styles.appBar}>
        <Container>Carbee</Container>
      </AppBar>
    </>
  )
}

export default Header
