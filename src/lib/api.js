import axios from 'axios'

const BASE_URL = 'https://api.onemeet.app'
// Mock data for fallback
const mockUsers = [
	{
		id: '1',
		fullName: 'John Recruiter',
		email: 'john@company.com',
		role: 'recruiter',
		companyId: '1',
		createdAt: '2024-01-01T00:00:00Z',
		updatedAt: '2024-01-01T00:00:00Z',
	},
]

const mockCandidates = [
	{
		id: '1',
		name: 'Alice Thompson',
		email: 'alice@example.com',
		phone: '+1 (555) 123-4567',
		status: 'selected',
		score: 87,
		interviewDate: 'May 10, 2025',
		position: 'Senior Developer',
		createdAt: '2024-01-01T00:00:00Z',
	},
	{
		id: '2',
		name: 'Wei Chen',
		email: 'wei@example.com',
		phone: '+1 (555) 234-5678',
		status: 'active',
		score: 78,
		interviewDate: 'May 12, 2025',
		position: 'Frontend Developer',
		createdAt: '2024-01-01T00:00:00Z',
	},
	{
		id: '3',
		name: 'Sarah Johnson',
		email: 'sarah@example.com',
		phone: '+1 (555) 345-6789',
		status: 'pending',
		score: 92,
		interviewDate: 'May 15, 2025',
		position: 'UX Designer',
		createdAt: '2024-01-01T00:00:00Z',
	},
	{
		id: '4',
		name: 'Michael Rodriguez',
		email: 'michael@example.com',
		phone: '+1 (555) 456-7890',
		status: 'rejected',
		score: 65,
		interviewDate: 'May 18, 2025',
		position: 'Backend Developer',
		createdAt: '2024-01-01T00:00:00Z',
	},
]

// Helper function to simulate API calls with fallback
async function apiCall(url, options, mockData) {
	try {
		const response = await fetch(url, options)
		if (!response.ok)
			throw new Error(`HTTP error! status: ${response.status}`)
		return response.json()
	} catch (error) {
		console.warn(`API call failed, using mock data:`, error)
		if (mockData !== undefined) {
			// Simulate network delay
			await new Promise(resolve => setTimeout(resolve, 500))
			return mockData
		}
		throw error
	}
}

// Update API functions to use fallback
export const api = {
	// User APIs
	user: {
		getProfile: async () => {
			return apiCall(`${BASE_URL}/user/me`, undefined, mockUsers[0])
		},

		updateProfile: async (id, data) => {
			return apiCall(
				`${BASE_URL}/user/update/${id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
				{ ...mockUsers[0], ...data }
			)
		},

		createUser: async data => {
			return apiCall(
				`${BASE_URL}/user/create`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
				{
					...data,
					id: Date.now().toString(),
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				}
			)
		},
	},

	// Candidate APIs
	candidate: {
		getAll: async () => {
			return apiCall(
				`${BASE_URL}/candidate/getAll`,
				undefined,
				mockCandidates
			)
		},

		getById: async id => {
			const candidate = mockCandidates.find(c => c.id === id)
			return apiCall(
				`${BASE_URL}/candidate/getByCandidateId/${id}`,
				undefined,
				candidate || mockCandidates[0]
			)
		},

		create: async data => {
			return apiCall(
				`${BASE_URL}/candidate/create`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
				{
					...data,
					id: Date.now().toString(),
					createdAt: new Date().toISOString(),
				}
			)
		},

		update: async (id, data) => {
			const candidate =
				mockCandidates.find(c => c.id === id) || mockCandidates[0]
			return apiCall(
				`${BASE_URL}/candidate/updateCandidate/${id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				},
				{ ...candidate, ...data }
			)
		},
	},

	// Company APIs (keep existing implementation)
	company: {
		getById: async id => {
			const response = await fetch(`${BASE_URL}/company/${id}`)
			if (!response.ok) throw new Error('Failed to fetch company')
			return response.json()
		},

		create: async data => {
			const response = await fetch(`${BASE_URL}/company`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error('Failed to create company')
			return response.json()
		},

		update: async (id, data) => {
			const response = await fetch(`${BASE_URL}/company/update/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})
			if (!response.ok) throw new Error('Failed to update company')
			return response.json()
		},

		delete: async id => {
			const response = await fetch(`${BASE_URL}/company/delete/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Failed to delete company')
		},
	},
}

// class InterviewAPI {
// 	// Helper method for making API requests
// 	async request(endpoint, options = {}) {
// 		const response = await fetch(`${BASE_URL}${endpoint}`, {
// 			headers: {
// 				'Content-Type': 'application/json',
// 				...options.headers,
// 			},
// 			...options,
// 		})

// 		if (!response.ok) {
// 			throw new Error(
// 				`API Error: ${response.status} ${response.statusText}`
// 			)
// 		}

// 		return response.json()
// 	}

// 	// Interview Management
// 	async createInterview(data) {
// 		return this.request('/interview/business/create', {
// 			method: 'POST',
// 			body: JSON.stringify(data),
// 		})
// 	}

// 	async getInterview(id) {
// 		return this.request(`/interview/business/${id}`)
// 	}

// 	async getInterviewsByRecruiter(recruiterId, page = 1, limit = 10) {
// 		return this.request(
// 			`/interview/business/recruiter/${recruiterId}/paged?page=${page}&limit=${limit}`
// 		)
// 	}

// 	async getInterviewsByCompany(companyId, page = 1, limit = 10) {
// 		return this.request(
// 			`/interview/business/company/${companyId}/paged?page=${page}&limit=${limit}`
// 		)
// 	}

// 	// Interview Configuration
// 	async getInterviewConfig() {
// 		return this.request('/interview/meta/config')
// 	}

// 	// Candidate Interview Operations
// 	async startInterview(id) {
// 		return this.request(`/interview/candidate/start/${id}`, {
// 			method: 'POST',
// 		})
// 	}

// 	async getCandidateInterview(id) {
// 		return this.request(`/interview/candidate/get/${id}`)
// 	}

// 	async getCandidateInterviews(candidateId, page = 1, limit = 10) {
// 		return this.request(
// 			`/interview/candidate/get-all/${candidateId}/paged?page=${page}&limit=${limit}`
// 		)
// 	}
// }

// // Create an instance of the InterviewAPI class
// export const interviewAPI = new InterviewAPI()

class InterviewAPI {
	constructor() {
		this.api = axios.create({
			baseURL: BASE_URL,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		// Har bir so‘rovdan oldin token qo‘shish
		this.api.interceptors.request.use(config => {
			const token = localStorage.getItem('accessToken')
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`
			}
			return config
		})
	}

	// API helper
	async request(endpoint, options = {}) {
		try {
			const response = await this.api({
				url: endpoint,
				...options,
			})
			return response.data
		} catch (error) {
			throw new Error(
				`API Error: ${error.response?.status} ${error.response?.statusText}`
			)
		}
	}

	// Interview Management
	async createInterview(data) {
		return this.request('/interview/business/create', {
			method: 'POST',
			data,
		})
	}

	async getInterview(id) {
		return this.request(`/interview/business/${id}`)
	}

	async getInterviewsByRecruiter(recruiterId, page = 1, limit = 10) {
		return this.request(
			`/interview/business/recruiter/${recruiterId}/paged?page=${page}&limit=${limit}`
		)
	}

	async getInterviewsByCompany(companyId, page = 1, limit = 10) {
		return this.request(
			`/interview/business/company/${companyId}/paged?page=${page}&limit=${limit}`
		)
	}

	// Interview Configuration
	async getInterviewConfig() {
		return this.request('/interview/meta/config')
	}

	// Candidate Interview Operations
	async startInterview(id) {
		return this.request(`/interview/candidate/start/${id}`, {
			method: 'POST',
		})
	}

	async getCandidateInterview(id) {
		return this.request(`/interview/candidate/get/${id}`)
	}

	async getCandidateInterviews(candidateId, page = 1, limit = 10) {
		return this.request(
			`/interview/candidate/get-all/${candidateId}/paged?page=${page}&limit=${limit}`
		)
	}
}

export const interviewAPI = new InterviewAPI()
