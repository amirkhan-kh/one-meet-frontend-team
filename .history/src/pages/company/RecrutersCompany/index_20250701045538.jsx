import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { TableOneAddRcruiterForCompany } from "./ui-components-company/tables/table1-add-recruiter";
import { TableTwoRequestsToRecruiters } from "./ui-components-company/tables/table2";

export const RecruitersCompany = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(candidateList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = candidateList.slice(startIdx, startIdx + itemsPerPage);
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">RecruitersCompany</h2>
        <TableOneAddRcruiterForCompany/>
        <TableTwoRequestsToRecruiters/>
        
        
      </div>
    </div>
  );
};
