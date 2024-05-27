"use client";

import { useState } from 'react';
import TechnicienForm from "@/components/form/TechnicienForm";
import Superviseure from "@/app/(dashboard)/superviseur/page";

const Page = () => {
    const [showCreateRappel, setShowCreateRappel] = useState(true); // Initialiser à true pour afficher par défaut

    const handleCreateRappelClick = () => {
        // Afficher le composant TechnicienForm lors du clic sur "Create New Rappel"
        setShowCreateRappel(true);
    };

    const handleAllRappelsClick = () => {
        // Afficher le composant Superviseure lors du clic sur "All Rappels"
        setShowCreateRappel(false);
    };

    return (
        <div>
            {/* Barre de navigation */}
            <nav className="fixed top-24 left-0 right-0 bg-orange-800 bg-opacity-50 p-4 ">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-lg font-semibold">Technicien Dashboard</div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                                onClick={handleCreateRappelClick}
                            >
                                Create New Rappel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
                                onClick={handleAllRappelsClick}
                            >
                                All Rappels
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenu de la page */}
            <div className="p-4 mt-40">
                {/* Affichage conditionnel du composant en fonction du bouton cliqué */}
                {showCreateRappel ? <TechnicienForm /> : <Superviseure />}
            </div>
        </div>
    );
};

export default Page;
