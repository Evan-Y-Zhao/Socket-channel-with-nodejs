import { FROMAPI } from '@utils/eventsUtil'
import storage from '@store/storage'
import { EX_TTC_NODE } from '@utils/exchangeUtil'

export default (amqp, events) => {
    amqp.invokeQueue({
        exchange: {
            name: EX_TTC_NODE,
            routings: [
                '*.*.dashboard'
            ]
        }
    }, msg => {
        console.log(msg.content.toString())
        storage.write(FROMAPI, msg.content.toString())
        events.emit(`${FROMAPI}`, msg.content.toString())
    })
}
