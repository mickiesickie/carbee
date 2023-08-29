import { Card, CardContent, Grid, Typography } from '@mui/material'
import styles from './card.module.css'
import dayjs from 'dayjs'

const STATUS = {
  SCHEDULED: '#004559',
  PAID: '#fac12f',
  COMPLETE: '#77c697'
}
const CardAppointment = ({ status, workOrder, scheluded }) => {
  const { service } = workOrder
  return (
    <Grid item xs={4}>
      <Card variant="outlined">
        <CardContent>
          <div
            style={{ backgroundColor: STATUS[status] }}
            className={styles.cardHeader}
          >
            <Typography align="right">
              {dayjs(scheluded).format('YYYY-MM-DD hh:mm a')} {status}
            </Typography>
          </div>
          <div className={styles.cardContent}>
            <Typography variant="h6">Services:</Typography>
            <p>{service}</p>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default CardAppointment
