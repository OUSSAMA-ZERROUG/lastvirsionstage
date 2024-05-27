'use client';
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, Form, FormControl } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { DateTimePicker } from "./DateTimePicker";
import { ComboboxDemo } from "../ui/Combobox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react";
import EquipmentForm from "./EquipementForm";
import { useEffect, useState } from "react";
import { FormSchema } from '@/lib/formValidations';






const TechnicienForm = () => {



  const [tagSAP, setTagSAP] = useState<string>('');
  const handleTagSAPChange = (tag: string) => {
    setTagSAP(tag);
  };
  const [support1Clicked, setSupport1Clicked] = useState(false);
  const [support2Clicked, setSupport2Clicked] = useState(false);
  const [support3Clicked, setSupport3Clicked] = useState(false);
  const [support4Clicked, setSupport4Clicked] = useState(false);
  const handleSupport1Click = () => {
    setSupport1Clicked(true);
  };
  const handleSupport2Click = () => {
    setSupport2Clicked(true);
  };
  const handleSupport3Click = () => {
    setSupport3Clicked(true);
  };
  const handleSupport4Click = () => {
    setSupport4Clicked(false);
  };

  const { data: session } = useSession();
  const Id_guardPerson = session?.user.id;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });




  const fileRef = form.register("lmra");

  const [formData, setFormData] = useState<{ rappel_startAt?: Date }>(); // Default value

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    console.log("Saved data:", savedData);
    if (savedData) {
      setFormData(JSON.parse(savedData));
      // Set form values using form.setValue
      form.setValue('rappel_startAt', JSON.parse(savedData).rappel_startAt);
    }
  }, []);


  const handleSave = () => {
    const values = form.getValues();
    setFormData(values);
    localStorage.setItem('formData', JSON.stringify(values));
  };

  const [impactsClicked, setImpactsClicked] = useState(false);
  const [selectedDeviation, setSelectedDeviation] = useState('');
  const [emNotificationVisible, setEMNotificationVisible] = useState(false);
  const [l3NotificationVisible, setL3NotificationVisible] = useState(false);

  const handleDeviationClick = (selectedValue: string) => {
    setSelectedDeviation(selectedValue);
    // Réinitialiser la visibilité des notifications
    setEMNotificationVisible(false);
    setL3NotificationVisible(false);
    // Appeler la fonction pour définir la visibilité des notifications appropriée
    handleNotificationVisibility(selectedValue);
  };

  const handleImpactsClick = () => {
    setImpactsClicked(true);
  };

  // Fonctions pour gérer la visibilité des notifications
  const handleNotificationVisibility = (deviation: string) => {
    if (deviation === 'EM') {
      setEMNotificationVisible(true);
      setL3NotificationVisible(false);
    } else if (deviation === 'Ticket L3') {
      setEMNotificationVisible(false);
      setL3NotificationVisible(true);
    }
  };


  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    localStorage.clear();
    const response = await fetch('http://localhost:3000/api/rappels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Id_guardPerson,
        rappel_startAt: values.rappel_startAt,
        rappel_endAt: values.rappel_endAt,
        personne_de_support_name_1: values.personne_de_support_name_1,
        startAt_interventionPerson: values.startAt_interventionPerson,
        endAt_interventionPerson: values.endAt_interventionPerson,
        personne_de_support_name_2: values.personne_de_support_name_2,
        endAt_interventionPerson_2: values.startAt_interventionPerson_2,
        startAt_interventionPerson_2: values.startAt_interventionPerson_2,
        Type_intervention: values.Type_intervention,
        categorie: values.categorie,
        nom_de_contact: values.nom_de_contact,
        role_du_contact: values.role_du_contact,
        role_contact_autre: values.role_contact_autre,
        tag_equipment: tagSAP,
        details: values.details,
        lmra: values.lmra,
        rappel_récurrent: values.rappel_récurrent,
        cause: values.cause,
        preInterState: values.preInterState,
        impacts: values.impacts,
        action_prise: values.action_prise,
        Action_a_mouné: values.Action_a_mouné,
        postInterState: values.postInterState,
        personne_de_support_name_3: values.personne_de_support_name_3,
        endAt_interventionPerson_3: values.startAt_interventionPerson_3,
        startAt_interventionPerson_3: values.startAt_interventionPerson_3,
        personne_de_support_name_4: values.personne_de_support_name_4,
        endAt_interventionPerson_4: values.startAt_interventionPerson_4,
        startAt_interventionPerson_4: values.startAt_interventionPerson_4,
        ticketL3Notification: values.ticketL3Notification,
        EMNotification: values.EMNotification,
        deviation: values.deviation,

      }),

    });


    // Afficher les données dans la console
    console.log('Données envoyées dans la requête :', JSON.stringify({
      Id_guardPerson,
      rappel_startAt: values.rappel_startAt,
      rappel_endAt: values.rappel_endAt,
      personne_de_support_name_1: values.personne_de_support_name_1,
      startAt_interventionPerson: values.startAt_interventionPerson,
      endAt_interventionPerson: values.endAt_interventionPerson,
      personne_de_support_name_2: values.personne_de_support_name_2,
      endAt_interventionPerson_2: values.startAt_interventionPerson_2,
      startAt_interventionPerson_2: values.startAt_interventionPerson_2,
      Type_intervention: values.Type_intervention,
      categorie: values.categorie,
      nom_de_contact: values.nom_de_contact,
      role_du_contact: values.role_du_contact,
      role_contact_autre: values.role_contact_autre,
      tag_equipment: tagSAP,
      details: values.details,
      lmra: values.lmra,
      rappel_récurrent: values.rappel_récurrent,
      cause: values.cause,
      preInterState: values.preInterState,
      impacts: values.impacts,
      action_prise: values.action_prise,
      Action_a_mouné: values.Action_a_mouné,
      postInterState: values.postInterState,
      personne_de_support_name_3: values.personne_de_support_name_3,
      endAt_interventionPerson_3: values.startAt_interventionPerson_3,
      startAt_interventionPerson_3: values.startAt_interventionPerson_3,
      personne_de_support_name_4: values.personne_de_support_name_4,
      endAt_interventionPerson_4: values.startAt_interventionPerson_4,
      startAt_interventionPerson_4: values.startAt_interventionPerson_4,
      deviation: values.deviation,
      ticketL3Notification: values.ticketL3Notification,
      EMNotification: values.EMNotification,
    }));













    if (!response.ok) {
      console.error("Erreur lors de la récupération des données de l'API:", response.statusText);
      return;
    }
    alert("Rappel créé avec succès !");
    window.location.reload();
  };


  return (


    <Form {...form}>
      <div className="container mx-auto px-4 py-8 bg-white rounded shadow-md mt-26 mb-7">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className="text-xl mt-8 mb-5 font-bold text-orange-500 border-b border-orange-500">Personnel</h1>
          <div className="grid grid-cols-4 gap-4">
            {/* First line */}
            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="rappel_startAt"
                render={({ field }) => (
                  <FormItem>
                    <FormMessage />
                    <FormLabel className="mr-7" htmlFor="username">Début</FormLabel>
                    <DateTimePicker
                      date={formData?.rappel_startAt || new Date()}
                      setDate={field.onChange}
                    />
                    <p className=" text-green-700 font-bold ">Date sélectionnée : {formData?.rappel_startAt ? formData.rappel_startAt.toLocaleString() : 'Aucune date sélectionnée'}</p>

                  </FormItem>

                )}
              />
            </div>
            <div className="col-span-1"> {/* Second column */}
              {/* Empty */}
            </div>
            <div className="col-span-1"> {/* Third column */}
              <FormField
                control={form.control}
                name="rappel_endAt"
                render={({ field }) => (
                  <div>
                    <FormLabel htmlFor="username">Fin</FormLabel>
                    <FormItem>
                      <FormMessage />
                      <DateTimePicker
                        date={new Date()} // Pass the initial date value
                        setDate={field.onChange} // Pass the onChange function from react-hook-form
                      />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <div className="col-span-1"> {/* Fourth column */}
              {/* Empty */}
            </div>

            {/* Second line */}
            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="personne_de_support_name_1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="random1">Personne de support supplémentaire 1</FormLabel>
                    <div className="w-full">
                      <ComboboxDemo

                        value={field.value}
                        setValue={field.onChange}
                        onBlur={field.onBlur}
                        onClick={() => handleSupport1Click()}

                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1"> {/* Third column */}
              <FormField
                control={form.control}
                name="startAt_interventionPerson"
                render={({ field }) => (
                  <div>
                    <FormLabel htmlFor="username">Début</FormLabel>
                    <FormItem>
                      <FormMessage />
                      <DateTimePicker

                        date={new Date()} // Pass the initial date value
                        setDate={field.onChange} // Pass the onChange function from react-hook-form

                      />
                    </FormItem>
                  </div>
                )}
              />
            </div>

            <div className="col-span-1"> {/* Third column */}
              <FormField
                control={form.control}
                name="endAt_interventionPerson"
                render={({ field }) => (
                  <div>
                    <FormLabel htmlFor="username">Fin</FormLabel>
                    <FormItem>
                      <FormMessage />
                      <DateTimePicker

                        date={new Date()} // Pass the initial date value
                        setDate={field.onChange} // Pass the onChange function from react-hook-form
                      />
                    </FormItem>
                  </div>
                )}
              />
            </div>

            <div className="col-span-1"> {/* Fourth column */}
              {/* Empty */}
            </div>

            <div className="col-span-4"> {/* Third column */}
              {support1Clicked && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="personne_de_support_name_2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="random1">Personne de support supplémentaire 2</FormLabel>
                          <div className="w-full">
                            <ComboboxDemo
                              value={field.value}
                              setValue={field.onChange}
                              onBlur={field.onBlur}
                              onClick={() => handleSupport2Click()}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="startAt_interventionPerson_2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Début</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="endAt_interventionPerson_2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Fin</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>


            <div className="col-span-4"> {/* Third column */}
              {support2Clicked && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="personne_de_support_name_3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="random1">Personne de support supplémentaire 3</FormLabel>
                          <div className="w-full">
                            <ComboboxDemo
                              value={field.value}
                              setValue={field.onChange}
                              onBlur={field.onBlur}
                              onClick={() => handleSupport3Click()}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="startAt_interventionPerson_3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Début</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="endAt_interventionPerson_3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Fin</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>


            <div className="col-span-4"> {/* Third column */}
              {support3Clicked && (
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="personne_de_support_name_4"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="random1">Personne de support supplémentaire 4</FormLabel>
                          <div className="w-full">
                            <ComboboxDemo
                              value={field.value}
                              setValue={field.onChange}
                              onBlur={field.onBlur}
                              onClick={() => handleSupport4Click()}
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="startAt_interventionPerson_4"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Début</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormField
                      control={form.control}
                      name="endAt_interventionPerson_4"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="username">Fin</FormLabel>
                          <div className="w-full">
                            <DateTimePicker
                              date={new Date()} // Pass the initial date value
                              setDate={field.onChange} // Pass the onChange function from react-hook-form
                            />
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>




          <h1 className="text-xl mt-8 mb-5 font-bold text-orange-500 border-b border-orange-500">Intervention</h1>

          <div className="grid grid-cols-4 gap-4"> {/* Use grid for side-by-side layout */}
            {/* Fifth line */}


            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="Type_intervention"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'intervention</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sur Site">Sur Site</SelectItem>
                        <SelectItem value="VPN">VPN</SelectItem>
                        <SelectItem value="Télephone">Télephone</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="col-span-1"> {/* First column */}

            </div>



            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="categorie"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AMS Oceasoft">AMS Oceasoft</SelectItem>
                        <SelectItem value="Delta V">Delta V</SelectItem>
                        <SelectItem value="Electricité">Electricité</SelectItem>
                        <SelectItem value="HVAC/BMS/Flux">HVAC/BMS/Flux</SelectItem>
                        <SelectItem value="Instrumentation">Instrumentation</SelectItem>
                        <SelectItem value="IT/Server/DMG/PDW/PDM">IT/Server/DMG/PDW/PDM</SelectItem>
                        <SelectItem value="PEMS/EMS/Compteurs">PEMS/EMS/Compteurs</SelectItem>
                        <SelectItem value="PLC/HMI">PLC/HMI</SelectItem>
                        <SelectItem value="Supervision">Supervision</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Sixth line */}
            <div className="col-span-1"> {/* First column */}

            </div>


            <div className="col-span-1"> {/* Second column */}
              <FormField
                control={form.control}
                name="nom_de_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="intervention6">Nom de contact</FormLabel>
                    <Input className="w-full" placeholder="Enter Intervention 6" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>



            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="role_du_contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role du contact</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Gard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Maintenance locale">Maintenance locale</SelectItem>
                        <SelectItem value="CM Maintenance">CM Maintenance</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                        <SelectItem value="Surveillant">Surveillant</SelectItem>
                        <SelectItem value="Production">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="col-span-1"> {/* Second column */}
              <FormField
                control={form.control}
                name="role_contact_autre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="Autre">Autre</FormLabel>
                    <Input className="w-full" placeholder="Autre" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>


          </div>




          <h1 className="text-xl mt-8 mb-5 font-bold text-orange-500 border-b border-orange-500">Equipement</h1>
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4">
              <EquipmentForm onTagSAPChange={handleTagSAPChange} />
            </div>
          </div>
        
          <h1 className="text-xl mt-8 mb-5 font-bold text-orange-500 border-b border-orange-500">Diagnostic</h1>

          <div className="grid grid-cols-4 gap-4"> {/* Use grid for side-by-side layout */}
            {/* Ninth line */}
            <div className="col-span-3"> {/* First and second columns */}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="details"> Détails du diagnostic</FormLabel>
                    <Textarea className="w-full" placeholder="Enter Diagnostic 1-2" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="col-span-1"> {/* Third column */}
              <FormField
                control={form.control}
                name="lmra"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>LMRA</FormLabel>
                      <FormControl>
                        <Input type="file" placeholder="Upload your PDF" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

            </div>



            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="rappel_récurrent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rapel récurrent</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Type de Rappel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Oui</SelectItem>
                        <SelectItem value="0">Non</SelectItem>
                        <SelectItem value="NULL">Non défini</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="cause"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cause</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select la Cause" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Automation issue">Automation issue</SelectItem>
                        <SelectItem value="Equip. Hardware issue">Equip. Hardware issue</SelectItem>
                        <SelectItem value="Operator error/knowledge">Operator error/knowledge</SelectItem>
                        <SelectItem value="Coord./Process design">Coord./Process design</SelectItem>
                        <SelectItem value="Support/Other">Support/Other</SelectItem>

                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>



            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="preInterState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etat pré-intervention</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Etat pré_intervention" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="En ordre">En ordre</SelectItem>
                        <SelectItem value="A l'arrêt">A l'arrêt</SelectItem>
                        <SelectItem value="Dégradé">Dégradé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1"> {/* Second column */}
            </div>




            <div className="col-span-1 mt-9"> {/* Troisième colonne */}
              {/* FormField pour les impacts ici */}
              <FormField
                control={form.control}
                name="impacts"
                render={({ field }) => (
                  <fieldset className="space-y-3">
                    <legend className="text-black">Impacts</legend>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="perte-de-donnees"
                        name="perte-de-donnees"
                        value="Perte de données"
                        className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          let updatedValue = field.value || '';
                          if (checked) {
                            updatedValue += (updatedValue ? ', ' : '') + value;
                            handleImpactsClick();
                          } else {
                            updatedValue = updatedValue
                              .split(', ')
                              .filter((item) => item !== value)
                              .join(', ');
                          }
                          field.onChange(updatedValue);
                        }}
                      />
                      <label htmlFor="perte-de-donnees" className="text-black">Perte de données</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="arret-de-production"
                        name="arret-de-production"
                        value="Arrêt de production"
                        className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          let updatedValue = field.value || '';
                          if (checked) {
                            updatedValue += (updatedValue ? ', ' : '') + value;
                            handleImpactsClick();
                          } else {
                            updatedValue = updatedValue
                              .split(', ')
                              .filter((item) => item !== value)
                              .join(', ');
                          }
                          field.onChange(updatedValue);
                        }}
                      />
                      <label htmlFor="arret-de-production" className="text-black">Arrêt de production</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="impact-gxp"
                        name="impact-gxp"
                        value="Impact GXP"
                        className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                        onChange={(e) => {
                          const { value, checked } = e.target;
                          let updatedValue = field.value || '';
                          if (checked) {
                            updatedValue += (updatedValue ? ', ' : '') + value;
                            handleImpactsClick();
                          } else {
                            updatedValue = updatedValue
                              .split(', ')
                              .filter((item) => item !== value)
                              .join(', ');
                          }
                          field.onChange(updatedValue);
                        }}
                      />
                      <label htmlFor="impact-gxp" className="text-black">Impact GXP</label>
                    </div>
                  </fieldset>
                )}
              />
            </div>

            <div className="col-span-1 mt-5">
              {impactsClicked && (
                <div className="col-span-1 mt-9 ml-0"> {/* Third column */}
                  <FormField
                    control={form.control}
                    name="deviation"
                    render={({ field }) => (
                      <FormItem>
                        <fieldset className="space-y-3">
                          <legend className="text-black">Déviation</legend>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="Ticket L3"
                              name="deviation"
                              value="Ticket L3"
                              className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 "
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                field.onChange(selectedValue); 
                                handleDeviationClick(selectedValue);
                              }}
                            />
                            <label htmlFor="Ticket L3" className="text-black">Ticket L3</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="EM"
                              name="deviation"
                              value="EM"
                              className="h-5 w-5 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                              onChange={(e) => {
                                const selectedValue = e.target.value;
                                field.onChange(selectedValue); // Mettre à jour la valeur du champ
                                handleDeviationClick(selectedValue); // Appeler la fonction de gestion de la déviation
                              }}
                            />
                            <label htmlFor="EM" className="text-black">EM</label>
                          </div>
                        </fieldset>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            <div className="col-span-1 mt-9">
              {/* Afficher les notifications en fonction de la déviation sélectionnée */}
              {selectedDeviation === 'EM' && (
                <div className="col-span-1 mt-6 ml-0"> {/* Fourth column */}
                  {emNotificationVisible && (
                    <FormField
                      control={form.control}
                      name="EMNotification"
                      render={({ field }) => (
                        <FormItem>
                          <Input className="w-full" placeholder="Enter EM notification" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {selectedDeviation === 'Ticket L3' && (
                <div className="col-span-1 mt-6 ml-0"> {/* Fourth column */}
                  {l3NotificationVisible && (
                    <FormField
                      control={form.control}
                      name="ticketL3Notification"
                      render={({ field }) => (
                        <FormItem>
                          <Input className="w-full mb-2" placeholder="Enter Ticket L3 notification" {...field} />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}
            </div>



          </div>



          <h1 className="text-xl mt-8 mb-5 font-bold text-orange-500 border-b border-orange-500">Action</h1>

          <div className="grid grid-cols-4 gap-4"> {/* Use grid for side-by-side layout */}
            {/* Twelfth line */}
            <div className="col-span-2"> {/* First and second columns */}
              <FormField
                control={form.control}
                name="action_prise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="diagnostic1"> Action prise</FormLabel>
                    <Textarea className="w-full" placeholder="Enter Action" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>




            <div className="col-span-2"> {/* First and second columns */}
              <FormField
                control={form.control}
                name="Action_a_mouné"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="diagnostic1"> Action a mener</FormLabel>
                    <Textarea className="w-full" placeholder="Enter Action" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            {/* Thirteenth line */}

            <div className="col-span-1"> {/* First column */}
              <FormField
                control={form.control}
                name="postInterState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Etat post-intervention</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the Gard" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="En ordre">En ordre</SelectItem>
                        <SelectItem value="A l'arrêt">A l'arrêt</SelectItem>
                        <SelectItem value="Dégradé">Dégradé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>




          </div>

          <div className="mt-8 flex">
            <Button className="mr-4" onClick={() => handleSave()}>Save</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div >
    </Form >
  );
};




export default TechnicienForm;
