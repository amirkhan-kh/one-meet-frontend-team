import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
// import CompanyCreateRecruiterModal from "../../modal-recruiter-post";

export const TableOneAddRcruiterForCompany = () => {
    const [recruiters, setRecruiters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(recruiters.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = recruiters.slice(startIdx, startIdx + itemsPerPage);

  const fetchRecruiters = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`https://api.onemeet.app/recruiter/company/${companyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecruiters(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch recruiters", error);
    }
  };

  useEffect(() => {
    if (companyId) fetchRecruiters();
  }, [companyId]);
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Confirmed Recruiters</h3>
      <div className="bg-white rounded-sm p-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Photo</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>
                <CompanyCreateRecruiterModal  companyId={companyId} onSuccess={fetchRecruiters} />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentItems.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{startIdx + i + 1}</TableCell>
                <TableCell>{item.compName}</TableCell>
                <TableCell>{item.compSize}</TableCell>
                <TableCell className="bg-gray-200 p-1 inline-block rounded-sm">
                  {item.industry}
                </TableCell>
                <TableCell>{item.locationComp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 py-4 pr-4">
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-sm ${
                  currentPage === page
                    ? "border border-gray-300 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
