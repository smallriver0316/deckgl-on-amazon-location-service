import { useState } from 'react';
import { DeckGL, Tile3DLayer, MapViewState } from 'deck.gl';
import { MapView } from '@aws-amplify/ui-react-geo';
import { Tiles3DLoader } from '@loaders.gl/3d-tiles';
import type { Tileset3D, Tile3D } from '@loaders.gl/tiles';
import { Vector3 } from 'math.gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 139.7674681227469,
  latitude: 35.68111419325676,
  zoom: 11,
  bearing: 0,
  pitch: 0,
};

function App() {
  const [viewport, setViewport] = useState<MapViewState>(INITIAL_VIEW_STATE);

  const layers = [
    new Tile3DLayer({
      id: 'tile-3d-layer',
      pointSize: 1,
      data: 'https://assets.cms.plateau.reearth.io/assets/aa/ecf312-95c2-4e24-8351-642f27e447b6/13100_tokyo23-ku_2022_3dtiles_1_1_op_bldg_13101_chiyoda-ku_lod1/tileset.json',
      loader: Tiles3DLoader,
      onTilesetLoad: (tile: Tileset3D) => {
        const { cartographicCenter } = tile;
        if (cartographicCenter) {
          console.log(cartographicCenter);
        }
      },
      onTileLoad: (tileHeader: Tile3D) => {
        tileHeader.content.cartographicOrigin = new Vector3(
          tileHeader.content.cartographicOrigin.x,
          tileHeader.content.cartographicOrigin.y,
          tileHeader.content.cartographicOrigin.z - 40
        );
      },
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={layers}
      onViewStateChange={({ viewState }: { viewState: MapViewState }) =>
        setViewport(viewState)
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
