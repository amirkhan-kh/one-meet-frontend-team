import axios from 'axios'

const BASE_URL = 'https://api.onemeet.app'

class InterviewAPI {
	getAuthHeaders() {
		const accessToken = localStorage.getItem('accessToken')
		const headers = {
			'Content-Type': 'application/json',
		}

		if (accessToken) {
			headers.Authorization = `Bearer ${accessToken}`
		}

		return headers
	}

	getUserData() {
		try {
			const userData = localStorage.getItem('userData')
			return userData ? JSON.parse(userData) : null
		} catch (error) {
			console.error('userData parse qilishda xatolik:', error)
			return null
		}
	}

	async request(method, endpoint, data = null, params = null) {
		try {
			const response = await axios({
				method,
				url: `${BASE_URL}${endpoint}`,
				headers: this.getAuthHeaders(),
				data,
				params,
			})
			return response.data
		} catch (error) {
			if (error.response?.status === 401) {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('userData')
				throw new Error('Unauthorized - please login again')
			}
			throw new Error(
				error.response?.data?.message ||
					error.response?.statusText ||
					error.message
			)
		}
	}

	// buildQueryParams(params) {

	//   const searchParams = new URLSearchParams()

	//   Object.entries(params).forEach(([key, value]) => {
	//     if (value !== undefined && value !== null && value !== "") {
	//       if (typeof value === "object") {
	//         if (key === "pageable") {
	//           Object.entries(value).forEach(([subKey, subValue]) => {
	//             if (subValue !== undefined && subValue !== null) {
	//               searchParams.append(subKey, String(subValue))
	//             }
	//           })
	//         }
	//       } else {
	//         searchParams.append(key, String(value))
	//       }
	//     }
	//   })

	//   return searchParams.toString()
	// }

	// === Interview Management ===
	buildQueryParams(params) {
		const searchParams = new URLSearchParams()

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				if (typeof value === 'object' && !Array.isArray(value)) {
					// Flatten pageable
					Object.entries(value).forEach(([subKey, subValue]) => {
						if (subValue !== undefined && subValue !== null) {
							searchParams.append(subKey, String(subValue))
						}
					})
				} else {
					searchParams.append(key, String(value))
				}
			}
		})

		return searchParams.toString()
	}

	async createInterview(data) {
		const accessToken = localStorage.getItem('accessToken')

		return axios.post(
			'https://api.onemeet.app/interview/business/create',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
	}

	async getAllCandidates() {
		return this.request('GET', '/candidate/getAll')
	}

	async getInterview(id) {
		return this.request('GET', `/interview/business/${id}`)
	}

	// async getInterviewsByRecruiter(recruiterId, filters = {}, pageable = { page: 0, size: 10 }) {
	//   const queryParams = this.buildQueryParams({
	//     status: filters.status,
	//     sortBy: filters.sortBy || "createdAt",
	//     direction: filters.direction || "desc",
	//     pageable: {
	//       page: pageable.page,
	//       size: pageable.size,
	//       sort: pageable.sort,
	//     },
	//   })

	//   const url = `/interview/business/recruiter/${recruiterId}/paged${queryParams ? `?${queryParams}` : ""}`
	//   return this.request("GET", url)
	// }

	async getInterviewsByRecruiter(
		recruiterId,
		filters = {},
		pageable = { page: 0, size: 10 }
	) {
		try {
			// Query parametrlarini tuzish
			const queryParams = new URLSearchParams()

			// Pagination parametrlari
			queryParams.append('page', pageable.page || 0)
			queryParams.append('size', pageable.size || 10)

			// Sort parametrini qo'shish
			if (pageable.sort) {
				queryParams.append('sort', pageable.sort)
			} else if (filters.sortBy && filters.direction) {
				queryParams.append(
					'sort',
					`${filters.sortBy},${filters.direction}`
				)
			} else {
				// Default sort
				queryParams.append('sort', 'createdAt,desc')
			}

			// Filter parametrlari - faqat status ni qo'shamiz va faqat "ALL" dan boshqa bo'lsa
			if (filters.status && filters.status !== 'ALL') {
				queryParams.append('status', filters.status)
			}

			// sortBy va direction parametrlarini yubormaslik!
			// Chunki server buni yomon handle qiladi va 500 xato beradi

			// URL tuzish
			const url = `/interview/business/recruiter/${recruiterId}/paged?${queryParams.toString()}`

			// Request yuborish
			const response = await this.request('GET', url)

			return response
		} catch (error) {
			console.error('getInterviewsByRecruiter xatosi:', {
				recruiterId,
				filters,
				pageable,
				error: error.message,
				status: error.response?.status,
				data: error.response?.data,
			})

			// Xatoni qayta tashlash
			throw error
		}
	}

	async getInterviewsByCompany(
		companyId,
		filters = {},
		pageable = { page: 0, size: 10 }
	) {
		const queryParams = this.buildQueryParams({
			recruiterName: filters.recruiterName,
			status: filters.status,
			sortBy: filters.sortBy || 'createdAt',
			direction: filters.direction || 'desc',
			pageable: {
				page: pageable.page,
				size: pageable.size,
				sort: pageable.sort,
			},
		})

		const url = `/interview/business/company/${companyId}/paged${
			queryParams ? `?${queryParams}` : ''
		}`
		return this.request('GET', url)
	}

	// === Interview Config ===
	async getInterviewConfig() {
		return this.request('GET', '/interview/meta/config')
	}

	// === Candidate Operations ===
	async startInterview(id) {
		return this.request('POST', `/interview/candidate/start/${id}`)
	}

	async getCandidateInterview(id) {
		return this.request('GET', `/interview/candidate/get/${id}`)
	}

	async getCandidateInterviews(
		candidateId,
		pageable = { page: 0, size: 10 }
	) {
		const queryParams = this.buildQueryParams({
			pageable: {
				page: pageable.page,
				size: pageable.size,
				sort: pageable.sort,
			},
		})

		const url = `/interview/candidate/get-all/${candidateId}/paged${
			queryParams ? `?${queryParams}` : ''
		}`
		return this.request('GET', url)
	}

	// === Helpers ===
	getCurrentUser() {
		return this.getUserData()
	}

	isAuthenticated() {
		const accessToken = localStorage.getItem('accessToken')
		const userData = this.getUserData()
		return !!(accessToken && userData)
	}
}

export const interviewAPI = new InterviewAPI()
