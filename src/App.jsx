import {useCallback, useEffect, useRef, useState} from 'react'
import {Canvas, useFrame, useThree} from "@react-three/fiber"
import {Center} from "@react-three/drei"
import { UmActuallyWeb } from "./UmActuallyWeb.jsx"
import {useMediaQuery} from "react-responsive"

export default function App() {

  const [ cameraPosition ] = useState(Math.floor(Math.random() * 5))
  const orientAllowed = useRef(false)

  // if mobile, enable device orientation to control the camera
  const isMobile = useMediaQuery({ query: 'only screen and (max-width: 768px)' })
  console.log("isMobile", isMobile)
  const { orientation, requestAccess } = useDeviceOrientation()
  const camera = useThree((state)=> state.camera)

  useEffect(() => {
    if (isMobile) {
      requestAccess().then((result) => {
        if (result) {
          orientAllowed.current = true
        }
      })
    }
  }, [])

  useFrame(() => {
      if (orientAllowed.current && orientation) {
        camera.position.set(orientation.beta, orientation.gamma, orientation.alpha)
      }
  })

  return <>
    <Canvas camera={{fov: 100, near: 0.1, far: 2000, position:[0, 0.5, 2]}}>
      {/*{ isMobile ? <DeviceOrientationControls /> :
          <OrbitControls maxPolarAngle={1.75}
                      maxDistance={5}
                      minAzimuthAngle={5.25}
                      maxAzimuthAngle={7.25}/>}*/}
      <Center>
        <UmActuallyWeb cameraPosition={cameraPosition}/>
      </Center>
    </Canvas>

  </>
}

export const useDeviceOrientation = () => {
  const [error, setError] = useState(null)
  const [orientation, setOrientation] = useState(null)

  const onDeviceOrientation = (event) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
    })
  }

  const revokeAccessAsync = async () => {
    window.removeEventListener('deviceorientation', onDeviceOrientation)
    setOrientation(null);
  }

  const requestAccessAsync = async ()=> {
    if (!DeviceOrientationEvent) {
      setError(new Error('Device orientation event is not supported by your browser'))
      return false;
    }

    if (
        DeviceOrientationEvent.requestPermission
        && typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      let permission
      try {
        permission = await DeviceOrientationEvent.requestPermission()
      } catch (err) {
        setError(err)
        return false
      }
      if (permission !== 'granted') {
        setError(new Error('Request to access the device orientation was rejected'))
        return false
      }
    }

    window.addEventListener('deviceorientation', onDeviceOrientation)

    return true;
  };

  const requestAccess = useCallback(requestAccessAsync, [])
  const revokeAccess = useCallback(revokeAccessAsync, [])

  useEffect(() => {
    return () => {
      revokeAccess()
    }
  }, [revokeAccess])

  return {
    orientation,
    error,
    requestAccess,
    revokeAccess,
  };
};

