import z from 'zod';

export const FormSchema = z.object({
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
   // lmra: typeof window === 'undefined' ? z.any() : z.instanceof(FileList).refine((file) => file?.length == 1, 'File is required.'),
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
    ticketL3Notification : z.string().optional(),
    EMNotification : z.string().optional(),
    deviation : z.string().optional(),

});
