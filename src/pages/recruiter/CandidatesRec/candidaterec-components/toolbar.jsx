import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Download,
	Grid3X3,
	List,
	MoreHorizontal,
	Plus,
	RefreshCw,
	SortAsc,
	SortDesc,
	Upload,
} from 'lucide-react'

export function Toolbar({
	viewMode,
	onViewModeChange,
	sortBy,
	sortOrder,
	onSortChange,
	onRefresh,
	onAddCandidate,
	onExport,
	onImport,
	isLoading = false,
}) {
	return (
	<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
  {/* Left Side - View & Sort Controls */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
    {/* View Mode Toggle */}
    <div className="flex items-center border rounded-lg p-1 self-start sm:self-auto">
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('list')}
        className="h-8 px-3"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className="h-8 px-3"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
    </div>

    {/* Sort Controls */}
    <div className="flex items-center gap-2">
      <Select value={sortBy} onValueChange={(value) => onSortChange(value, sortOrder)}>
        <SelectTrigger className="w-36 h-9">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="createdAt">Date Added</SelectItem>
          <SelectItem value="score">Score</SelectItem>
          <SelectItem value="status">Status</SelectItem>
          <SelectItem value="lastContact">Last Contact</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
        className="h-9 px-3"
      >
        {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
      </Button>
    </div>

    <Button
      variant="outline"
      size="sm"
      onClick={onRefresh}
      disabled={isLoading}
      className="h-9 gap-2"
    >
      <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
      Refresh
    </Button>
  </div>

  {/* Right Side - Action Buttons */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2">
          <MoreHorizontal className="h-4 w-4" />
          More
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onImport}>
          <Upload className="mr-2 h-4 w-4" />
          Import CSV
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync with API
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Button
      onClick={onAddCandidate}
      className="h-9 gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
    >
      <Plus className="h-4 w-4" />
      Add Candidate
    </Button>
  </div>
</div>

	)
}
