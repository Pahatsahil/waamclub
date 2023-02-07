import React from 'react';
import {Svg, Circle, Defs, Polygon, Path, G} from 'react-native-svg';

function ShareImage(props) {
	const {width, height, color} = props
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
	  viewBox="0 0 184.23 184.23">
      <G id="Camada_x0020_1">
        <Path
          fill={color}
          fillRule={'nonzero'}
          d="M50.12 54.54l83.86 -0.39c0.33,-0.02 0.67,0.05 0.98,0.23 0.81,0.47 1.09,1.52 0.61,2.33l-42.3 72.5c-0.24,0.43 -0.67,0.76 -1.19,0.85 -0.93,0.17 -1.81,-0.45 -1.98,-1.38l-7.68 -43.01 -33.38 -28.14c-0.72,-0.6 -0.81,-1.67 -0.21,-2.39 0.33,-0.4 0.81,-0.6 1.29,-0.61zm79.28 5.99l-43.52 25.13 6.77 37.86 36.75 -62.99zm-1.7 -2.95l-72.95 0.34 29.42 24.8 43.53 -25.14z"
        />
      </G>
    </Svg>
  );
}

export default ShareImage;
