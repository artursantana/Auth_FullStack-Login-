import User from '@/models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/db';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('artur')
    try {
        const { name, email, password } = await req.json();

        await connect();

        const emailExists = await User.findOne({ email });
        

        if (emailExists) {
            return NextResponse.json(
                {
                    message: 'Erro: E-mail já Existe!',
                    status: 409},
            { status: 409 }
                
            );
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        return NextResponse.json(
            {
                message: 'Criado com Sucesso!',
                status: 201,
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: 'Erro ao criar usuário',
                status: 500
            },
            { status: 500 }
        );
    }
}
