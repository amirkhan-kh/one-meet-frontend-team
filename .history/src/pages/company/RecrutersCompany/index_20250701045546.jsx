
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
