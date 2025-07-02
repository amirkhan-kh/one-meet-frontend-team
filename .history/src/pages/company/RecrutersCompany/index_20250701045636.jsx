import { TableOneAddRcruiterForCompany } from "./ui-components-company/tables/table1-add-recruiter";
import { TableTwoRequestsToRecruiters } from "./ui-components-company/tables/table2";
import { TableTree } from "./ui-components-company/tables/table3";

export const RecruitersCompany = () => {
  return (
    <div className="p-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">RecruitersCompany</h2>
        <TableOneAddRcruiterForCompany/>
        <TableTwoRequestsToRecruiters/>
        <TableTree/>
        
      </div>
    </div>
  );
};
