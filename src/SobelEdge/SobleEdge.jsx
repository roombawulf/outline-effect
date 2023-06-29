import { useMemo } from "react";
import { SobelEdgePass } from "./SobelEdgePass.js";
import { useThree } from "@react-three/fiber";

function SobelEdge () {

    const { scene, camera, size, viewport } = useThree()

    // here we pass `resolution * devicePixelRatio` as the resolution. Which helps with aliasing on edges.
    const effect = useMemo( () => new SobelEdgePass( scene, camera, {x: size.width * viewport.dpr , y: size.height * viewport.dpr}) )

    return <primitive object={effect} />
}
export default SobelEdge