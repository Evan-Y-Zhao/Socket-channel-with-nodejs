import io from 'socket.io-client'
import {
    SOCKET_CONNECT,
    SOCKET_DETER,
    SOCKET_DISCONNECT
} from 'Actions/socket'
import {
    initial
} from 'Actions/auth'

const socketMiddleware = (initialSockets = {}) => {
    let sockets = initialSockets
    return ({ dispatch, getState }) => next => action => {

        if (action.type === SOCKET_CONNECT) {

            if (!action.payload) {
                throw new Error('There is no payload in the action')
            } else {
                const payload = action.payload
                payload.namespace = payload.namespace || ''
                let socket = sockets[payload.namespace] || null
                // Declare socket connection only once.
                if (socket) {
                    socket.close()
                    socket = null
                }
                let conn = payload.url
                if (payload.namespace) {
                    conn += payload.namespace
                }

                if (payload.options) {
                    socket = io(conn, payload.options)
                } else {
                    socket = io(conn)
                }
                socket.on('connect_error', () => {
                    next(initial())
                })
                socket.on('connect_timeout', () => {
                    next(initial())
                })
                sockets[payload.namespace] = socket
                return next({ type: action.type, payload: { [payload.namespace]: { status: 'connected' } } })
            }
        } else if (action.type === SOCKET_DISCONNECT) {
            if (!action.payload) {
                throw new Error('There is no payload in the action')
            } else {
                const payload = action.payload
                payload.namespace = payload.namespace || ''
                let socket = sockets[payload.namespace] || null
                // Declare socket connection only once.
                if (socket) {
                    socket.close()
                    socket = null
                }
                sockets[payload.namespace] = socket
                return next({ type: action.type, payload: { [payload.namespace]: { status: 'disconnected' } } })
            }
        } else if (action.socket && action.socket.event) {
            const payload = action.socket
            payload.namespace = payload.namespace || ''
            let state = getState()
            if (!sockets[payload.namespace] && !state.socket[payload.namespace]) {
                return next(action)
            }
            if (state.socket[payload.namespace] && state.socket[payload.namespace].status !== 'connected') {
                return next(action)
            }
            let socket = sockets[payload.namespace]
            if (action.socket.event === 'on') {
                socket.on(action.socket.channel, data => {
                    action.socket.callbackFunc({ data, socket, dispatch, state })
                })
            }
            if (action.socket.event === 'off') {
                socket.off(action.socket.channel)
            }
            if (action.socket.event === 'emit') {
                socket.emit(action.socket.channel, action.socket.data)
            }

            return next({ type: action.type || SOCKET_DETER })
        }
        return next(action)
    }
}

export default socketMiddleware
