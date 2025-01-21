import { documentosColecao } from "./dbConnect";

function encontrarDocumento(nome) {
    const documento = documentosColecao.findOne({
        nome
    });

    return documento;
}

export { encontrarDocumento };