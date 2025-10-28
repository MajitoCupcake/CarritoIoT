import { API_BASE } from "./config.js";
async function getJSON(url){ const r=await fetch(url); if(!r.ok) throw new Error(await r.text()); return r.json(); }
async function postJSON(url,body){ const r=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}); if(!r.ok) throw new Error(await r.text()); return r.json(); }
export async function getLastMovement(){ return getJSON(`${API_BASE}/telemetry/last-movement`); }
export async function getLastObstacle(){ return getJSON(`${API_BASE}/telemetry/last-obstacle`); }
export async function getMovements(){ return getJSON(`${API_BASE}/telemetry/movements`); }
export async function getObstacles(){ return getJSON(`${API_BASE}/telemetry/obstacles`); }
export async function sendMove(direction,speed=70,comment=""){ return postJSON(`${API_BASE}/control/move`,{direction,speed,comment}); }
export async function sendDemo(name="spin_left",durationSec=10){ return postJSON(`${API_BASE}/control/demo`,{name,durationSec}); }
export async function sendObstacle(distanceCm=15,thresholdCm=20){ return postJSON(`${API_BASE}/control/obstacle`,{distanceCm,thresholdCm}); }
