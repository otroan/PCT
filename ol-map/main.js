import './style.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
//import GeoJSON from 'ol/format/GeoJSON';
import GPX from 'ol/format/GPX';
import {OSM, Vector as VectorSource} from 'ol/source';
import Feature from 'ol/Feature';
import KML from 'ol/format/KML';
import Overlay from 'ol/Overlay'

import * as olCoordinate from 'ol/coordinate';

const pct_vector = new VectorLayer({
    source: new VectorSource({
        url: 'data/pct.gpx',
        format: new GPX(),
    }),
});

const ole_vector = new VectorLayer({
    source: new VectorSource({
        url: 'data/OleTroan.kml',
        // url: 'https://share.garmin.com/Feed/Share/OleTroan',
        // url: 'https://share.garmin.com/Feed/Share/OleTroan\?d1\=2019-01-01',
        format: new KML(),
        crossOrigin: 'anonymous'
    }),
});
      
const map = new Map({
    target: 'map',
    layers: [
        // OpenStreetMap layer
        new TileLayer({
            source: new OSM()
        }),
        pct_vector,
        ole_vector
    ],
    view: new View({
        center: olProj.fromLonLat([-121.385723, 40.754215]),
        zoom: 5
    }),
});
