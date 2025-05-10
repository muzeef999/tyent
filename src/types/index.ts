export  interface Customers {
    id:string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  installedModel: string;
  price: number;
  invoiceNumber: string;
  serialNumber: string;
  warranty: number;
  amcRenewed: number;
  serviceHistory: string[]; // Array of service dates
  upcomingServices: string[]; // Array of upcoming service dates
}