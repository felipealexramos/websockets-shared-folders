import { adicionarDocumento, atualizaDocumento, encontrarDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./server.js";

io.on("connection", (socket) => {
    socket.on("obter_documentos", async (devolverDocumentos) => {
        const documentos = await obterDocumentos();

        devolverDocumentos(documentos);
    });

    socket.on("adicionar_documento", async (nomeDocumento) => {
        const documentoExiste = (await encontrarDocumento(nomeDocumento)) !== null;

        if (documentoExiste) {
            socket.emit("erro_documento_existe", nomeDocumento);
        } else {
            const resultado = await adicionarDocumento(nomeDocumento);

            if (resultado.acknowledged) {
                io.emit("adicionar_documento_interface", nomeDocumento);
            }
        }
    });

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
        socket.join(nomeDocumento);

        const documento = await encontrarDocumento(nomeDocumento);

        if (documento) {
            devolverTexto(documento.texto);
        }
    });

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
        const atualizacao = await atualizaDocumento(nomeDocumento, texto);

        if (atualizacao.modifiedCount) {
            socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
        }
    });
});

