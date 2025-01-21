import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import "./dbConnect.js";

const app = express();
const port = process.env.PORT || 3000;

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretoriaPublico = path.join(caminhoAtual, "../..", "public");

app.use(express.static(diretoriaPublico));

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => console.log(`Server is running on port ${port}`));

const io = new Server(serverHttp);

export default io;