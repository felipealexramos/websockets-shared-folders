import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://admin:231119@cluster0.g7mhgbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

let documentosColecao;

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    documentosColecao = db.collection("documentos");

    console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
    console.log(erro);
}

export { documentosColecao };