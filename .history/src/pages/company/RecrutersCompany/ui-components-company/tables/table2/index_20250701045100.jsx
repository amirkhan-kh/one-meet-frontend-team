import React from 'react'
const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(candidateList.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = candidateList.slice(startIdx, startIdx + itemsPerPage);
export const TableTwoRequestsToRecruiters = () => {
  return (
    <div>TableTwoRequestsToRecruiters</div>
  )
}
