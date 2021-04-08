import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useLoader, useFrame, useThree } from 'react-three-fiber'
import '../styles.css'
import { Sky, Html } from 'drei'
import CustomStall from './Stall'
import LogoSpinner from './common/LogoSpinner'

function Loading() {
    return (
        <Html
            prepend="false"
            position
            style={{
                position: 'absolute',
                width: '100vw',
                height: '100vh',
            }}
        >
            <LogoSpinner
                style={{ position: 'absolute', top: '50vh', left: '50vw' }}
            />
        </Html>
    )
}

function Scene() {
    return (
        <>
            <CustomStall />
        </>
    )
}

const Home = () => {
    return (
        <>
            <Canvas
                id="canvas"
                concurrent
                camera={{ far: 10000, position: [-1, 3, 43] }}
                onCreated={({ camera, scene }) => {
                    camera.lookAt(-1, 2, 0)
                }}
            >
                <pointLight
                    castShadow
                    intensity={0.8}
                    position={[1000, 100, 0]}
                />
                <ambientLight intensity={0.6} />
                <Sky distance={450000} sunPosition={[-1500, 700, 1500]} />
                <Suspense fallback={<Loading />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </>
    )
}

export default Home
