import { Canvas } from '@react-three/fiber';
import TBDCalendar from './comp/TBDCalendar';
import { BasicShadowMap, NoToneMapping } from 'three';
import TempBox from './TempBox';
import { Suspense } from 'react';

function App(props) {
  return (<>
    {/* <Canvas
      shadows={ {type: BasicShadowMap} } 
      camera={ {fov: 65, far: 1000, near: 0.08, isPerspectiveCamera: true, position:[0, 0, 0], rotation: [0, 0, 0] } } 
      gl={ {toneMapping: NoToneMapping, antialias: true, powerPreference:"high-performance"} } 
    >
      <Suspense fallback={null}>
        <TempBox />
      </Suspense>
    </Canvas> */}
    
    <TBDCalendar />
  </>)
}

export default App
