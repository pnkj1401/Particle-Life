
import { Particle, colors, attractionMatrix } from "./particle.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
canvas.width = (window.innerWidth - 30);
canvas.height = window.innerHeight - 30;
const gl = canvas.getContext("webgl2");
const rMax = 150;
const n = 1300;
globalThis.radius = 2.25;

if (!gl) {
    console.error("WebGL2 is not available in your browser.");
} else {
    const resolution = { width: canvas.width, height: canvas.height };

    /** @type {Particle[]} */
    const particles = []; 
    const colorKeys = Object.keys(colors);

    for (let i=0; i<n; i++) {
        let x = (Math.random() * canvas.width / 2) + canvas.width / 4;
        let y = (Math.random() * canvas.height / 2) + canvas.height / 4;

        const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        const color = colors[colorKey];

        let particle = new Particle(gl, resolution, x, y, radius, color, colorKey);
        particles.push(particle);
    }

    gl.clearColor(0, 0, 0, 1);
    let lastTimestamp = Date.now();

    function render() {
        const timestamp = Date.now();
        const delta = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;
   
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(let i=0; i<particles.length; i++){
            let netForce = {x:0, y:0};
            
            for(let j=0; j<particles.length; j++){
                if(i===j) continue;
                const rx = particles[j].position.x - particles[i].position.x;
                const ry = particles[j].position.y - particles[i].position.y;
                const r = Math.hypot(rx, ry);
                if(r>0 && r<rMax){
                   const force = calculateAttraction(r/rMax, attractionMatrix.get(particles[i].colorName, particles[j].colorName)); 
                   netForce.x += rx / r * force;
                   netForce.y += ry / r * force;
                }
            }

            repelFromBorder(netForce, particles[i].position,{x:0, y:0},{x:0, y:canvas.height});
            repelFromBorder(netForce, particles[i].position,{x:0, y:0},{x:canvas.width, y:0});
            repelFromBorder(netForce, particles[i].position,{x:canvas.width, y:0},{x:canvas.width, y:canvas.height});
            repelFromBorder(netForce, particles[i].position,{x:0, y:canvas.height},{x:canvas.width, y:canvas.height});
            netForce.x *= rMax ;
            netForce.y *= rMax ;
            particles[i].applyForce(netForce); 
        }
        for(let particle of particles){
           particle.update(delta);
            particle.render();
        }
        setTimeout(render,16);
    }

    render();
}   

function calculateAttraction(r, a) {
    const beta = 0.4;
    if(r<beta){
        return r/beta -1;
    }else if(beta<r && r<1){
        return a * (1 - Math.abs(2 * r - 1 - beta) / (1 - beta))
    }else{
        return 0;
    }
}

function closestPointOnLine(x1, y1, x2, y2, px, py) {
    const lineDir = { x: x2 - x1, y: y2 - y1 };
    const pointVector = { x: px - x1, y: py - y1 };
    const dotProduct = lineDir.x * pointVector.x + lineDir.y * pointVector.y;
    
    const lineLengthSquared = lineDir.x * lineDir.x + lineDir.y * lineDir.y;
    
    const t = dotProduct / lineLengthSquared;
    
    const closestX = x1 + t * lineDir.x;
    const closestY = y1 + t * lineDir.y;
    
    return { x: closestX, y: closestY };
}

function repelFromBorder(netForce,position, p1, p2){

    const pointOnLine = closestPointOnLine( p1.x, p1.y, p2.x, p2.y, position.x, position.y);
    const rx = pointOnLine.x -position.x;
    const ry = pointOnLine.y -position.y;
    const r = Math.hypot(rx, ry);
    if(r>0 && r<100){
       const force = calculateAttraction(r/10, -4) * (50- r); 
       netForce.x += rx / r * force;
       netForce.y += ry / r * force;
    }

}

function calculateDistance(pos1, pos2) {
    const squaredDiffX = Math.pow(pos1.x - pos2.x, 2);
    const squaredDiffY = Math.pow(pos1.y - pos2.y, 2);
    const sumSquaredDiff = squaredDiffX + squaredDiffY;
    return Math.sqrt(sumSquaredDiff);
}