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
import DesplayRappelModal from '@/components/DesplayRappelPopUp';
import EditRappelModal from '@/components/EditRappelPopUp';

// Fonction pour supprimer un utilisateur
const handleRappelDelete = async (rappelId: number) => {
  console.log("Rappel id is", rappelId)
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this Rappel?");
    if (confirmDelete) {
      await fetch(`http://localhost:3000/api/rappels/${rappelId}`, {
        method: "DELETE",
      });
      // Mettre à jour l'affichage ou afficher un message de succès
    }
  } catch (error) {
    console.error("Failed to delete Rappel:", error);
  }
};

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
  site: string
  building : string
  name1: string
  name: string
  deviationName: string
  deviationNotification: string
  impactName: string
  startAtP: string,
  endAtP: string,
}

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
    accessorKey: "equipment.building",
    header: "Site Equipment",
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
      const [editingRappel, setEditingRappel] = useState<Rappel | null>(null);

      const [desplyingRappel, setDesplayRappel] = useState<Rappel | null>(null);

      // Declare handleEditRappel to accept a rappel as an argument
      const handleEditRappel = (rappel: Rappel) => {
        setEditingRappel(rappel); // Set the rappel data when "Edit" is clicked
      };

      // Fonction pour annuler l'édition
      const cancelEdit = () => {
        setEditingRappel(null); // Close the edit popup
      };

      // Fonction pour enregistrer les modifications de l'utilisateur
      const saveEdit = async (updatedRappel: Rappel) => {
        try {
          // Envoie les données modifiées à l'API
          const response = await fetch(`http://localhost:3000/api/rappels/${updatedRappel.Id_rappel}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRappel),
          });
          if (!response.ok) {
            throw new Error("Failed to update rappel.");
          }

          // Mettre à jour l'affichage ou afficher un message de succès
          alert("rappel updated successfully!");
          // Par exemple, tu pourrais appeler une fonction de mise à jour de l'état global des utilisateurs

          // Afficher un message de succès ou actualiser la liste des utilisateurs
          console.log("rappel updated successfully!");
        } catch (error) {
          console.error("Failed to update rappel:", error);
        }
        setEditingRappel(null);
      };

      const handleDesplayRappel = (rappel: Rappel) => {
        setDesplayRappel(rappel);
      };

      const cancelDesplay = () => {
        setDesplayRappel(null);
      };

      return (
        <>
          {/* Affiche le popup de visualisation si nécessaire */}
          {desplyingRappel && (
            <DesplayRappelModal rappel={desplyingRappel} onClose={cancelDesplay} />
          )}
          {/* Affiche le popup d'édition si nécessaire */}
          {editingRappel && (
            <EditRappelModal
              rappel={editingRappel}
              onSave={saveEdit}
              onClose={cancelEdit}
            />
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
              <DropdownMenuItem onClick={() => handleRappelDelete(rappel.Id_rappel)}>Delete</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditRappel(rappel)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDesplayRappel(rappel)}>Voir</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
