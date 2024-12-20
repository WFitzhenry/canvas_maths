In a nutshell, the job of WebGL is to consume data (vertex positions, normals, textures, etc.), process said data (via shaders), and decide what color any given pixel on your screen should be as a result.

If what you are displaying is supposed to be moving or changing in any way, you ideally want that to happen at 30 or 60 times per second for every pixel. The area for which WebGL is responsible for is the area occupied by an HTML Canvas element in your WebApp.

To accomplish such a feat, you want to be able to utilize the GPU. To do that from within the browser, you can use JavaScript (or potentially any other application compiled to WASM) to interact with the WebGL API. Internally, your browser will map any WebGL API calls to OpenGL API calls, which is essentially identical in terms of syntax and is an API provided by your operating system and implemented by your GPU. As a result, any WebGL actions will eventually be executed directly on the GPU.

https://medium.com/geekculture/joy-and-misery-a-month-of-webgl-d050ef3f93e6

https://www.scratchapixel.com/
