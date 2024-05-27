"use client"

import React, { useEffect, useState } from 'react';
import { columns, Rappel } from './columns';
import { DataRappelTable } from '@/components/DataRappelTable';


export default function page() {
  const [dataz, setDataz] = useState<Rappel[]>([]); // Define dataz as an array of users
  
 



  // Function to fetch users from the API
  async function getRappelsFromAPI() {
    try {
      const res = await fetch('http://localhost:3000/api/rappels/');
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
    getRappelsFromAPI();
  }, []);





  return (
    <section className="py-24">
      <div className="container w-full bg-white">
        <h1 className="text-3xl font-bold">ALL Rappels</h1>
        <DataRappelTable columns={columns} data={dataz} />
      </div>
    </section>
  );
}