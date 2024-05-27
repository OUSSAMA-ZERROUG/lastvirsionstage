import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as z from 'zod';
import sendEmail from '@/lib/mailService'
const prisma = new PrismaClient();

const FormSchema = z.object({
  rappel_startAt: z.date(),
  rappel_endAt: z.date(),
  personne_de_support_name_1: z.string().optional(),
  startAt_interventionPerson: z.date().optional(),
  endAt_interventionPerson: z.date().optional(),
  personne_de_support_name_2: z.string().optional(),
  endAt_interventionPerson_2: z.date().optional(),
  startAt_interventionPerson_2: z.date().optional(),
  personne_de_support_name_3: z.string().optional(),
  endAt_interventionPerson_3: z.date().optional(),
  startAt_interventionPerson_3: z.date().optional(),
  personne_de_support_name_4: z.string().optional(),
  endAt_interventionPerson_4: z.date().optional(),
  startAt_interventionPerson_4: z.date().optional(),
  Type_intervention: z.string(),
  categorie: z.string(),
  nom_de_contact: z.string(),
  role_du_contact: z.string(),
  role_contact_autre: z.string(),
  details: z.string(),
  lmra: z.object({
    name: z.string().refine((name) => name.endsWith('.pdf'), {
      message: 'LMRA file must be a PDF',
    }),
  }),
  rappel_récurrent: z.string(),
  cause: z.string(),
  preInterState: z.string(),
  impacts: z.string().optional(),
  action_prise: z.string(),
  Action_a_mouné: z.string(),
  postInterState: z.string(),
  tag_equipment: z.string(),
  Id_guardPerson: z.string(),
  deviation: z.string(),
  ticketL3Notification: z.string().optional(),
  EMNotification: z.string().optional(),

});

// Handler de la requête POST
export const POST = async (req: Request) => {
  try {
    // Validation du corps de la requête avec le schéma
    const body = await req.json();

    // Parse date strings into Date objects
    body.rappel_startAt = new Date(body.rappel_startAt);
    body.rappel_endAt = new Date(body.rappel_endAt);


    if (body.startAt_interventionPerson) {
      body.startAt_interventionPerson = new Date(body.startAt_interventionPerson);
    }
    if (body.endAt_interventionPerson) {
      body.endAt_interventionPerson = new Date(body.endAt_interventionPerson);
    }
    if (body.startAt_interventionPerson_2) {
      body.startAt_interventionPerson_2 = new Date(body.startAt_interventionPerson_2);
    }
    if (body.endAt_interventionPerson_2) {
      body.endAt_interventionPerson_2 = new Date(body.endAt_interventionPerson_2);
    }
    if (body.startAt_interventionPerson_3) {
      body.startAt_interventionPerson_3 = new Date(body.startAt_interventionPerson_3);
    }
    if (body.endAt_interventionPerson_3) {
      body.endAt_interventionPerson_3 = new Date(body.endAt_interventionPerson_3);
    }
    if (body.startAt_interventionPerson_4) {
      body.startAt_interventionPerson_4 = new Date(body.startAt_interventionPerson_4);
    }
    if (body.endAt_interventionPerson_4) {
      body.endAt_interventionPerson_4 = new Date(body.endAt_interventionPerson_4);
    }

    const formData = FormSchema.parse(body);

    console.log("Body:", body);

    // Création du rappel
    const createdRappel = await createRappel(formData);

    if (formData.personne_de_support_name_1) {
      // Récupération de l'ID de la première personne de support
      const personId1 = await bringPersonID(formData.personne_de_support_name_1);
      // Création de la première intervention
      await createIntervention(createdRappel.Id_rappel, formData.startAt_interventionPerson, formData.endAt_interventionPerson, personId1);
    }
    // Création de la deuxième intervention si un deuxième nom est fourni
    if (formData.personne_de_support_name_2) {
      const personId2 = await bringPersonID(formData.personne_de_support_name_2);
      await createIntervention(createdRappel.Id_rappel, formData.startAt_interventionPerson_2!, formData.endAt_interventionPerson_2!, personId2);
    }

    if (formData.personne_de_support_name_3) {
      const personId3 = await bringPersonID(formData.personne_de_support_name_3);
      await createIntervention(createdRappel.Id_rappel, formData.startAt_interventionPerson_3!, formData.endAt_interventionPerson_3!, personId3);
    }
    if (formData.personne_de_support_name_4) {
      const personId4 = await bringPersonID(formData.personne_de_support_name_4);
      await createIntervention(createdRappel.Id_rappel, formData.startAt_interventionPerson_4!, formData.endAt_interventionPerson_4!, personId4);
    }


    // Création des actions
    await createAction(formData.action_prise, createdRappel.Id_rappel, 'action prise');
    await createAction(formData.Action_a_mouné, createdRappel.Id_rappel, 'action a menee');

    // Création de l'impact
    if (formData.impacts) {
      await createImpact(formData.impacts, createdRappel.Id_rappel);
    }


    // Création de la déviation
    if (formData.deviation && formData.ticketL3Notification) {
      await createDeviation(createdRappel.Id_rappel, formData.deviation, formData.ticketL3Notification);
    }

    // if (createdRappel) {
    //   await sendEmail(formData.role_du_contact,formData.role_du_contact,formData.role_du_contact);
    // }

    // Réponse
    return NextResponse.json({ message: "Rappel successfully created" }, { status: 201 });



  } catch (error) {
    console.error("An error occurred:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", details: error.errors }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
};

// Crée un rappel dans la base de données
async function createRappel(formData: any) {
  try {
    const recurrence = convertReccurenceToBoolean(formData.rappel_récurrent);
    // Get equipment ID based on tag
    const equipmentId = await getEquipmentIdByTag(formData.tag_equipment);
    if (!equipmentId) {
      throw new Error('Equipment with the provided tag not found');
    }


    return await prisma.rappel.create({
      data: {
        startAt: formData.rappel_startAt,
        endAt: formData.rappel_endAt,
        diffusion: formData.nom_de_contact,
        details: formData.details,
        reccurence: recurrence,
        cause: formData.cause,
        postInterState: formData.postInterState,
        preInterState: formData.preInterState,
        interventionTypeName: formData.Type_intervention,
        contactRoleName: formData.role_contact_autre,
        subRoleName: formData.role_du_contact,
        categoryName: formData.categorie,
        equipment: { connect: { Id_equipment: equipmentId } },
        guardPerson: {
          connect: { Id_person: parseInt(formData.Id_guardPerson) },
        },


      },

    });

  } catch (error) {
    console.error('Error creating rappel:', error);
    throw error;
  }
}

// Crée une intervention dans la base de données
async function createIntervention(Id_rappel: number, startAt: Date, endAt: Date, personId: number) {
  await prisma.interventionPerson.create({
    data: {
      startAt: startAt,
      endAt: endAt,
      Id_person: personId,
      Id_rappel: Id_rappel,
    },
  });
}

// Crée une action dans la base de données
async function createAction(description: string, Id_rappel: number, actionTypeName: string) {
  const createdAction = await prisma.action.create({
    data: {
      description: description,
      actionTypeName: actionTypeName,
    },
  });

  if (createdAction) {
    await prisma.have_actions.create({
      data: {
        Id_rappel: Id_rappel,
        Id_action: createdAction.Id_action,
      },
    });
  }
}

// Crée un impact dans la base de données
async function createImpact(impactName: string, Id_rappel: number) {
  await prisma.impact.create({
    data: {
      impactName: impactName,
      Id_rappel: Id_rappel,
    },
  });
}

// Crée une déviation dans la base de données
async function createDeviation(Id_rappel: number, deviation: string, notification: string) {

  await prisma.deviation.create({
    data: {
      deviationName: deviation,
      deviationNotification: notification,
      Id_rappel: Id_rappel,
    },
  });

}

// Recherche l'ID d'une personne à partir de son nom
async function bringPersonID(personne_de_support_name: string) {
  try {
    const person = await prisma.person.findFirst({
      where: {
        name: personne_de_support_name,
      },
    });

    if (person) {
      return person
        .Id_person;
    } else {
      return -1;
    }
  } catch (error) {
    console.error('Error fetching person ID:', error);
    throw error;
  }
}

// Function to get equipment ID based on equipment tag
async function getEquipmentIdByTag(tag: string): Promise<number | null> {
  try {
    const equipment = await prisma.equipment.findFirst({
      where: {
        tag: tag,
      },
      select: {
        Id_equipment: true // Sélectionnez uniquement l'ID de l'équipement
      }
    });
    return equipment ? equipment.Id_equipment : null;

  } catch (error) {
    console.error('Error fetching equipment ID:', error);
    throw error;
  }
}
function convertReccurenceToBoolean(value: string | null): boolean | null {
  if (value === "1") {
    return true;
  } else if (value === "0") {
    return false;
  } else {
    return null;
  }
}

// Fonction pour créer une entrée LMRA dans la base de données
// Fonction pour créer une entrée LMRA dans la base de données
// Fonction pour créer une entrée LMRA dans la base de données
async function createLMRA(pdfData: any, pdfName: string, rappelId: number) {
  try {
    // Création de l'entrée LMRA
    const lmraEntry = await prisma.lmra.create({
      data: {
        // Champs LMRA
        q1: pdfData.q1 || false,
        q1_1: pdfData.q1_1 || false,
        q2: pdfData.q2 || false,
        q2_1: pdfData.q2_1 || false,
        q3: pdfData.q3 || false,
        q3_1: pdfData.q3_1 || false,
        q4: pdfData.q4 || false,
        q4_1: pdfData.q4_1 || false,
        q5: pdfData.q5 || false,
        q5_1: pdfData.q5_1 || false,
        q6: pdfData.q6 || false,
        q6_1: pdfData.q6_1 || false,
        q7: pdfData.q7 || false,
        q8: pdfData.q8 || false,
        q9: pdfData.q9 || false,
        // Autres champs
//
        // Si le mimetype est disponible, vous pouvez l'ajouter ici
   //     data: pdfData.data,
        // Lien avec le rappel correspondant
        rappel: {
          connect: {
            Id_rappel: rappelId,
          },
        },
      },
    });
    return lmraEntry;
  } catch (error) {
    console.error('Erreur lors de la création de l\'entrée LMRA :', error);
    throw error;
  }
}




















// Handler de la requête GET
export const GET = async () => {
  try {
    // Fetch rappels
    const rappels = await prisma.rappel.findMany();

    // Fetch related data for each rappel
    const dataWithRelations = await Promise.all(
      rappels.map(async (rappel) => {
        const equipment = await prisma.equipment.findFirst({
          where: {
            Id_equipment: rappel.Id_equipment
          },
          select: {
            tag: true,
            site: true,
            building: true,
          }
        });

        const guardPerson = await prisma.person.findFirst({
          where: {
            Id_person: rappel.Id_guardPerson
          },
          select: {
            name: true
          }
        });

        const deviation = await prisma.deviation.findFirst({
          where: {
            Id_rappel: rappel.Id_rappel
          },
          select: {
            deviationName: true,
            deviationNotification: true
          }
        });

        const impact = await prisma.impact.findFirst({
          where: {
            Id_rappel: rappel.Id_rappel
          },
          select: {
            impactName: true
          }
        });

        const interventionPerson = await prisma.interventionPerson.findFirst({
          where: {
            Id_rappel: rappel.Id_rappel
          },
          select: {
            Id_person: true,
            startAt: true,
            endAt: true,
          }
        });

        let interventionPersonName = null;
        if (interventionPerson) {
          const userId = interventionPerson.Id_person;
          interventionPersonName = await prisma.person.findUnique({
            where: {
              Id_person: userId
            },
            select: {
              name: true
            }
          });
        }

        const lmra = await prisma.lmra.findFirst({
          where: {
            Id_rappel: rappel.Id_rappel
          },
          select: {
            Id_lmra: true
          }
        });



        const RappelsWithActions = await prisma.have_actions.findMany({
          where: {
            Id_rappel: rappel.Id_rappel
          },
        });

        const actions = RappelsWithActions.map(item => item.Id_action);


        const action1 = await prisma.action.findMany({
          where: {
            Id_action: actions[0]
          },
          select: {
            description: true,
          }
        });

        const action2 = await prisma.action.findMany({
          where: {
            Id_action: actions[1]
          },
          select: {
            description: true,
          }
        });





        return {
          ...rappel,
          equipment,
          guardPerson,
          deviation,
          impact,
          interventionPerson,
          interventionPersonName,
          lmra,
          action1,
          action2,
        };
      })
    );

    return NextResponse.json({ data: dataWithRelations }, { status: 200 });
  } catch (error) {
    console.error("Une erreur est survenue :", error);
    return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
  }
};
