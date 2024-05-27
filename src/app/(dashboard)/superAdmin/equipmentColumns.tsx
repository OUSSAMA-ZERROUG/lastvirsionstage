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
import EditUserModal from "@/components/EditEquippmentPopUp"; // Importe le composant EditUserModal

// Fonction pour supprimer un utilisateur
const handleDeleteEquipment = async (EquipmentId: number) => {
  console.log("Equipment id is", EquipmentId)
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this Equipment?");
    if (confirmDelete) {
      await fetch(`http://localhost:3000/api/equipments/${EquipmentId}`, {
        method: "DELETE",
      });
      // Mettre à jour l'affichage ou afficher un message de succès
    }
  } catch (error) {
    console.error("Failed to delete Equipment:", error);
  }
};

// Interface décrivant la structure d'un utilisateur
export type Equipment = {
  Id_equipment: number;
  tag: string
  site: string
  building: string
  family: string
  subfamily: string
  description: string
  plantSection: string
  functionalLocation: string
  costCenter: string
}

// Tableau de colonnes pour afficher les données des utilisateurs
export const equipmentColumns: ColumnDef<Equipment>[] = [
  {
    accessorKey: "tag",
    header: "Tag",
  },
  {
    accessorKey: "site",
    header: "site",
  },
  {
    accessorKey: "building",
    header: "building",
  },
  {
    accessorKey: "family",
    header: "family",
  },
  {
    accessorKey: "subfamily",
    header: "subfamily",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "plantSection",
    header: "plantSection",
  },
  {
    accessorKey: "functionalLocation",
    header: "functionalLocation",
  },
  {
    accessorKey: "costCenter",
    header: "costCenter",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const equipment  = row.original

      // Déclare un état local pour stocker les données de l'Equipment à éditer
      const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);

      // Fonction pour mettre à jour l'état de l'Equipment en cours d'édition
      const handleEditEquipment = (equipment: Equipment) => {
        setEditingEquipment(equipment);
      };

      // Fonction pour annuler l'édition
      const cancelEdit = () => {
        setEditingEquipment(null);
      };

     





// Fonction pour enregistrer les modifications de l'utilisateur
const saveEdit = async (updatedEquipment: Equipment) => {
  try {
    // Envoie les données modifiées à l'API
    const response = await fetch(`http://localhost:3000/api/users/${updatedEquipment.Id_equipment}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedEquipment),
    });
    if (!response.ok) {
      throw new Error("Failed to update Equipment.");
    }

    // Mettre à jour l'affichage ou afficher un message de succès
    alert("Equipment updated successfully!");
    // Par exemple, tu pourrais appeler une fonction de mise à jour de l'état global des utilisateurs
  
    // Afficher un message de succès ou actualiser la liste des utilisateurs
    console.log("Equipment updated successfully!");
  } catch (error) {
    console.error("Failed to update Equipment:", error);
  }
  setEditingEquipment(null);
};


      return (
        <>
          {/* Affiche le popup d'édition si un utilisateur est en cours d'édition */}
          {editingEquipment && (
            <EditUserModal equipment={editingEquipment} onSave={saveEdit} onClose={cancelEdit} />
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
              {/* Option de suppression */}
              <DropdownMenuItem onClick={() => handleDeleteEquipment(equipment.Id_equipment)}>Delete</DropdownMenuItem>
              {/* Option d'édition */}
              <DropdownMenuItem onClick={() => handleEditEquipment(equipment)}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
];
