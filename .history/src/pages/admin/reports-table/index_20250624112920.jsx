 const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(lists.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = lists.slice(startIdx, startIdx + itemsPerPage);
export const ReportsTable = () => {
  return (
    <div>ReportsTable</div>
  )
}
