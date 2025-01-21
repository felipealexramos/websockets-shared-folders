import { MongoClient } from "mongodb";

const cliente = new MongoClient("mongodb+srv://admin:231119@cluster0.g7mhgbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

let documentosColecao;

try {
    await cliente.connect();

    const db = cliente.db("alura-websockets");
    const documentosColecao = db.collection("documentos");

    console.log("Conectado ao banco de dados!");
} catch (error) {
    console.log("Erro ao conectar no banco de dados", error);
}

export { documentosColecao };