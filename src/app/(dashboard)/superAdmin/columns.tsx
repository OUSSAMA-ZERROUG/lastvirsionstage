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
import EditUserModal from "@/components/EditUserPopUp"; // Importe le composant EditUserModal

// Fonction pour supprimer un utilisateur
const handleDeleteUser = async (userId: number) => {
  console.log("user id is", userId)
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
      });
      // Mettre à jour l'affichage ou afficher un message de succès
    }
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

// Interface décrivant la structure d'un utilisateur
export type User = {
  Id_rappel: number
  username: string
  user_role: string
  user_email: string
  user_gsk_id: string
  password: string
  garde: string
}

// Tableau de colonnes pour afficher les données des utilisateurs
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Name",
  },
  {
    accessorKey: "user_email",
    header: "Email",
  },
  {
    accessorKey: "user_gsk_id",
    header: "UserID",
  },
  {
    accessorKey: "user_role",
    header: "Role",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      // Déclare un état local pour stocker les données de l'utilisateur à éditer
      const [editingUser, setEditingUser] = useState<User | null>(null);

      // Fonction pour mettre à jour l'état de l'utilisateur en cours d'édition
      const handleEditUser = (user: User) => {
        setEditingUser(user);
      };

      // Fonction pour annuler l'édition
      const cancelEdit = () => {
        setEditingUser(null);
      };

     





// Fonction pour enregistrer les modifications de l'utilisateur
const saveEdit = async (updatedUser: User) => {
  try {
    // Envoie les données modifiées à l'API
    const response = await fetch(`http://localhost:3000/api/users/${updatedUser.Id_rappel}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    if (!response.ok) {
      throw new Error("Failed to update user.");
    }

    // Mettre à jour l'affichage ou afficher un message de succès
    alert("User updated successfully!");
    // Par exemple, tu pourrais appeler une fonction de mise à jour de l'état global des utilisateurs
  
    // Afficher un message de succès ou actualiser la liste des utilisateurs
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Failed to update user:", error);
  }
  setEditingUser(null);
};


      return (
        <>
          {/* Affiche le popup d'édition si un utilisateur est en cours d'édition */}
          {editingUser && (
            <EditUserModal user={editingUser} onSave={saveEdit} onClose={cancelEdit} />
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
              <DropdownMenuItem onClick={() => handleDeleteUser(user.Id_rappel)}>Delete</DropdownMenuItem>
              {/* Option d'édition */}
              <DropdownMenuItem onClick={() => handleEditUser(user)}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )
    },
  },
];
