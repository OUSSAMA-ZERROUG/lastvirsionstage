import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Person {
  id: number;
  name: string;
  garde: string;
 
}

const UserGarde = () => {
  const { data: session } = useSession();


  const [userGarde, setUserGarde] = useState<string>("");


  const [persons, setPersons] = useState<Person[]>([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/personnes");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
       

        // Extract names and garde of persons
        const personsData: Person[] = data.data.map((person: Person) => ({
          id: person.id,
          name: person.name,
          garde: person.garde,
        }));
   

        setPersons(personsData);

        // Find user's garde
        const userPerson = personsData.find(
          (person) => person.name === session?.user.name
        );
     

        if (userPerson) {
          setUserGarde(userPerson.garde);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle fetching errors (e.g., display an error message)
      }
    };

    fetchData();
  }, [session]);



  return (
    <div>
      <p className="text-orange-300 text-sm">{userGarde}</p>
    </div>
  );
};

export default UserGarde;
