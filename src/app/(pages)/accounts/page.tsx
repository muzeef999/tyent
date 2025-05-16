// src/components/CustomerServiceHistoryPage.tsx
"use client";
import { useQuery, gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import { useState } from "react";
import ServiceDialog from "@/components/ServiceDialogHistory";
import { Customers } from "@/types";

const GET_CUSTOMER_SERVICE_HISTORY = gql`
  query GetCustomerServiceHistory {
    getCustomerServiceHistory {
      name
      email
      contactNumber
      serviceHistory {
        type
        date
        status
        remarks
      }
    }
  }
`;

export default function CustomerServiceHistoryPage() {
  const { loading, error, data } = useQuery(GET_CUSTOMER_SERVICE_HISTORY, { client });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [selectedService, setSelectedService] = useState<any>(null);


      const openDialog = (service: any) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };


  if (loading) return <p className="text-blue-500"> Loading...</p>;
  if (error) return <p className="text-red-500"> Error: {error.message}</p>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Customer Service History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.getCustomerServiceHistory.map((customer : Customers, index:string) => (
        <div key={index} className="card shadow-md rounded-lg p-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p>Email: {customer.email}</p>
            <p>Contact: {customer.contactNumber}</p>
            <h4 className="mt-2 font-medium">Upcoming Service: 2 day</h4>

            <ul>
              {customer.serviceHistory.map((service: any, i: number) => (
                <li
                  key={i}
                  className="mt-2 cursor-pointer hover:text-blue-600"
                  onClick={() => openDialog(service)}
                >
                  <strong>{service.type}</strong> - {service.date}
                </li>
              ))}
            </ul>

          </div>
        </div>
      ))}
      </div>

       <ServiceDialog 
        isOpen={isDialogOpen} 
        onClose={closeDialog} 
        service={selectedService} 
      />
    </div>
  );
}
