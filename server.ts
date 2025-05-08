import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Ajusta esto en producción
    methods: ['GET', 'POST']
  }
});

// Ruta simple
app.get('/', (req, res) => {
  res.send('Servidor con WebSocket en marcha');
});

// Manejo de conexiones de socket
io.on('connection', (socket) => {
  console.log(`🟢 Cliente conectado: ${socket.id}`);

  // Ejemplo: escuchar un evento
  socket.on('mensaje', (data) => {
    console.log(`📩 Mensaje recibido: ${data}`);
    // reenviar a todos los clientes
    io.emit('mensaje', data);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

// Levantar el servidor
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
