import EventEmitter from 'events';

import { get, put, post, del, responseJSON } from '@utils/apiUtil';
import { AIR_SERVER } from '@utils/urlUtil';
import storage from '@store/storage';
import {
    AIR_STATION_DATA,
    AIR_STATION_DELETE,
    AIR_INSTRUMENT_DATA,
    AIR_PARK_INFOMATION,
    AIR_ONE_WEEK_LINECHART
} from '@utils/eventsUtil'

export default (socket, events) => {
    console.log('user connect');

    // User connected emit data
    {
        let airStationData = storage.read(AIR_STATION_DATA) || {};
        let parkAirInfo = storage.read(AIR_PARK_INFOMATION) || {};
        let AQILineChart = storage.read(AIR_ONE_WEEK_LINECHART) || {};

        socket.emit(AIR_PARK_INFOMATION, parkAirInfo);
        socket.emit(AIR_ONE_WEEK_LINECHART, AQILineChart);


        if(airStationData.airStationList && Object.keys(airStationData.airStationList).length) {
            socket.emit(AIR_STATION_DATA, airStationData);
        }
        else {
            // let now = new Date();
            // let makeUpZero = (num, length) => {
            //     length = length || 2;
            //
            //     if(length === 2)
            //         return num < 10 ? '0' + num : '' + num;
            //     if(length === 3) {
            //         if(num < 10)
            //             return '00' + num;
            //         if(num < 100)
            //             return '0' + num;
            //         if(num < 1000)
            //             return '' + num;
            //     }
            // }
            // let time = `${ now.getFullYear() }${ makeUpZero(now.getMonth()+1) }${ makeUpZero(now.getDate()) }${ makeUpZero(now.getHours()) }${ makeUpZero(now.getMinutes()) }${ makeUpZero(now.getSeconds()) }`
            // get(AIR_SERVER + '/report/history?time='+time, socket.handshake.query.token).then(res => {
            //     socket.emit('AirStationData', res.data);
            // });
        }
    }

    // Get air station site id and emit instrument data.
    socket.on('AIR_STATION_ID', data => {
        let airStationData = storage.read(AIR_STATION_DATA) || {};
        var instrumentData = storage.read(AIR_INSTRUMENT_DATA) || {};
        if(airStationData && airStationData.airStationList && airStationData.airStationList[data]) {
            socket.emit(AIR_INSTRUMENT_DATA, instrumentData[data]);
        }
    });
}
