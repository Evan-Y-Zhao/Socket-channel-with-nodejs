import storage from '@store/storage';
import {
    AIR_STATION_DATA,
    AIR_STATION_DELETE,
    AIR_INSTRUMENT_DATA,
    AIR_PARK_INFOMATION,
    AIR_ONE_WEEK_LINECHART
} from '@utils/eventsUtil'

const geopraphicMap = (io, events) => {
    let now = null;

    /**
     * Boardcast hourly AQI data.
     */
    events.on(AIR_STATION_DATA, data => {
        let airStationData = storage.read(AIR_STATION_DATA) || {};

        airStationData.time = now;
        airStationData.airStationList = airStationData.airStationList || {};
        airStationData.airStationList[data.siteId] = data;

        storage.write(AIR_STATION_DATA, airStationData);

        io.emit(AIR_STATION_DATA, airStationData);
    });

    /**
     * Cache current time air instrument index data.
     */
    events.on(AIR_INSTRUMENT_DATA, data => {
        let instrumentData = storage.read(AIR_INSTRUMENT_DATA) || {};

        Object.keys(data).forEach(id => {
            instrumentData[id] = data[id];

            if(now < data[id].dataTime) {
                now = data[id].dataTime;
            }
        });

        storage.write(AIR_INSTRUMENT_DATA, instrumentData);
    });

    /**
     * Boardcast air park information.
     */
    events.on(AIR_PARK_INFOMATION, data => {
        storage.write(AIR_PARK_INFOMATION, data);
        io.emit(AIR_PARK_INFOMATION, data);
    });

    /**
     * Boardcast AQI one week data.
     */
    events.on(AIR_ONE_WEEK_LINECHART, data => {
        storage.write(AIR_ONE_WEEK_LINECHART, data);
        io.emit(AIR_ONE_WEEK_LINECHART, data);
    });

    /**
     * Delete station
     */
    events.on(AIR_STATION_DELETE, data => {
        let airStationData = storage.read(AIR_STATION_DATA) || {};

        if(airStationData.airStationList && airStationData.airStationList[data.siteId]) {
            delete airStationData.airStationList[data.siteId];
        }

        storage.write(AIR_STATION_DATA, airStationData);

        io.emit(AIR_STATION_DATA, airStationData);
    });
}

export default geopraphicMap;
