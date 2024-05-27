import React, { useState } from 'react';
import { Rappel } from '@/app/(dashboard)/superviseur/columns';

interface EditRappelModalProps {
  rappel: Rappel;
  onSave: (updatedRappel: RappelFlag) => void;
  onClose: () => void;
}

type RappelFlag = {
  ID: number;
  Début: string;
  Fin: string;
  Impact: string;
  Type_intervention: string;
  Nom_de_contact: string;
  Cause: string;
  Reccurence: string;
  Etat_post_intervention: string;
  Etat_pré_intervention: string;
  Autre_Role_du_contact: string;
  Role_du_contact: string;
  Catégorie: string;
  Tag_Equipment: string;
  Personne_de_garde: string;
  Deviation: string;
  Deviation_notification: string;
  Début_du_support: string;
  Fin_du_support: string;
  Nom_du_support: string;
};

const EditRappelModal: React.FC<EditRappelModalProps> = ({ rappel, onSave, onClose }) => {
  const [editedRappel, setEditedRappel] = useState<RappelFlag>({
    ID: rappel.Id_rappel,
    Début: rappel.startAt,
    Fin: rappel.endAt,
    Impact: typeof rappel.impact === 'object' && rappel.impact !== null ? (rappel.impact as { impactName: string }).impactName : '',
    Type_intervention: rappel.interventionTypeName,
    Nom_de_contact: rappel.diffusion,
    Cause: rappel.cause,
    Reccurence: rappel.reccurence,
    Etat_post_intervention: rappel.postInterState,
    Etat_pré_intervention: rappel.preInterState,
    Autre_Role_du_contact: rappel.contactRoleName,
    Role_du_contact: rappel.subRoleName,
    Catégorie: rappel.categoryName,
    Tag_Equipment: typeof rappel.equipment === 'object' && rappel.equipment !== null ? (rappel.equipment as { tag: string }).tag : '',
    Personne_de_garde: typeof rappel.guardPerson === 'object' && rappel.guardPerson !== null ? (rappel.guardPerson as { name: string }).name : '',
    Deviation: typeof rappel.deviation === 'object' && rappel.deviation !== null ? (rappel.deviation as { deviationName: string }).deviationName : '',
    Deviation_notification: typeof rappel.deviation === 'object' && rappel.deviation !== null ? (rappel.deviation as { deviationNotification: string }).deviationNotification : '',
    Début_du_support: typeof rappel.interventionPerson === 'object' && rappel.interventionPerson !== null ? (rappel.interventionPerson as { startAt: string }).startAt : '',
    Fin_du_support: typeof rappel.interventionPerson === 'object' && rappel.interventionPerson !== null ? (rappel.interventionPerson as { endAt: string }).endAt : '',
    Nom_du_support: typeof rappel.interventionPersonName === 'object' && rappel.interventionPersonName !== null ? (rappel.interventionPersonName as { name: string }).name : '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedRappel(prevRappel => ({
      ...prevRappel,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedRappel);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg mt-8 p-6 shadow-lg max-w-3xl max-h-2xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-orange-300 font-semibold">Edit Rappel</h2>
          <button onClick={onClose} className="text-orange-600 hover:text-gray-800">&times;</button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(editedRappel).map(([key, value]) => (
            <div key={key} className="flex flex-col mb-3">
              <label className="block">
                {key}:
                <input
                  type="text"
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleSave} className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600 mr-2">Save</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditRappelModal;
