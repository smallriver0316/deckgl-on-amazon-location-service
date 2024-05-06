import { useEffect } from 'react';
import { createMap } from 'maplibre-gl-js-amplify';
import 'maplibre-gl/dist/maplibre-gl.css';

function App() {
  useEffect(() => {
    createMap({
      container: 'map',
      center: [139.7674681227469, 35.68111419325676],
      zoom: 14,
    });
  });

  return <div id="map" style={{ height: '100vh' }} />;
}

export default App;
