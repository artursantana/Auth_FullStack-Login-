import mongoose from 'mongoose';

export default async function connect(): Promise<void> {
    try {
        if (!process.env.MONGO) {
            throw new Error("Por favor, defina a variável de ambiente MONGO");
        }
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log("Conectado ao MongoDB");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
        throw new Error("Erro ao conectar ao MongoDB");
    }
}
