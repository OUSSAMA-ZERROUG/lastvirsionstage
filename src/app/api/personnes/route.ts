import { NextResponse } from 'next/server';
import prisma from "@/lib/db";


export const GET = async () => {
    try {
      // Récupérer tous les enregistrements de la table rappel
      const personnes = await prisma.person.findMany();
  
  
      // Retourner les données récupérées
      return NextResponse.json({ data: personnes }, { status: 200 });
  
    } catch (error) {
      console.error("Une erreur est survenue :", error);
      // En cas d'erreur, retourner un message d'erreur avec un statut 500
      return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
  };




  export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, Password, fullName, role, UserID,garde } = userSchema.parse(body);

        const existingUserByUserID = await prisma.users.findUnique({
            where: { user_gsk_id: UserID }
        });

        if (existingUserByUserID) {
            return NextResponse.json({ users: null, message: "User with this userID already exists" }, { status: 409 });
        }

        const existingPersonByUserID = await prisma.person.findUnique({
            where: { userID: UserID }
        });

        if (existingPersonByUserID) {
            return NextResponse.json({ users: null, message: "Person with this userID already exists" }, { status: 409 });
        }

        const createdPerson = await prisma.person.create({
            data: {
                userID: UserID,
                name: fullName,
                garde : garde,
            }
        });

        const id_person = createdPerson.Id_person;

        const hashedPassword = await hash(Password, 10);

        const newUser = await prisma.users.create({
            data: {
                user_gsk_id: UserID,
                user_email: email,
                hash: hashedPassword,
                username: fullName,
                user_role: role,
                person: { connect: { Id_person: id_person } }
            }
        });

        const { hash: newUserPassword, ...rest } = newUser;

        return NextResponse.json({ users: rest, message: "User Created Successfully" }, { status: 201 });
    } catch (error) {
        console.error("An error occurred:", error);
        return NextResponse.json({ users: null, message: "Internal Server Error" }, { status: 500 });
    }
}
