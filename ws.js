import { WS_URL } from "./config.js";
let WS=null; const listeners=new Set();
export function onWSMessage(fn){ listeners.add(fn); return ()=>listeners.delete(fn); }
export function connectWS(){ try{ WS=new WebSocket(WS_URL); WS.onopen=()=>console.info("[WS] connected"); WS.onmessage=e=>{ try{ const m=JSON.parse(e.data); listeners.forEach(fn=>fn(m)); }catch{} }; WS.onclose=()=>{ setTimeout(connectWS,2000); }; }catch(e){ console.error("WS error:",e); } }
