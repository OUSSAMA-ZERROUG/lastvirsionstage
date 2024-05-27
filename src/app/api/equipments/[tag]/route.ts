import { NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { NextApiRequest } from 'next';
import * as z from 'zod';


const equipmentSchema = z.object({
  tag: z.string().optional(),
  site: z.string().optional(),
  building: z.string().optional(),
  family: z.string().optional(),
  subfamily: z.string().optional(),
  description: z.string().optional(),
  plantSection: z.string().optional(),
  functionalLocation: z.string().optional(),
  costCenter: z.string().optional(),
});



export const GET = async (req: NextApiRequest) => {
  try {
    // Récupérer l'ID du rappel depuis la requête
    const id = req.url?.split("equipments/")[1];

    // Si l'ID n'est pas valide, retourner une erreur 400
    if (!id) {
      return NextResponse.json({ message: "tag de equipment n'est pas valide" }, { status: 400 });
    }

    // Récupérer le rappel depuis la base de données
    const equipment = await prisma.equipment.findFirst({
      where: {
        tag: (id),
      },
    });

    // Si le rappel n'existe pas, retourner une erreur 404
    if (!equipment) {
      return NextResponse.json({ message: "equipment non trouvé" }, { status: 404 });
    }

    // Retourner le rappel au format JSON
    return NextResponse.json({ data: equipment }, { status: 200 });
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    // Si une erreur inattendue se produit, retourner une erreur 500
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
};

export const PUT = async (req: Request) => {
  try {

    const jsonData = await req.json();

    const {
      tag,
      site,
      building,
      family,
      subfamily,
      description,
      plantSection,
      functionalLocation,
      costCenter,
    } = equipmentSchema.parse(jsonData);

    const id = req.url?.split('equipments/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid Equipment ID' }, { status: 400 });
    }

    const selectedequipment = await prisma.equipment.findUnique({
      where: {
        Id_equipment: parseInt(id),
      },
    });

    if (!selectedequipment) {
      throw new Error('Equipment not found');
    }

    const updatedEquipment = await prisma.equipment.update({
      where: {
        Id_equipment: parseInt(id),
      },
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
      },
    });
    return NextResponse.json({ message: "equipment successfully updated" }, { status: 200 });
  } catch (error) {
    console.error('Error updating rappel:', error);
    return NextResponse.json({ message: 'Error updating equipment' }, { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    const id = req.url?.split('equipments/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid equipment ID' }, { status: 400 });
    }

    const deletedEquipment = await prisma.equipment.delete({
      where: {
        Id_equipment: parseInt(id),
      },
    });

    if (!deletedEquipment) {
      return NextResponse.json({ message: 'equipment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'equipment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting equipment:', error);
    return NextResponse.json({ message: 'Error deleting equipment' }, { status: 500 });
  }
};

