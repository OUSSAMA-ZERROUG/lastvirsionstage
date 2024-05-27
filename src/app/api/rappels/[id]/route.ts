import { NextResponse } from 'next/server';
import prisma from "@/lib/db";
import { NextApiRequest } from 'next';
import * as z from 'zod';



const rappelSchema = z.object({
  startAt: z.string(),
  endAt: z.string(),
  diffusion: z.string(),
  contactInformation: z.string(),
  notification: z.string(),
  details: z.string(),
  reccurence: z.boolean(),
  cause: z.string(),
  postInterState: z.string(),
  preInterState: z.string(),
  interventionTypeName: z.string(),
  contactRoleName: z.string(),
  subRoleName: z.string(),
  categoryName: z.string(),
  Id_guardPerson: z.number(),
  Id_equipment: z.number(),
});



export const GET = async (req: NextApiRequest) => {
  try {
    // Récupérer l'ID du rappel depuis la requête
    const id = req.url?.split("rappels/")[1];

    // Si l'ID n'est pas valide, retourner une erreur 400
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: "ID de rappel n'est pas valide" }, { status: 400 });
    }

    // Récupérer le rappel depuis la base de données
    const rappel = await prisma.rappel.findUnique({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    // Si le rappel n'existe pas, retourner une erreur 404
    if (!rappel) {
      return NextResponse.json({ message: "Rappel non trouvé" }, { status: 404 });
    }

    // Retourner le rappel au format JSON
    return NextResponse.json({ data: rappel }, { status: 200 });
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
      startAt,
      endAt,
      diffusion,
      contactInformation,
      notification,
      details,
      reccurence,
      cause,
      postInterState,
      preInterState,
      interventionTypeName,
      contactRoleName,
      subRoleName,
      categoryName,
      Id_guardPerson,
      Id_equipment,
    } = rappelSchema.parse(jsonData);

    const id = req.url?.split('rappels/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid rappel ID' }, { status: 400 });
    }

    const selectedRappel = await prisma.rappel.findUnique({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    if (!selectedRappel) {
      throw new Error('Rappel not found');
    }

    const updatedRappel = await prisma.rappel.update({
      where: {
        Id_rappel: parseInt(id),
      },
      data: {
        startAt,
        endAt,
        diffusion,
        contactInformation,
        notification,
        details,
        reccurence,
        cause,
        postInterState,
        preInterState,
        interventionTypeName,
        contactRoleName,
        subRoleName,
        categoryName,
        Id_guardPerson,
        Id_equipment,
      },
    });
    return NextResponse.json({ message: "Rappel successfully updated" }, { status: 200 });
  } catch (error) {
    console.error('Error updating rappel:', error);
    return NextResponse.json({ message: 'Error updating rappel' }, { status: 500 });
  }
};



export const DELETE = async (req: Request) => {
  try {
    const id = req.url?.split('rappels/')[1];

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ message: 'Invalid rappel ID' }, { status: 400 });
    }

    // Supprimer les entrées liées dans la table `interventionPerson`
    await prisma.interventionPerson.deleteMany({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    // Supprimer les entrées liées dans la table `impact`
    await prisma.impact.deleteMany({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    // Supprimer les entrées liées dans la table `deviation`
    await prisma.deviation.deleteMany({
      where: {
        Id_rappel: parseInt(id),
      },
    });


    // Supprimer les entrées liées dans la table `have_actions`
    await prisma.have_actions.deleteMany({
      where: {
        Id_rappel: parseInt(id),
      },
    });
    // Supprimer les enregistrements liés dans la table `lmra`
    await prisma.lmra.deleteMany({
      where: {
        Id_rappel: parseInt(id),
      },
    });


    // Supprimer le rappel lui-même
    const deletedRappel = await prisma.rappel.delete({
      where: {
        Id_rappel: parseInt(id),
      },
    });

    if (!deletedRappel) {
      return NextResponse.json({ message: 'Rappel not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Rappel deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting rappel:', error);
    return NextResponse.json({ message: 'Error deleting rappel' }, { status: 500 });
  }
};
