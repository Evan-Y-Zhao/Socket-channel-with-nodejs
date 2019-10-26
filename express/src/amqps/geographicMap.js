import { EX_TTC_NODE } from '@utils/exchangeUtil'
import {
    AIR_STATION_DATA,
    AIR_STATION_DELETE,
    AIR_INSTRUMENT_DATA,
    AIR_PARK_INFOMATION,
    AIR_ONE_WEEK_LINECHART
} from '@utils/eventsUtil'

export default (amqp, events) => {
    // Exchange connect
    amqp.invokeQueue({
        exchange: {
            name: EX_TTC_NODE,
            routings: ['rk.air.*.*']
        }
    }, msg => {
        let data = JSON.parse(msg.content);

        switch(msg.fields.routingKey) {
            // Add or update station.
            case 'rk.air.site.insert':
            case 'rk.air.site.update':
                events.emit(AIR_STATION_DATA, data);
                break;
            // Remove station.
            case 'rk.air.site.delete':
                events.emit(AIR_STATION_DELETE, data);
                break;
            // Get instrument data.
            case 'rk.air.instrument.update':
                events.emit(AIR_INSTRUMENT_DATA, data);
                break;
            // Get park information
            case 'rk.air.dashboard.rhsummary':
                events.emit(AIR_PARK_INFOMATION, data);
                break;
            // Get one week aqi linechart
            case 'rk.air.dashboard.linechart':
                events.emit(AIR_ONE_WEEK_LINECHART, data);
                break;
        }
    });

    // setInterval(() => {
    //     let stationId = 1 + Math.floor(Math.random() * 3);
    //     let position = {
    //         1: {
    //             lon: 121.60091,
    //             lat: 31.249518
    //         },
    //         2: {
    //             lon: 121.598677,
    //             lat: 31.250629
    //         },
    //         3: {
    //             lon: 121.598151,
    //             lat: 31.249518
    //         }
    //     };
    //     let instrumentData = {};
    //     let now = new Date().getTime();
    //     instrumentData[stationId] = [
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'NO',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'O3',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'PM25',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'CO2',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'wind_direction',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'CO',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'NO2',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'NOx',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'SO2',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'temperature',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'NOy',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'PM10',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'humidity',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         },
    //         {
    //             concentration: Math.floor(Math.random() * 50000) / 100,
    //             factorName: 'air_pressure',
    //             instrumentNum: 'S01410i',
    //             dataTime: now
    //         }
    //     ];
    //
    //     events.emit('AIR_STATION_DATA', {
    //         siteId: stationId,
    //         longitude: position[stationId].lon,
    //         latitude: position[stationId].lat,
    //         aqi: Math.floor(Math.random() * 500),
    //         siteNum: stationId,
    //         siteName: '检测站点' + stationId
    //     });
    //     events.emit('AIR_INSTRUMENT_DATA', instrumentData);
    //
    //     setTimeout(() => {
    //         console.log('time out', stationId);
    //         events.emit('AIR_STATION_DELETE', { id: stationId });
    //     }, 2000);
    // }, 5000);
}
