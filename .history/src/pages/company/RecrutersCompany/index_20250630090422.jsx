import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export const RecruitersCompany = () => {
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">RecruitersCompany</h2>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Confirmed Recruiters</h3>
          <div className="bg-white rounded-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Confirmed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Anna </TableCell>
                  <TableCell>anna@gmail.com</TableCell>
                  <TableCell>20</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Sent Invitations</h3>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">
            Incoming Join requests
          </h3>
        </div>
      </div>
    </div>
  );
};
