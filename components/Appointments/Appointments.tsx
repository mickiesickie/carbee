import { Paper, Grid } from '@mui/material'
import styles from './appointments.module.css'
import CardAppointment from '../Card/Card'
import { useState, useEffect } from 'react'
import getAppoinments from '@/services/getAppointments'

const Appointments = ({
  appointments,
  token
}: {
  appointments: object
  token: string
}) => {
  const [theAppointments, setTheAppointments] = useState(appointments)
  const getMoreDataScrolling = async () => {
    const params = {
      token,
      isServer: false,
      params: {
        size: 30,
        after: theAppointments.pageInfo.nextCursor
      }
    }
    try {
      const result = await getAppoinments(params)
      setTheAppointments(prevState => {
        return {
          edges: [...prevState.edges, ...result.edges],
          pageInfo: result.pageInfo
        }
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return
    } else {
      console.log('moreData')
      getMoreDataScrolling()
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Paper elevation={3} className={styles.paper}>
      <Grid container spacing={2}>
        {theAppointments.edges.length > 0 &&
          theAppointments.edges.map(appointment => (
            <CardAppointment
              key={appointment.node.id}
              status={appointment.node.status}
              workOrder={appointment.node.workOrder}
              scheluded={appointment.node.scheduledTime}
            />
          ))}
      </Grid>
    </Paper>
  )
}

export default Appointments
