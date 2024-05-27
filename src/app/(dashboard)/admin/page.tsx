"use client"

import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/DataUsersTable';
import { columns, User } from './columns';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';


export default function page() {
  const [dataz, setDataz] = useState<User[]>([]); // Define dataz as an array of users
  const [showInputs, setShowInputs] = useState(false);
  const [newUserData, setNewUserData] = useState<Partial<User>>({}); // Define newUserData to store input values
 



  // Function to fetch users from the API
  async function getUsersFromAPI() {
    try {
      const res = await fetch('http://localhost:3000/api/users/');
      if (!res.ok) {
        throw new Error('Failed to fetch data from API');
      }
      const responseData = await res.json();
      setDataz(responseData.data); // Update data in state
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally, display an error message to the user
    }
  }

  // Initial call to fetch data on page load
  useEffect(() => {
    getUsersFromAPI();
  }, []);

  const handleAddUserClick = () => {
    setShowInputs(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setNewUserData({ ...newUserData, [field]: event.target.value });
  };

  const handleValidateUserClick = async () => {
    try {
      // Validate user input
      if (!newUserData.username || !newUserData.user_email || !newUserData.user_gsk_id || !newUserData.user_role ) {
        throw new Error('Please fill in all fields.');
      }

      // Call API to add user
      const res = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: newUserData.username,
          email: newUserData.user_email,
          UserID: newUserData.user_gsk_id,
          Password: newUserData.password,
          role: newUserData.user_role,
          garde: newUserData.garde,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add user.');
      }

      // Refresh data after adding user
      await getUsersFromAPI();

      // Reset input fields and hide inputs
      setNewUserData({});
      setShowInputs(false);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  








  return (
    <section className="py-24">
      <div className="container w-full bg-white">
        <h1 className="text-3xl font-bold">ALL USERS</h1>
        <div>
          {/* Button to add a user */}
          <div className="py-6">
            <Button
              variant="outline"
              onClick={handleAddUserClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
            >
              Add User
            </Button>
          </div>

          {/* Inputs to add a new user */}
          {showInputs && (
            <div className="flex flex-col py-6">
              <Input placeholder="Name" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'username')} />
              <Input placeholder="Email" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'user_email')} />
              <Input placeholder="Role" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'user_role')} />
              <Input placeholder="UserID" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'user_gsk_id')} />
              <Input placeholder="Password" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'password')} />
              <Input placeholder="Gard" className="max-w-xs mb-4" onChange={(e) => handleInputChange(e, 'garde')} />
              <div className="py-6">
                <Button
                  variant="outline"
                  onClick={handleValidateUserClick}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded"
                >
                  Validate User
                </Button>
              </div>
            </div>
          )}

        </div>
        <DataTable columns={columns} data={dataz} />
      </div>
    </section>
  );
}