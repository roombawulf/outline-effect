import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { EffectComposer, SMAA } from "@react-three/postprocessing";
import SobelEdge from "./SobelEdge/SobleEdge";

function Suzi() {
    const { nodes } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf')
    return (
      <mesh scale={2} position={[0, 0.5, -2]} geometry={nodes.Suzanne.geometry}>
        <meshToonMaterial color="orangered" />
      </mesh>
    )
}

function Stuff () {

    const sphere = useRef()
    const iso = useRef()
    const donut = useRef()

    useFrame((state, delta) => {
        iso.current.rotation.y = 4.0 * Math.sin(state.clock.elapsedTime)
        donut.current.rotation.y = 3.0 * Math.sin(state.clock.elapsedTime)
    })


    return (
        <>
            <mesh position={[-5 , 0, 0]} ref={iso}>
                <icosahedronGeometry />
                <meshToonMaterial color={'yellow'}/>
            </mesh>

            <mesh position={[-2, 0, 0]} ref={sphere}>
                <sphereGeometry />
                <meshToonMaterial color={'lightgreen'} />
            </mesh>

            <mesh position={[2, 0, 0]} ref={donut}>
                <torusGeometry />
                <meshToonMaterial color={'salmon'} />
            </mesh>

            <mesh position={[5, 0, 0]}>
                <boxGeometry />
                <meshStandardMaterial color={'lightblue'} />
            </mesh>
        </>
    )
}


function App() {

     return (
        <Canvas>
            <color attach="background" args={['bisque']} />
            <Stuff />
            <Suzi />

            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]}/>
            
            <EffectComposer multisampling={0}>
                <SobelEdge />
                <SMAA />
            </EffectComposer>

            <OrbitControls />
        </Canvas>
    );
}
export default App;
