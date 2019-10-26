import { get } from 'Utils/apiUtil';

export const EXAMPLE_SOCKET_ON = "EXAMPLE_SOCKET_ON"
export const EXAMPLE_SOCKET_EMIT = "EXAMPLE_SOCKET_EMIT"
export const EXAMPLE_SOCKET_OFF = "EXAMPLE_SOCKET_OFF"
export const EXAMPLE_SOCKET_ON_NAMESPACE = "EXAMPLE_SOCKET_ON_NAMESPACE"
export const EXAMPLE_SOCKET_EMIT_NAMESPACE = "EXAMPLE_SOCKET_EMIT_NAMESPACE"
export const EXAMPLE_SOCKET_OFF_NAMESPACE = "EXAMPLE_SOCKET_OFF_NAMESPACE"
export const BFF_TEST = "BFF_TEST"
export const GET_AIR_QUALITY = "GET_AIR_QUALITY"


// Register the listener to the default connected socket '/'
export function onSocketExample() {
    
    return {}
}

// Emit the data to backend via the socket channel.
export function emitSocketExample() {
    return {
        type: EXAMPLE_SOCKET_EMIT, socket: {
            event: 'emit',
            channel: 'login success',
            data: 'hahah'
        }
    }
}

// Remove the listener from the connected socket
export function removeSocketExample() {
    return {
        type: EXAMPLE_SOCKET_OFF, socket: {
            event: 'off',
            channel: 'FromAPI',
        }
    }
}


export function onSocketExampleNamespace(namespace) {
    return {
        type: EXAMPLE_SOCKET_ON_NAMESPACE, socket: {
            event: 'on',
            channel: 'FromAPINamespace',                  
            namespace: namespace || '',
            callbackFunc: (obj) => {
                obj.dispatch({type: GET_AIR_QUALITY, payload: obj.data})
            }
        }
    }
}

export function emitSocketExampleNamespace(namespace) {
    return {
        type: EXAMPLE_SOCKET_EMIT_NAMESPACE, socket: {
            event: 'emit',
            channel: 'dashboard',
            namespace: namespace || '',
            data: 'hahah'
        }
    }
}

export function removeSocketExampleNamespace(namespace) {
    return {
        type: EXAMPLE_SOCKET_OFF_NAMESPACE, socket: {
            event: 'off',
            channel: 'FromAPINamespace',
            namespace: namespace || '',
        }
    }
}

export function onStationData() {
    return {
        type: EXAMPLE_SOCKET_ON, socket: {
            event: 'on',
            channel: 'StationData',
            callbackFunc: (obj) => {
                obj.dispatch({type: GET_AIR_QUALITY, payload: obj.data})
            }
        }
    }
}

export function bffTest() {
    return dispatch => {
        get('http://localhost:10000/api/bff/user').then(res => {
            dispatch({
                type: BFF_TEST
            })

        }).catch(err => {
            console.log(err)
        })
    }
}
