# outline-effect

An outline effect made with threejs'[postprocessing](https://github.com/pmndrs/postprocessing) library. It uses sobel edge detection to verify edges in the depth and normal textures of the scene.

## stuff that needs work, but i'm too lazy to do right now...

* Depth texture edge detection causes aliased lines, needs smoothing.
* Could use a surface ID textures for better lines as [outlined here](https://omar-shehata.medium.com/better-outline-rendering-using-surface-ids-with-webgl-e13cdab1fd94).
* Thin/faded lines are far distances (use depth texture to do this)?