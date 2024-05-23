import { useState } from 'react';
import { DeckGL, ScatterplotLayer, MapViewState } from 'deck.gl';
import { MapView } from '@aws-amplify/ui-react-geo';
import 'maplibre-gl/dist/maplibre-gl.css';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 0.45,
  latitude: 51.47,
  zoom: 11,
  bearing: 0,
  pitch: 0,
};

function App() {
  const [viewport, setViewport] = useState<MapViewState>(INITIAL_VIEW_STATE);
  const layers = [
    new ScatterplotLayer({
      id: 'deckgl-circle',
      data: [{ position: [0.45, 51.47] }],
      getPosition: (d) => d.position,
      getFillColor: [255, 0, 0, 100],
      getRadius: 1000,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={layers}
      onViewStateChange={({ viewState }) =>
        setViewport(viewState as MapViewState)
      }
    >
      <MapView
        {...viewport}
        initialViewState={INITIAL_VIEW_STATE}
        style={{
          position: 'absolute',
          zIndex: -1,
        }}
      />
    </DeckGL>
  );
}

export default App;
