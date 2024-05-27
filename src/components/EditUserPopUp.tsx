import React, { useState } from 'react';
import { User } from '@/app/(dashboard)/superAdmin/columns';

interface EditUserModalProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState<User>({ ...user });
  const [showGarde, setShowGarde] = useState<boolean>(editedUser.user_role === 'Technicien');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'user_role') {
      setShowGarde(value === 'Technicien');
    }
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Name:
            <input type="text" name="username" value={editedUser.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
            Email:
            <input type="email" name="user_email" value={editedUser.user_email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
            UserID:
            <input type="text" name="user_gsk_id" value={editedUser.user_gsk_id} onChange={handleChange} className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500" />
          </label>
          <label className="block mb-2">
            Role:
            <select
              name="user_role"
              value={editedUser.user_role}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
            >
              <option value="Technicien">Technicien</option>
              <option value="RE">RE</option>
              <option value="Superviseur">Superviseur</option>
              <option value="SuperAdmin">SuperAdmin</option>
              <option value="Admin">Admin</option>
            </select>
          </label>
          {showGarde && (
            <label className="block mb-2">
              Garde:
              <select
                name="garde"
                value={editedUser.garde}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
              >
                <option value="AMS Oceasoft">AMS Oceasoft</option>
                <option value="RIX">RIX</option>
                <option value="PLC/SCADA">PLC/SCADA</option>
                <option value="DCS">DCS</option>
              </select>
            </label>
          )}
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
