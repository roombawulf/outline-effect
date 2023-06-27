import { useMemo } from "react";
import { SobelEdgePass } from "./SobelEdgePass.js";
import { useThree } from "@react-three/fiber";

function SobelEdge () {

    const { scene, camera, size } = useThree()

    const effect = useMemo( () => new SobelEdgePass( scene, camera, {x: size.width, y: size.height}) )

    return <primitive object={effect} />
}
export default SobelEdge