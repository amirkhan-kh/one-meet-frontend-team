import React, { useState } from "react";
import { candidateList } from "@/db/static-list";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";




export const TableOneAddRcruiterForCompany = () => {
    const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
    
      const totalPages = Math.ceil(candidateList.length / itemsPerPage);
      const startIdx = (currentPage - 1) * itemsPerPage;
      const currentItems = candidateList.slice(startIdx, startIdx + itemsPerPage);
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
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button
                        className={`bg-[#0823d4bc] text-white px-3 py-1 rounded-sm`}
                      >
                        Add Recruiter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Name</Label>
                          <Input
                            id="name-1"
                            name="name"
                            defaultValue="Pedro Duarte"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="username-1">Username</Label>
                          <Input
                            id="username-1"
                            name="username"
                            defaultValue="@peduarte"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild></DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item, i) => (
              <TableRow key={item.id} className={``}>
                <TableCell>{startIdx + i + 1}</TableCell>
                <TableCell>{item.compName}</TableCell>
                <TableCell>{item.compSize}</TableCell>
                <TableCell
                  className={`bg-gray-200 p-1 inline-block translate-y-1 rounded-sm `}
                >
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
            const isActive = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-sm
                ${
                  isActive
                    ? "border border-gray-300 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
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
