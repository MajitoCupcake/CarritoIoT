import { WS_URL } from "./config.js";

let WS = null;
const listeners = new Set();
let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

export function onWSMessage(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

export function connectWS() {
    try {
        console.log("🔌 Conectando WebSocket...");
        WS = new WebSocket(WS_URL);
        
        WS.onopen = () => {
            console.log("✅ WebSocket conectado");
            reconnectAttempts = 0;
            
            // Notificar a los listeners que la conexión está abierta
            listeners.forEach(fn => fn({ type: "connection", status: "connected" }));
        };
        
        WS.onmessage = (e) => {
            // console.log("📨 Mensaje WebSocket recibido:", e.data); // Opcional: demasiado ruidoso
            try {
                const data = JSON.parse(e.data);
                listeners.forEach(fn => fn(data));
            } catch (error) {
                listeners.forEach(fn => fn({ type: "message", content: e.data }));
            }
        };
        
        WS.onclose = (e) => {
            console.log("🔌 WebSocket cerrado:", e.code, e.reason);
            listeners.forEach(fn => fn({ type: "connection", status: "disconnected" }));

            if (reconnectAttempts < maxReconnectAttempts) {
                reconnectAttempts++;
                console.log(`🔄 Reconectando... (${reconnectAttempts}/${maxReconnectAttempts})`);
                setTimeout(connectWS, 2000);
            }
        };
        
        WS.onerror = (error) => {
            console.error("❌ Error WebSocket:", error);
            listeners.forEach(fn => fn({ type: "error", error: error }));
        };
        
    } catch (error) {
        console.error("❌ Error al conectar WebSocket:", error);
    }
}

export function sendWSMessage(message) {
    if (WS && WS.readyState === WebSocket.OPEN) {
        WS.send(typeof message === 'string' ? message : JSON.stringify(message));
        return true;
    } else {
        console.warn("⚠️ WebSocket no está conectado, no se pudo enviar:", message);
        return false;
    }
}