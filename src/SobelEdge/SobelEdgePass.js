import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
import { Pass } from "postprocessing";
import * as THREE from "three";

import fragment from './fragment.glsl'
import vertex from './vertex.glsl'

class SobelEdgePass extends Pass {

    constructor( scene, camera, resolution ) {
        super();
        this.scene = scene
        this.camera = camera
        this.resolution = resolution
        this.fsQuad = new FullScreenQuad(this.material());
        
        const depthTexture = new THREE.DepthTexture( resolution.x, resolution.y )
        const normalBuffer = new THREE.WebGLRenderTarget( resolution.x, resolution.y, { depthTexture, samples: 8 } )
        normalBuffer.texture.format = THREE.RGBAFormat
        normalBuffer.texture.generateMipmaps = false
        normalBuffer.stencilBuffer = false
        this.normalBuffer = normalBuffer

        this.normalOverrideMaterial = new THREE.MeshNormalMaterial()
    }

    render( renderer, inputBuffer, outputBuffer, deltaTime, stencilTest ) {

        // render normals + depth
        renderer.setRenderTarget( this.normalBuffer )
        const oldMat = this.scene.overrideMaterial
        this.scene.overrideMaterial = this.normalOverrideMaterial
        renderer.render( this.scene, this.camera )
        this.scene.overrideMaterial = oldMat
        
        // apply uniforms
        this.fsQuad.material.uniforms.sceneBuffer.value = inputBuffer.texture
        this.fsQuad.material.uniforms.depthBuffer.value = this.normalBuffer.depthTexture
        this.fsQuad.material.uniforms.normalBuffer.value = this.normalBuffer.texture

        // render or send over to next pass
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
        } else {
            renderer.setRenderTarget(outputBuffer);
            if (this.clear) renderer.clear();
        }
        this.fsQuad.render(renderer);

    }

    material() {
        return new THREE.ShaderMaterial({
            uniforms: {
                normalBuffer: { value: null },
                depthBuffer: { value: null },
                sceneBuffer: { value: null },
                cameraNear: { value: this.camera.near },
                cameraFar: { value: this.camera.far },
                resolution: { value: new THREE.Vector2( this.resolution.x, this.resolution.y )}
            },
            vertexShader: vertex,
            fragmentShader: fragment
        });
    }
}

export { SobelEdgePass }