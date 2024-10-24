import ForceMap from "./forceMap.js";

// Vertex Shader
export const vertexShaderSource = `
    attribute vec2 aPosition;
    uniform vec2 uResolution;
    uniform vec2 uTranslation;
    uniform float uScale;
    void main() {
        // Convert from pixels to clip space
        vec2 clipSpace = (aPosition * uScale + uTranslation) / uResolution * 2.0 - 1.0;
        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;

// Fragment Shader
export const fragmentShaderSource = `
    precision mediump float;
    uniform vec4 uColor;
    void main() {
        gl_FragColor = uColor;
    }
`;


export class Color {
  constructor(r, g, b, a = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}
export const colors = {
  red: new Color(1, 0, 0),
  Pink: new Color(1, 0, 1),
  green: new Color(0, 1, 0),
  yellow: new Color(1, 1, 0),
  blue: new Color(0, 0, 1)
};


// export const attractionMatrix0 = new ForceMap( Object.keys(colors));
const forceMapPreset1 = /** @type {const} */ ([
  [
    "red", [
      ["red", -0.31143992287144046],
      ["Pink", -0.19068370631214368],
      ["green", 0.15313780443725275],
      ["yellow", 0.0925544250485002],
      ["blue", 0.07741892492889146]
    ]
  ],
  [
    "Pink", [
      ["red", -0.231039595645814],
      ["Pink", -0.034357962446763],
      ["green", 0.2866555637384353],
      ["yellow", -0.10982928392330334],
      ["blue", 0.2114394043082927]
    ]
  ],
  [
    "green", [
      ["red", -0.14464228954440447],
      ["Pink", -0.30359160335537255],
      ["green", -0.11164004906719975],
      ["yellow", 0.17633609907872008],
      ["blue", 0.023430356883003434]
    ]
  ],
  [
    "yellow", [
      ["red", 0.09048238706011746],
      ["Pink", -0.1091328053228066],
      ["green", 0.16459295786485942],
      ["yellow", 0.3039109003926745],
      ["blue", 0.14310041984450717]
    ]
  ],
  [
    "blue", [
      ["red", -0.3176365481439601],
      ["Pink", -0.057649703957334854],
      ["green", -0.31336200968664185],
      ["yellow", -0.21620700677368232],
      ["blue", 0.026205510292360106]
    ]
  ]
]);
const forceMapPreset2 = JSON.parse('[[{ "r": 0.95, "g": 0.26, "b": 0.21 },[[{ "r": 0.95, "g": 0.26, "b": 0.21 },-0.1272925615322705],[{"r":0,"g":1,"b":0,"a":1},-0.2742848052694951],[{ "r": 1.00, "g": 0.92, "b": 0.23 },0.14729419389142148],[{ "r": 0.13, "g": 0.59, "b": 0.95 },0.2228145188576359],[{ "r": 0.91, "g": 0.12, "b": 0.39 },-0.23940886772346884]]],[{"r":0,"g":1,"b":0,"a":1},[[{ "r": 0.95, "g": 0.26, "b": 0.21 },-0.14320947955608757],[{"r":0,"g":1,"b":0,"a":1},-0.07607880736050099],[{ "r": 1.00, "g": 0.92, "b": 0.23 },-0.28256756293479235],[{ "r": 0.13, "g": 0.59, "b": 0.95 },-0.013575550326262823],[{ "r": 0.91, "g": 0.12, "b": 0.39 },0.19973036802729358]]],[{ "r": 1.00, "g": 0.92, "b": 0.23 },[[{ "r": 0.95, "g": 0.26, "b": 0.21 },0.17151979346149307],[{"r":0,"g":1,"b":0,"a":1},-0.21964826969279536],[{ "r": 1.00, "g": 0.92, "b": 0.23 },-0.14913847646461523],[{ "r": 0.13, "g": 0.59, "b": 0.95 },-0.03584050165932388],[{ "r": 0.91, "g": 0.12, "b": 0.39 },0.17985804428396004]]],[{ "r": 0.13, "g": 0.59, "b": 0.95 },[[{ "r": 0.95, "g": 0.26, "b": 0.21 },-0.15604909656927365],[{"r":0,"g":1,"b":0,"a":1},-0.2107642745998922],[{ "r": 1.00, "g": 0.92, "b": 0.23 },0.1439947176377839],[{ "r": 0.13, "g": 0.59, "b": 0.95 },0.24275893140068852],[{ "r": 0.91, "g": 0.12, "b": 0.39 },-0.1007998625359489]]],[{ "r": 0.91, "g": 0.12, "b": 0.39 },[[{ "r": 0.95, "g": 0.26, "b": 0.21 },-0.3016561243816331],[{"r":0,"g":1,"b":0,"a":1},-0.30848778383457204],[{ "r": 1.00, "g": 0.92, "b": 0.23 },-0.2558729573729708],[{ "r": 0.13, "g": 0.59, "b": 0.95 },-0.013727789572185234],[{ "r": 0.91, "g": 0.12, "b": 0.39 },-0.07538215193959052]]]]'
  .replaceAll('{"r":1,"g":0,"b":0,"a":1}','"red"')
  .replaceAll('{"r":0,"g":1,"b":0,"a":1}', '"green"')
  .replaceAll('{"r":1,"g":1,"b":0,"a":1}', '"yellow"')
  .replaceAll('{"r":0,"g":1,"b":1,"a":1}', '"blue"')
  .replaceAll('{"r":1,"g":0.75,"b":0.8,"a":1}', '"pink"')
  .replaceAll('{ "r": 0.95, "g": 0.26, "b": 0.21 }','"red"')
  .replaceAll('{"r":0,"g":1,"b":0,"a":1}', '"green"')
  .replaceAll('{ "r": 1.00, "g": 0.92, "b": 0.23 }', '"yellow"')
  .replaceAll('{ "r": 0.13, "g": 0.59, "b": 0.95 }', '"blue"')
  .replaceAll('{ "r": 0.91, "g": 0.12, "b": 0.39 }', '"pink"'))
export const attractionMatrix = ForceMap.fromEntries(forceMapPreset1);

export class Particle {
  static program = null;
  constructor(gl, resolution, x, y, radius, color, colorName) {
    this.gl = gl;
    this.resolution = resolution;
    this.position = { x, y };
    this.radius = radius;
    this.color = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a
    };
    this.colorName = colorName;
    this.actualColor = {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a
    };

    const speed = 2;
    const angle = Math.random() * 2 * Math.PI;
    this.velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    this.acceleration = { x: 0, y: 0 };

    if (Particle.program === null) {
      Particle.program = this.createProgram(gl, vertexShaderSource, fragmentShaderSource);
    }
    this.program = Particle.program;
    this.init();
  }

  get direction() {
    const magnitude = Math.hypot(this.velocity.x, this.velocity.y);
    return {
      x: this.velocity.x / magnitude,
      y: this.velocity.y / magnitude
    }
  }

  init() {
    const gl = this.gl;

    // Compile shaders
    gl.useProgram(this.program);

    // Get attribute and uniform locations
    this.positionLocation = gl.getAttribLocation(this.program, "aPosition");
    this.resolutionLocation = gl.getUniformLocation(this.program, "uResolution");
    this.translationLocation = gl.getUniformLocation(this.program, "uTranslation");
    this.scaleLocation = gl.getUniformLocation(this.program, "uScale");
    this.colorLocation = gl.getUniformLocation(this.program, "uColor");

    // Create a buffer and put a unit circle in it
    const numVertices = 100;
    const circleVertices = this.createCircleVertices(numVertices);

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circleVertices), gl.STATIC_DRAW);

    // Set the resolution uniform
    gl.uniform2f(this.resolutionLocation, this.resolution.width, this.resolution.height);
  }

  createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program failed to link:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  createCircleVertices(numVertices) {
    const vertices = [];
    for (let i = 0; i <= numVertices; i++) {
      const angle = (i / numVertices) * Math.PI * 2;
      vertices.push(Math.cos(angle), Math.sin(angle));
    }
    return vertices;
  }

  applyForce(force) {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }

  update(delta) {
    this.velocity.x *= 0.45;
    this.velocity.y *= 0.45;
    let speed = Math.hypot(this.velocity.x, this.velocity.y);
    speed = Math.max(0, Math.min(speed / 160, 1))
    if(speed > 0.9){
      // this.colorName = "blue";
      // const color = colors[this.colorName];
      // this.actualColor = {
      //   r: color.r,
      //   g: color.g,
      //   b: color.b,
      //   a: color.a
      // };
    }
    this.radius = (speed) * (10) + radius;
    const oneMinusSpeed = speed;
    this.color.r = Math.min(1, this.actualColor.r + oneMinusSpeed);
    this.color.g = Math.min(1, this.actualColor.g + oneMinusSpeed);
    this.color.b = Math.min(1, this.actualColor.b + oneMinusSpeed);

    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    if (this.position.x < 0 || this.position.x > this.resolution.width) {
      this.velocity.x = -this.velocity.x;
      this.position.x = Math.max(0, Math.min(this.position.x, this.resolution.width));
    }
    if (this.position.y < 0 || this.position.y > this.resolution.height) {
      this.velocity.y = -this.velocity.y;
      this.position.y = Math.max(0, Math.min(this.position.y, this.resolution.height));
    }

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;

    this.acceleration.x = 0;
    this.acceleration.y = 0;
  }


  render() {
    const gl = this.gl;

    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    // Enable the position attribute
    gl.enableVertexAttribArray(this.positionLocation);
    gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Set the uniforms
    gl.uniform2f(this.translationLocation, this.position.x, this.position.y);
    gl.uniform1f(this.scaleLocation, this.radius);
    gl.uniform4f(this.colorLocation, this.color.r, this.color.g, this.color.b, this.color.a);

    // Draw the circle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 101);  // Updated to 101 vertices
  }
}



