import { documentosColecao } from "./dbConnect.js";
import { encontrarDocumento } from "./documentosDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    console.log("Um cliente se conectou! ID:", socket.id);

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);

        const documento = await encontrarDocumentorarDocumento(nomeDocumento);

        console.log("Documento selecionado:", documento);

        if (documento) {
            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", ({ texto, nomeDocumento }) => {
        const documento = encontrarDocumento(nomeDocumento);

        if (documento) {
            documento.texto = texto;

            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });
});

