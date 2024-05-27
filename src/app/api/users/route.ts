import { NextResponse } from 'next/server';
import prisma from "@/lib/db";


export const GET = async () => {
    try {
      // Récupérer tous les enregistrements de la table rappel
      const users = await prisma.users.findMany();
  
  
      // Retourner les données récupérées
      return NextResponse.json({ data: users }, { status: 200 });
  
    } catch (error) {
      console.error("Une erreur est survenue :", error);
      // En cas d'erreur, retourner un message d'erreur avec un statut 500
      return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
  };



