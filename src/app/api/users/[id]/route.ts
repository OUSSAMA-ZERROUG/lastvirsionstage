import { NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { NextApiRequest } from 'next';
import * as z from 'zod';



const userSchema = z.object({
  username: z.string().optional(),
  user_email: z.string().optional(),
  user_role: z.string().optional(),
  user_gsk_id: z.string().optional(),
});



export const PUT = async (req: Request) => {
  try {
  
    const jsonData = await req.json();

    const {
      username,
      user_email,
      user_role,
      user_gsk_id,
    } = userSchema.parse(jsonData);

    const id = req.url?.split('users/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid User ID' }, { status: 400 });
    }

    const selectedUser = await prisma.users.findUnique({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    if (!selectedUser) {
      throw new Error('User not found');
    }

    const updatedUser = await prisma.users.update({
      where: {
        Id_rappel: parseInt(id),
      },
      data: {
        username,
        user_gsk_id,
        user_email,
        user_role,
      },
    });
    return NextResponse.json({ message: "User successfully updated" }, { status: 200 });
  } catch (error) {
    console.error('Error updating rappel:', error);
    return NextResponse.json({ message: 'Error updating rappel' }, { status: 500 });
  }
};


export const DELETE = async (req: Request) => {
  try {
    const id = req.url?.split('users/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid rappel ID' }, { status: 400 });
    }

    const deletedUser = await prisma.users.delete({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
};


export const GET = async (req: NextApiRequest) => {
  try {
    // Récupérer l'ID du rappel depuis la requête
    const id = req.url?.split("users/")[1];

    // Si l'ID n'est pas valide, retourner une erreur 400
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: "ID de user n'est pas valide" }, { status: 400 });
    }

    // Récupérer le rappel depuis la base de données
    const userSelected = await prisma.users.findUnique({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    // Si le user n'existe pas, retourner une erreur 404
    if (!userSelected) {
      return NextResponse.json({ message: "user non trouvé" }, { status: 404 });
    }

    // Retourner le rappel au format JSON
    return NextResponse.json({ data: userSelected }, { status: 200 });
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    // Si une erreur inattendue se produit, retourner une erreur 500
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
};


