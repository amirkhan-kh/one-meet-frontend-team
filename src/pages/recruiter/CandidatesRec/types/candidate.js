export const convertApiToCandidate = apiData => {
	return {
		id: apiData.id,
		name: `Candidate ${apiData.id.slice(0, 8)}`,
		email: `candidate${apiData.id.slice(0, 8)}@example.com`,
		status: 'pending',
		createdAt: apiData.created_at,
		user_profileId: apiData.user_profileId,
		resume_url: apiData.resume_url,
		career_goals: apiData.career_goals,
		score: Math.floor(Math.random() * 100),
		rating: Math.floor(Math.random() * 5) + 1,
		location: 'Remote',
		experience: '3+ years',
		skills: ['JavaScript', 'React', 'Node.js'],
		lastContact: new Date().toISOString().split('T')[0],
		source: 'API',
	}
}

export const statusColors = {
	active: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
	selected: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
	pending: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
	rejected: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
}

export const statusIcons = {
	active: '✓',
	selected: '★',
	pending: '⏳',
	rejected: '✗',
}

export const statusConfig = {
	active: { label: 'Active', color: 'emerald', icon: 'CheckCircle' },
	selected: { label: 'Selected', color: 'blue', icon: 'Star' },
	pending: { label: 'Pending', color: 'amber', icon: 'Clock' },
	rejected: { label: 'Rejected', color: 'red', icon: 'XCircle' },
}
