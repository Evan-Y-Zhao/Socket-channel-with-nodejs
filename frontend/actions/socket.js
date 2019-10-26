import { socketUrl } from 'Utils/urlUtil'
import { loadIdToken } from 'Utils/jwtUtil'

export const SOCKET_CONNECT = "SOCKET_CONNECT"
export const SOCKET_DISCONNECT = "SOCKET_DISCONNECT"
export const SOCKET_DETER = "SOCKET_DETER"
export const SOCKET_ON = "SOCKET_ON"
export const SOCKET_EMIT = "SCOKET_EMIT"

// Connect socket with the specified namespace
export function connectSocket(namespace) {
    return { type: SOCKET_CONNECT, payload: { url: socketUrl, namespace: namespace || '', options: {
        reconnectionAttempts: 3,
        transportOptions: {
          polling: {
            extraHeaders: {
              'Authorization': 'Bearer ' + loadIdToken()
            }
          }
        }
      }}}
}

// Disconnect socket to stop the message receving.
export function disConnectSocket(namespace) {
    return { type: SOCKET_DISCONNECT, payload: { namespace } }
}

export function onSocket(options) {
    options = options || {};

    options.namespace = options.namespace || '';

    if(!options.channel) throw new Error('The options.channel parameter is a required!');
    if(!options.actionType) throw new Error('The options.actionType parameter is a required!');
    return {
        type: SOCKET_ON, socket: {
            event: 'on',
            channel: options.channel,
            namespace: options.namespace,
            callbackFunc: (obj) => {
                obj.dispatch({type: options.actionType, payload: obj.data})
            }
        }
    }
}

export function emitSocket(options) {
    options = options || {};

    options.namespace = options.namespace || '';
    return {
        type: SOCKET_EMIT, socket: {
            event: 'emit',
            channel: options.channel,
            namespace: options.namespace,
            data: options.data
        }
    }
}
