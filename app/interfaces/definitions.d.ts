export type TToken = 'string'

export interface IParamsAppoinments {
  token: string
  isServer: boolean
  params: {
    size: number
    after: number
  }
}

export interface IAvailabilitiesParams {
  token: string
  isServer: boolean
  date: Date | string
}

export interface IAppointment {
  node: {
    id: string | number
    status: {
      service: string
    }
    scheluded: Date | string
  }
}
export interface IAppoinments {
  edges: IAppointment[]
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    nextCursor: null
    previousCursos: null
  }
}
