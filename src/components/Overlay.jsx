import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function Overlay({ radius = 1.5, size = 0.005, height = '100vh' }) {
  return (
    <Canvas style={{ zIndex: -1, position: 'absolute', height: height, width: '100vw', backgroundColor: '#000',  }} camera={{ position: [0, 0, 1] }}>
      <Stars radius={radius} size={size} />
    </Canvas>
  )
}

function Stars({radius, size, ...props}) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(25000), { radius }))
  const containsNaN = sphere.some(isNaN);
  if (containsNaN) {
    console.error('The sphere array contains NaN values');
  }
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
  })
  console.log(sphere);
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#0d6efd" size={size} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}