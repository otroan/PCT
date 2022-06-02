import 'ol/ol.css';
// import './style.css';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import XYZ from 'ol/source/XYZ';
import * as olProj from 'ol/proj';
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
        // url: 'data/OleTroan.kml',
        url: 'https://share.garmin.com/Feed/Share/OleTroan' + '?time='+ new Date().getTime(),
        format: new KML(),
        crossOrigin: 'anonymous'
    }),
});

const map = new Map({
    target: document.getElementById('map'),
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

const displayFeatureInfo = function (pixel) {
    const pre_box = '<p style="border-style: inset;padding:2px 4px;">';
    const post_box = '</p>';
    const features = [];

    map.forEachFeatureAtPixel(pixel, function (feature) {
        features.push(feature);
    });
    if (features.length > 0) {
        const info = [];
        let desc= '';
        const f = features[0];
        let name = f.get('name');
        let text = f.get('Text');
        let Time = f.get('Time');
        let elevation = f.get('Elevation');
        let velocity = f.get('Velocity');

        if (text && text != "") {
            desc += 'Message: <b>'+text+'</b><br>';
        } else if (name && name != "") {
            desc += 'Name: '+name+'<br';
        }
        if (Time) {
            desc += 'Date: '+Time+'<br>';
        }
        if (elevation) {
            desc += 'Elevation: '+elevation+'<br>';
        }
        if (velocity) {
            desc += 'Velocity: '+velocity+'<br>';
        }

        document.getElementById('info').innerHTML = pre_box + desc + post_box;
        map.getTargetElement().style.cursor = 'pointer';
    } else {
        document.getElementById('info').innerHTML = '&nbsp;';
        map.getTargetElement().style.cursor = '';
    }
};

map.on('pointermove', function (evt) {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('click', function (evt) {
    displayFeatureInfo(evt.pixel);
});
