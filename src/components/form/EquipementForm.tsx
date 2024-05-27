import React, { useState, useEffect } from 'react';
import TagInput from '@/components/ui/tagSAP'; // Importez le composant TagInput
import { Input } from "../ui/Input";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

// Définition du composant EquipmentForm
const EquipmentForm: React.FC<{ onTagSAPChange: (tag: string) => void }> = ({ onTagSAPChange }) => {
    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        tag_equipment: '',
        description: '',
        site: '',
        batiment: '',
        famille: '',
        sous_famille: '',
        plan_section: '',
        functional_location: '',
    });

    // État pour le chargement et les erreurs
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fonction pour récupérer les détails de l'équipement à partir du tag SAP
    const fetchEquipmentDetails = async (tag: string) => {
        try {
            setIsLoading(true);

            const response = await fetch(`http://localhost:3000/api/equipments/${tag}`);

            const data = await response.json();

            console.log('data is ', data);

            if (!response.ok) {
                throw new Error(data.message || 'Erreur lors de la récupération des détails de l\'équipement');
            }

            setFormData(prevState => ({
                ...prevState,
                tag_equipment: data.data.tag,
                description: data.data.description,
                site: data.data.site,
                batiment: data.data.building,
                famille: data.data.family,
                sous_famille: data.data.subfamily,
                plan_section: data.data.plantSection,
                functional_location: data.data.functionalLocation,
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des détails de l\'équipement:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction de rappel pour gérer le changement de tag SAP
    const handleTagChange = async (tag: string) => {
        // Réinitialiser l'état d'erreur avant de lancer la nouvelle requête
        setError('');
        await fetchEquipmentDetails(tag);
        // Appeler la fonction de rappel pour transmettre la nouvelle valeur du tag SAP à TechnicienForm
        onTagSAPChange(tag);
    };

    useEffect(() => {
        // Ne rien faire lors du montage initial
    }, []);

    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                    <FormField
                        name="tag_equipment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment1">Tag SAP</FormLabel>
                                <TagInput onChange={handleTagChange} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment2">Description</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.description} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="site"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment3">Site</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.site} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="batiment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment4">Batiment</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.batiment} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="famille"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment5">Famille</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.famille} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="sous_famille"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment6">Sous famille</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.sous_famille} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="plan_section"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment7">Plan section</FormLabel>
                                <Input className="w-full" placeholder="/" value={formData.plan_section} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        name="functional_location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="equipment8">Functional location</FormLabel>
                                <Input className="w-full" placeholder="/" value={
                                    formData.functional_location} disabled />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default EquipmentForm;
