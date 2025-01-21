import { documentosColecao } from "./dbConnect.js";

function obterDocumentos() {
    const documentos = documentosColecao.find().toArray();

    return documentos;
}

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome,
    });

    return documento;
}

function adicionarDocumento(nome) {
    const documento = documentosColecao.insertOne({
        nome,
        texto: "",
    });

    return documento;
}

function atualizaDocumento(nome, texto) {
    const atualizacao = documentosColecao.updateOne(
        {
            nome,
        },
        {
            $set: {
                texto,
            },
        }
    );

    return atualizacao;
}

function excluirDocumento(nome) {
    const resultado = documentosColecao.deleteOne({
        nome,
    });

    return resultado;
}

export { encontrarDocumento, atualizaDocumento, obterDocumentos, adicionarDocumento, excluirDocumento };