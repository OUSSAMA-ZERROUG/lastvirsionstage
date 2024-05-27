"use client";
import React, { useState } from 'react';
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditRappelModal from '@/components/DesplayRappelPopUp';



// Interface décrivant la structure d'un utilisateur
export type Rappel = {
  Id_rappel: number
  startAt: string
  endAt: string
  diffusion: string
  contactInformation: string
  notification: string
  details: string
  reccurence: string
  cause: string
  postInterState: string
  preInterState: string
  interventionTypeName: string
  contactRoleName: string
  subRoleName: string
  categoryName: string
  Id_equipment: number
  tag: string
  name1: string
  name: string
  deviationName: string
  deviationNotification: string
  impactName: string
  startAtP: string,
  endAtP: string,
  action_prise : string,
  Action_a_mouné : string,
  // Add an index signature to allow dynamic keys
  [key: string]: number | string;
};

// Tableau de colonnes pour afficher les données des utilisateurs
export const columns: ColumnDef<Rappel>[] = [
  {
    accessorKey: "Id_rappel",
    header: "ID",
  }, {
    accessorKey: "startAt",
    header: "Début",
  },
  {
    accessorKey: "endAt",
    header: "Fin",
  },
  {
    accessorKey: "interventionTypeName",
    header: "Type intervention",
  },
  {
    accessorKey: "diffusion",
    header: "Nom de contact",
  },
  {
    accessorKey: "cause",
    header: "Cause",
  },
  {
    accessorKey: "reccurence",
    header: "Reccurence",
  },
  {
    accessorKey: "postInterState",
    header: "Etat post-intervention",
  },
  {
    accessorKey: "preInterState",
    header: "Etat pré-intervention",
  },
  {
    accessorKey: "contactRoleName",
    header: "Autre Role du contact",
  },
  {
    accessorKey: "subRoleName",
    header: "Role du contact",
  },
  {
    accessorKey: "categoryName",
    header: "Catégorie",
  },
  {
    accessorKey: "equipment.tag",
    header: "Tag Equipment",
  },
  {
    accessorKey: "guardPerson.name",
    header: "Personne de garde",
  },
  {
    accessorKey: "deviation.deviationName",
    header: "Deviation",
  },
  {
    accessorKey: "deviation.deviationNotification",
    header: "Deviation notification",
  },
  {
    accessorKey: "impact.impactName",
    header: "Impact",
  },
  {
    accessorKey: "interventionPerson.startAt",
    header: "Début du support",
  },
  {
    accessorKey: "interventionPerson.endAt",
    header: "Fin du support",
  },
  {
    accessorKey: "interventionPersonName.name",
    header: "Nom du support",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rappel = row.original

      // Déclare un état local pour stocker les données de l'utilisateur à éditer
      const [desplyingRappel, setDesplayRappel] = useState<Rappel | null>(null);

  
      const handleDesplayRappel = (rappel: Rappel) => {
        setDesplayRappel(rappel);
      };

      // Fonction pour annuler desplay
      const cancelDesplay = () => {
        setDesplayRappel(null);
      };

      return (
        <>
          {/* Affiche le popup d'édition si un utilisateur est en cours d'édition */}
          {desplyingRappel && (
            <EditRappelModal rappel={desplyingRappel} onClose={cancelDesplay} />
          )}

          {/* Menu déroulant avec options d'édition et de suppression */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleDesplayRappel(rappel)}>Voir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
];
