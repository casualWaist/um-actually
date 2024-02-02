import {useState} from 'react'
import {Canvas} from "@react-three/fiber"
import {Center, OrbitControls} from "@react-three/drei"
import { UmActuallyWeb } from "./UmActuallyWeb.jsx"

export default function App() {

  const [ cameraPosition ] = useState(Math.floor(Math.random() * 5))

  return <>
    <Canvas camera={{fov: 100, near: 0.1, far: 2000, position:[0, 0.5, 2]}}>
        <OrbitControls maxPolarAngle={1.75}
                    maxDistance={5}
                    minAzimuthAngle={5.25}
                    maxAzimuthAngle={7.25}/>
      <Center>
        <UmActuallyWeb cameraPosition={cameraPosition}/>
      </Center>
    </Canvas>

  </>
}
