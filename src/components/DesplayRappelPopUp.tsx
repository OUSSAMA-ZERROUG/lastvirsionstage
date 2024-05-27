import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip'; // Assuming Tooltip component is in the same directory
import { Rappel } from '@/app/(dashboard)/superviseur/columns';

interface DesplayRappelModalProps {
  rappel: Rappel;
  label: string;
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
  Details: string;
  Action_prise: string;
  Action_a_mouné: string;
};

const DesplayRappelModal: React.FC<DesplayRappelModalProps> = ({ rappel, onClose }) => {
  const [desplayedRappel, setDesplayedRappel] = useState<RappelFlag | null>(null);
  const [tooltipContent, setTooltipContent] = useState<string>('');

  useEffect(() => {
    // Extract data from rappel and update state
    const extractedData: RappelFlag = {
      ID: rappel.Id_rappel,
      Début: rappel.startAt,
      Fin: rappel.endAt,
      Type_intervention: rappel.interventionTypeName,
      Nom_de_contact: rappel.diffusion,
      Role_du_contact: rappel.subRoleName,
      Nom_du_support: typeof rappel.interventionPersonName === 'object' && rappel.interventionPersonName !== null ? (rappel.interventionPersonName as { name: string }).name : '',
      Début_du_support: typeof rappel.interventionPerson === 'object' && rappel.interventionPerson !== null ? (rappel.interventionPerson as { startAt: string }).startAt : '',
      Fin_du_support: typeof rappel.interventionPerson === 'object' && rappel.interventionPerson !== null ? (rappel.interventionPerson as { endAt: string }).endAt : '',
      Impact: typeof rappel.impact === 'object' && rappel.impact !== null ? (rappel.impact as { impactName: string }).impactName : '',
      Deviation: typeof rappel.deviation === 'object' && rappel.deviation !== null ? (rappel.deviation as { deviationName: string }).deviationName : '',
      Deviation_notification: typeof rappel.deviation === 'object' && rappel.deviation !== null ? (rappel.deviation as { deviationNotification: string }).deviationNotification : '',
      Tag_Equipment: typeof rappel.equipment === 'object' && rappel.equipment !== null ? (rappel.equipment as { tag: string }).tag : '',
      Reccurence: rappel.reccurence,
      Cause: rappel.cause,
      Catégorie: rappel.categoryName,
      Autre_Role_du_contact: rappel.contactRoleName,
      Personne_de_garde: typeof rappel.guardPerson === 'object' && rappel.guardPerson !== null ? (rappel.guardPerson as { name: string }).name : '',
      Etat_pré_intervention: rappel.preInterState,
      Etat_post_intervention: rappel.postInterState,
      Action_prise: Array.isArray(rappel.action1) && rappel.action1.length > 0 ? rappel.action1[0].description : '',
      Action_a_mouné: Array.isArray(rappel.action2) && rappel.action2.length > 0 ? rappel.action2[0].description : '',
      Details: rappel.details,
    };
    setDesplayedRappel(extractedData);
  }, [rappel]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
   
  };

  const toggleTooltip = (content: string) => {
    setTooltipContent(content === tooltipContent ? '' : content);
  };

  if (!desplayedRappel) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60">
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 shadow-lg w-1/3 max-h-2xl overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg text-orange-300 font-semibold">Rappel Détails</h2>
            <button onClick={onClose} className="text-orange-600 hover:text-gray-800">&times;</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(desplayedRappel).map(([key, value]) => (
              <div key={key} className="flex flex-col mb-3">
                <label className="block">
                  {key}:
                  <div className="relative">
                    <input
                      readOnly
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500 cursor-pointer`} // Added cursor-pointer class
                      onClick={() => toggleTooltip(String(value))}
                    />
                    {/* Tooltip */}
                    {tooltipContent === value && (
                      <Tooltip content={value} label={key}/>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={onClose} className="bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-600">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesplayRappelModal;
