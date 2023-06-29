/* eslint-disable */
import * as THREE from 'three'
import * as React from 'react'
import { useRef, useState } from 'react'
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber'
import './App.css'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!) // animations are done via ref
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  useFrame((state, deltaTime) => {
    // if clicked, every frame rotate by angle which is 0.4 * deltaTime in radians
    clicked && (ref.current.rotation.y += 0.4 * deltaTime)
  })

  const clickHandler = (e: ThreeEvent<MouseEvent>) => {
    setClicked(!clicked);
    // stopPropagation is necessary so next box in the path of raycast is not affected
    e.stopPropagation() 
  }
  const pointerOverHandler = (e: ThreeEvent<MouseEvent>) => {
    setHovered(true);
    e.stopPropagation()
  }
  const pointerOutHandler = (e: ThreeEvent<MouseEvent>) => {
    setHovered(false);
    e.stopPropagation()
  }

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={clickHandler}
      onPointerOver={pointerOverHandler}
      onPointerOut={pointerOutHandler}
      receiveShadow
      castShadow
    >

      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas shadows>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, 10, -10]} castShadow />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <Box position={[1.2, 0, 2.2]} />
      <mesh position={[0, -5.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[10, 10, 10]} />
        <meshStandardMaterial color={'green'} />
      </mesh>
    </Canvas>
  )
}
