export const API_GATEWAY = process.env.API_GATEWAY
export const AMQP_URL = process.env.NODE_ENV !== 'production' ? process.env.AMQP_URL_DEV : process.env.AMQP_URL_PROD
export const SIDECAR_SERVER_URL = process.env.SIDECAR_SERVER

export const AUTH_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-auth-server'
export const AIR_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-air-server'
export const SYSTEM_CONFIG_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const INSTRUMENT_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const FACTOR_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const COMPANY_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const DICTIONARY_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const STATION_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const PROTOCOL_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const REPORT_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const ALARM_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-systemconfig-server'
export const Notification_SERVER = process.env.NODE_ENV !== 'production' ? 'http://localhost:8080' : SIDECAR_SERVER_URL + '/sc-alert-server'
