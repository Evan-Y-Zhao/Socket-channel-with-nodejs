import { FROMAPI } from '@utils/eventsUtil'

const dashboard = (io, events) => {
    const subscription = events.on(FROMAPI, data => {
        io.emit(FROMAPI, data);
    })
    return subscription
}

export default dashboard
