import React, { useState } from 'react';
import { Equipment } from '@/app/(dashboard)/superAdmin/equipmentColumns';

interface EditEquipmentModalProps {
  equipment: Equipment;
  onSave: (updatedEquipment: Equipment) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditEquipmentModalProps> = ({ equipment, onSave, onClose }) => {
  const [editedEquipment, setEditedEquipment] = useState<Equipment>({ ...equipment });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedEquipment(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedEquipment);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit Equipment</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
          Tag:
            <input type="tag" name="tag" value={editedEquipment.tag} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
          Description:
            <input type="description" name="description" value={editedEquipment.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
          Building:
            <input type="text" name="building" value={editedEquipment.building} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
          family:
            <input type="text" name="family" value={editedEquipment.family} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
          Subfamily:
            <input type="text" name="subfamily" value={editedEquipment.subfamily} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600">Save</button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
