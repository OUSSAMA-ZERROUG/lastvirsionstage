import { NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { z } from 'zod';

const userSchema = z.object({
  tag: z.string().optional(),
  site: z.string().optional(),
  building: z.string().optional(),
  family: z.string().optional(),
  subfamily: z.string().optional(),
  description: z.string().optional(),
  plantSection: z.string().optional(),
  functionalLocation: z.string().optional(),
  costCenter: z.string().optional(),
})



export const GET = async () => {
  try {
    // Récupérer tous les enregistrements de la table rappel
    const equipments = await prisma.equipment.findMany();


    // Retourner les données récupérées
    return NextResponse.json({ data: equipments }, { status: 200 });

  } catch (error) {
    console.error("Une erreur est survenue :", error);
    // En cas d'erreur, retourner un message d'erreur avec un statut 500
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
};



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tag, site, building, family, subfamily, description, plantSection, functionalLocation, costCenter } = userSchema.parse(body);

    const createdEquipment = await prisma.equipment.create({
      data: {
        tag,
        site,
        building,
        family,
        subfamily,
        description,
        plantSection,
        functionalLocation,
        costCenter,
      }
    });

    return NextResponse.json({ message: "Equipment created successfully" }, { status: 201 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
