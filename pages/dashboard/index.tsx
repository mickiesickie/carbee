import { useEffect, useState, ChangeEvent } from 'react'
import {
  Container,
  CssBaseline,
  MenuItem,
  Paper,
  TextField
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { GetServerSideProps } from 'next'
import Cookies from 'cookies'
import { ThemeProvider } from '@emotion/react'
import getAppoinments from '@/services/getAppointments'
import getAvailabilities from '@/services/getAvailabilities'
import Header from '@/components/Header/Header'
import styles from './dashboard.module.css'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme from '@/config/theme'
import dayjs from 'dayjs'
import Appointments from '@/components/Appointments/Appointments'
import {
  TToken,
  IParamsAppoinments,
  IAvailabilitiesParams
} from '@/app/interfaces/definitions'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = new Cookies(req, res)
  const token: TToken = cookies.get('token')
  const decodedToken = decodeURIComponent(token).replaceAll('"', '')

  const params: IParamsAppoinments = {
    token: decodedToken,
    isServer: true,
    params: {
      size: 30,
      after: 1
    }
  }

  const result = await getAppoinments(params)
  const currentDate: Date = new Date()
  currentDate.setDate(currentDate.getDate() + 2)
  const paramsAvailiabilities: IAvailabilitiesParams = {
    token: decodedToken,
    isServer: true,
    date: dayjs(currentDate).format('YYYY-MM-DD')
  }
  const availabilities = await getAvailabilities(paramsAvailiabilities)

  return {
    props: {
      decodedToken,
      availabilities,
      appointmentsServerSide: result,
      date: dayjs(currentDate).format('YYYY-MM-DD')
    }
  }
}
const DashBoard = ({
  decodedToken,
  availabilities,
  appointmentsServerSide,
  date
}: {
  decodedToken: string
  availabilities: string[]
  appointmentsServerSide: object
  date: string
}) => {
  const [appointments] = useState(appointmentsServerSide)
  // LIST OF HOURS

  const [availabilitiesClient, setAvailabilitiesClient] =
    useState(availabilities)
  const [selectedAvailability, setSelectedAvailability] = useState()
  const [selectedDay, setSelectedDay] = useState(date)

  const getAvailabilitiesClient = async () => {
    const availabilities = await getAvailabilities({
      token: decodedToken,
      isServer: false,
      date: selectedDay
    })
    return availabilities
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedAvailability(e.target.value)
  }

  useEffect(() => {
    getAvailabilitiesClient()
      .then(response => setAvailabilitiesClient(response))
      .catch(error => {
        console.error('Error', error)
      })
  }, [selectedDay])

  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Header />
          <Container className={styles.mainContent}>
            <Paper elevation={3} className={styles.paper}>
              <DatePicker
                label="Select Date"
                //disablePast={true}
                format="YYYY-MM-DD"
                //minDate={dayjs(date)}
                value={dayjs(selectedDay)}
                onChange={e => setSelectedDay(dayjs(e).format('YYYY-MM-DD'))}
              />
              <TextField
                select
                sx={{ minWidth: 200 }}
                label="Availabilities"
                value={selectedAvailability ?? ''}
                onChange={e => handleChange(e)}
                className={styles.textField}
              >
                {availabilitiesClient.length > 0 &&
                  availabilitiesClient.map((availabity, index) => (
                    <MenuItem key={index} value={availabity}>
                      {dayjs(availabity).format('HH:mm a')}
                    </MenuItem>
                  ))}
              </TextField>
            </Paper>
            <Appointments token={decodedToken} appointments={appointments} />
          </Container>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}

export default DashBoard
