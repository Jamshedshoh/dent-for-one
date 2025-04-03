import React, { useState } from "react";
import {
  FileText,
  FileDigit,
  FileSearch,
  FileCheck,
  Download,
} from "lucide-react";
import { Layout } from "../Layout";

interface Document {
  id: string;
  type: "invoice" | "treatment-report" | "insurance-report" | "other";
  title: string;
  date: string;
  fileUrl: string;
}

const mockDocuments: Document[] = [
  {
    id: "1",
    type: "invoice",
    title: "Invoice #12345",
    date: "2023-10-15",
    fileUrl: "/documents/invoice_12345.pdf",
  },
  {
    id: "2",
    type: "treatment-report",
    title: "Treatment Report - Oct 2023",
    date: "2023-10-16",
    fileUrl: "/documents/treatment_report_oct.pdf",
  },
  {
    id: "3",
    type: "insurance-report",
    title: "Insurance Claim Report",
    date: "2023-10-18",
    fileUrl: "/documents/insurance_claim.pdf",
  },
];

const getTypeIcon = (type: Document["type"]) => {
  switch (type) {
    case "invoice":
      return <FileDigit className="w-6 h-6 text-blue-500" />;
    case "treatment-report":
      return <FileSearch className="w-6 h-6 text-green-500" />;
    case "insurance-report":
      return <FileCheck className="w-6 h-6 text-purple-500" />;
    default:
      return <FileText className="w-6 h-6 text-gray-500" />;
  }
};

export const Documents = () => {
  const [documents] = useState(mockDocuments);

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">My Documents</h2>
        </div>

        <div className="space-y-4">
          {documents.map((document) => (
            <div
              key={document.id}
              className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {getTypeIcon(document.type)}
                <div>
                  <h3 className="font-medium">{document.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(document.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={document.fileUrl}
                download
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </a>
            </div>
          ))}

          {documents.length === 0 && (
            <div className="text-center py-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">No documents found</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
