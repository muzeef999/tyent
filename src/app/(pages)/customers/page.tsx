// src/components/CustomerList.tsx
"use client";
import { useQuery, gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import { Customers } from "@/types";
import {  FaPhoneAlt, } from "react-icons/fa";
import gmail from "@/asserts/gmail.png"
import whatsapp from "@/asserts/whatsapp.png"
import Image from "next/image";


const GET_CUSTOMERS = gql`
  query GetCustomers  {
    getCustomers  {
      id
      name
      contactNumber
      email
      address
      installedModel
      price
      invoiceNumber
      serialNumber
      warranty
      amcRenewed
      serviceHistory {
        type
        date
        status
        remarks
      }
      upcomingServices {
        type
        date
        status
        remarks
      }
      createdAt
      updatedAt
    }
  }
`;

export default function CustomerList() {
  const { loading, error, data } = useQuery(GET_CUSTOMERS, { client });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
     <table className="table-custom min-w-full rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-card">
              <th>Name</th>
              <th>contact</th>
              <th>Installed Model</th>
              <th>Invoice Number</th>
              <th>Serial Number</th>
              <th>Warranty</th>
              <th>AMC Renewed</th>
            </tr>
          </thead>
          <tbody>
            {data?.getCustomers?.map((item: Customers, ) => (
              <tr key={item.id} className="border-b-1 border-gray-300 ">
                <td>{item.name}</td>
                <td className="flex items-center justify-center">
                  {item.contactNumber && (
                    <>
                      <FaPhoneAlt
                        style={{ marginRight: "8px", color: "green" }}
                      />
                      <a
                        href={`tel:${item.contactNumber}`}
                        style={{ marginRight: "8px" }}
                      ></a>
                      <a
                        href={`https://wa.me/${item.contactNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                         <Image src={whatsapp} alt="whatsapp" width={20} height={20} />
                   
                      </a>
                      <a href={`${item.email}`} target="_blank"
                        rel="noopener noreferrer">
                      <Image src={gmail} alt="gmail" width={20} height={20} />
                   
                      </a>
                    </>
                  )}
                </td>
                
                <td>{item.installedModel}</td>
                <td>{item.invoiceNumber}</td>
                <td>{item.serialNumber}</td>
                <td>{item.warranty}</td>
                <td>{item.amcRenewed}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              {/* <td colSpan={10}>
                <div className="flex justify-between items-center mt-4 w-full">
                  <div>Total : {totalCustomers}</div>
                  <div className="flex gap-2 items-center mb-4">
                    <label>Rows per page:</label>
                    <select
                      value={rowsPerPage}
                      onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                      <option value={40}>40</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>

                  <div className="flex">
                    <button
                      className={`px-3 py-1 bg-card rounded ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                    >
                      <MdOutlineKeyboardArrowLeft />
                    </button>
                    <div className="flex gap-2">
                      {Array.from(
                        {
                          length: Math.min(
                            10,
                            totalPages - Math.floor((currentPage - 1) / 10) * 10
                          ),
                        },
                        (_, index) => {
                          const page =
                            Math.floor((currentPage - 1) / 10) * 10 + index + 1;
                          return (
                            <button
                              key={page}
                              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                page === currentPage && "bg-primary"
                              }`}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </button>
                          );
                        }
                      )}
                    </div>
                    <button
                      className={`px-3 py-1 bg-card rounded ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                    >
                      <MdOutlineKeyboardArrowRight />
                    </button>
                  </div>
                </div>
              </td> */}
            </tr>
          </tfoot>
        </table>
      
    </div>
  );
}
