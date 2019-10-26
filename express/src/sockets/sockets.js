import dashboard from './dashboard'
import dashboardBroadcast from './broadcast/dashboard'
import geographicMap from './geographicMap'
import geographicMapBroadcast from './broadcast/geographicMap'

const sockets = [
    { namespace: '', sockets: [] },
    { namespace: 'dashboard', sockets: [dashboard], broadcasts: [dashboardBroadcast] },
    { namespace: 'geographicMap', sockets: [geographicMap], broadcasts: [geographicMapBroadcast] }
]
export default sockets
