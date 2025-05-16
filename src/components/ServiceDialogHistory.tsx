// src/components/ServiceDialog.tsx
"use client";
import React from "react";

interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  service?: {
    type: string;
    date: string;
    status: string;
    remarks: string;
  };
}

export default function ServiceDialog({
  isOpen,
  onClose,
  service,
}: ServiceDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-5 w-[90%] max-w-md">
        <h3 className="text-lg font-bold mb-3">Service Details</h3>
        {service ? (
          <div>
            <p><strong>Type:</strong> {service.type}</p>
            <p><strong>Date:</strong> {service.date}</p>
            <p><strong>Status:</strong> {service.status}</p>
            <p><strong>Remarks:</strong> {service.remarks}</p>
          </div>
        ) : (
          <p>No service details available.</p>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
