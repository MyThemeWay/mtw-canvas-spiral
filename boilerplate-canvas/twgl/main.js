/*! MTW-CANVAS-SPIRAL: MAIN.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * Copyright: © 2022 sitdisch
 *
 * FRAGMENT SHADER IS BASED ON:
 * 
 * Shadertoy: ARQVOID :: 240 chars
 * 
 * Original Authors: ENDESGA & Xor  
 * Source: https://www.shadertoy.com/view/NscXR8/
 * Shadertoy Default License: CC BY-NC-SA 3.0
 * Copyright: © 2021 ENDESGA & Xor 
 * Changes: made
 */

"use strict";

import { createProgramInfo, createBufferInfoFromArrays, resizeCanvasToDisplaySize, setBuffersAndAttributes, setUniforms, drawBufferInfo } from 'twgl.js';
import { fragmentShader, vertexShader, renaming } from './shaders.glslx';

(() => {
  const canvas = document.getElementById(MTW_CANVAS_ID);
  
  canvas.style.backgroundColor="black";
  
  const gl = canvas.getContext("webgl");
  
  // FIX: adding "\n" is a workaround for twgl.js error:'no element with id:...'
  const vs = "\n"+vertexShader;
  const fs = "\n#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n"+fragmentShader;
  
  const programInfo = createProgramInfo(gl, [vs, fs]);
  gl.useProgram(programInfo.program);
  
  const arrays = {
    [renaming.position]: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  };
  
  const bufferInfo = createBufferInfoFromArrays(gl, arrays);
  setBuffersAndAttributes(gl, programInfo, bufferInfo);
  
  const uniforms = {
    [renaming.iTime]: 0,
    [renaming.iResolution]: [],
  };
  
  const randomStart = Math.floor(Math.random() * 100);
  
  function render() {
    uniforms[renaming.iTime] = randomStart + performance.now() / 4500;
    uniforms[renaming.iResolution] = [canvas.clientWidth, canvas.clientHeight, 1];
    resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    setUniforms(programInfo, uniforms);
    drawBufferInfo(gl, bufferInfo);
    setTimeout(() => requestAnimationFrame(render), 100);
  };
  
  requestAnimationFrame(render);
})();
