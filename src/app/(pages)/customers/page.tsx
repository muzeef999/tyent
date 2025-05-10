"use client";
import { Customers } from "@/types/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const page = () => {
  const [customers, setCustomers] = useState<Customers[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const rowsPerPage = 15;

  useEffect(() => {
    fetchCustomers(currentPage);
  }, [currentPage]);

  const fetchCustomers = async (page: number) => {
    try {
      const response = await axios.get(
        `/api/customers?page=${page}&limit=${rowsPerPage}`
      );
      setCustomers(response.data.customers);
      setTotalPages(Math.ceil(response.data.total / rowsPerPage));
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h1>Custmores</h1>
      <div className="card">
        <table className="table-custom min-w-full rounded-lg shadow-lg overflow-hidden">
          <thead>
            <tr className="bg-card">
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Installed Model</th>
              <th>Invoice Number</th>
              <th>Serial Number</th>
              <th>Warranty</th>
              <th>AMC Renewed</th>
              <th>Service History</th>
              <th>Upcoming Services</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((item, i) => (
              <tr key={i} className="border-b-1 border-gray-300 ">
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
                        <FaWhatsapp style={{ color: "green" }} />
                      </a>
                    </>
                  )}
                </td>
                <td>
                  {item.email && (
                    <>
                      <FaEnvelope
                        style={{ marginRight: "8px", color: "blue" }}
                      />
                    </>
                  )}
                </td>
                <td>{item.installedModel}</td>
                <td>{item.invoiceNumber}</td>
                <td>{item.serialNumber}</td>
                <td>{item.warranty}</td>
                <td>{item.amcRenewed}</td>
                <td>{item.serviceHistory.join(", ")}</td>
                <td>{item.upcomingServices.join(", ")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={9} className="flex justify-between items-center mt-4 w-full">
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
                <span className="mx-2">
                  Page {currentPage} of {totalPages}
                </span>
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
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default page;
