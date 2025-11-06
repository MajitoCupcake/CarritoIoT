import { API_BASE, WS_URL } from "./config.js";

async function handleRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error en request:", error);
        throw new Error(`No se pudo conectar con el servidor: ${error.message}`);
    }
}

// Funciones GET
export async function getLastMovement() { 
    return handleRequest(`${API_BASE}/telemetry/last-movement`);
}
export async function getLastObstacle() { 
    return handleRequest(`${API_BASE}/telemetry/last-obstacle`);
}
export async function getMovements() { 
    return handleRequest(`${API_BASE}/telemetry/movements`);
}
export async function getObstacles() { 
    return handleRequest(`${API_BASE}/telemetry/obstacles`);
}

// Funciones POST
export async function sendMove(direction, speed = 70, comment = "") { 
    return handleRequest(`${API_BASE}/control/move`, {
        method: 'POST',
        body: JSON.stringify({ direction, speed, comment })
    });
}
export async function sendDemo(name = "spin_left", durationSec = 10) { 
    return handleRequest(`${API_BASE}/control/demo`, {
        method: 'POST',
        body: JSON.stringify({ name, durationSec })
    });
}
export async function sendObstacle(distanceCm = 15, thresholdCm = 20) { 
    return handleRequest(`${API_BASE}/control/obstacle`, {
        method: 'POST',
        body: JSON.stringify({ distanceCm, thresholdCm })
    });
}

// --- Funciones de Secuencia ---
export async function getSequences() {
    return handleRequest(`${API_BASE}/sequences`);
}

export async function saveSequence(name, steps) {
    return handleRequest(`${API_BASE}/sequences`, {
        method: 'POST',
        body: JSON.stringify({ name, steps })
    });
}

export async function runSequence(name) {
    // CORRECCIÓN: Decía API_BASET, ahora dice API_BASE
    return handleRequest(`${API_BASE}/control/run-sequence`, {
        method: 'POST',
        body: JSON.stringify({ name })
    });
}