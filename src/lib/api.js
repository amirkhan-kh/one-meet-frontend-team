import axios from 'axios'

const BASE_URL = 'https://api.onemeet.app'

class InterviewAPI {
	getAuthHeaders() {
		const accessToken = localStorage.getItem('accessToken')
		const headers = { 'Content-Type': 'application/json' }
		if (accessToken) headers.Authorization = `Bearer ${accessToken}`
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

	buildQueryParams(params) {
		const searchParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				if (typeof value === 'object' && !Array.isArray(value)) {
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

	// === Recruiter ===
	async getRecruiterByUserProfileId(userProfileId) {
		return this.request('GET', `/recruiter/get-by-user/${userProfileId}`)
	}

	async getRecruiterId() {
	try {
		const token = localStorage.getItem("accessToken")

		const userRes = await fetch(`${BASE_URL}/user/me`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		const userJson = await userRes.json()

		if (!userJson.success) throw new Error("User not found")
		const userProfileId = userJson.data.id

		const recruiterRes = await fetch(`${BASE_URL}/recruiter/get-by-user/${userProfileId}`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		const recruiterJson = await recruiterRes.json()

		if (!recruiterJson.success) throw new Error("Recruiter not found")
		return recruiterJson.data.id // ✅ recruiterId
	} catch (err) {
		console.error("❌ Failed to get recruiter ID:", err)
		throw err
	}
}


	// === Interview Creation ===
	async createInterview(data) {
		return axios.post(`${BASE_URL}/interview/business/create`, data, {
			headers: this.getAuthHeaders(),
		})
	}

	// === Candidates ===
	async getAllCandidates() {
		return this.request('GET', '/candidate/getAll')
	}

	// === Interview Read ===
	async getInterview(id) {
		return this.request('GET', `/interview/business/${id}`)
	}

	async getInterviewsByRecruiter(recruiterId, filters = {}, pageable = { page: 0, size: 10 }) {
		try {
			const queryParams = new URLSearchParams()
			queryParams.append('page', pageable.page || 0)
			queryParams.append('size', pageable.size || 10)

			if (pageable.sort) {
				queryParams.append('sort', pageable.sort)
			} else if (filters.sortBy && filters.direction) {
				queryParams.append('sort', `${filters.sortBy},${filters.direction}`)
			} else {
				queryParams.append('sort', 'createdAt,desc')
			}

			if (filters.status && filters.status !== 'ALL') {
				queryParams.append('status', filters.status)
			}

			const url = `/interview/business/recruiter/${recruiterId}/paged?${queryParams.toString()}`
			return await this.request('GET', url)
		} catch (error) {
			console.error('getInterviewsByRecruiter xatosi:', {
				recruiterId,
				filters,
				pageable,
				error: error.message,
				status: error.response?.status,
				data: error.response?.data,
			})
			throw error
		}
	}

	// ✅ TEST BLOCK WITH LOGS
	async fetchRecruiterIdAndInterviews(setRecruiterId, setInterviews) {
		try {
			const token = localStorage.getItem("accessToken")
			console.log("🔑 Token from localStorage:", token)

			const userRes = await fetch(`${BASE_URL}/user/me`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			const userJson = await userRes.json()
			console.log("👤 /user/me response:", userJson)

			if (!userJson.success) throw new Error("User not found")
			const userProfileId = userJson.data.id
			console.log("✅ userProfileId:", userProfileId)

			const recruiterRes = await fetch(`${BASE_URL}/recruiter/get-by-user/${userProfileId}`, {
				headers: { Authorization: `Bearer ${token}` }
			})
			const recruiterJson = await recruiterRes.json()
			console.log("👔 /recruiter/get-by-user response:", recruiterJson)

			if (!recruiterJson.success) throw new Error("Recruiter not found")
			const recruiterId = recruiterJson.data.id
			console.log("✅ recruiterId:", recruiterId)
			setRecruiterId(recruiterId)

			const res = await fetch(
				`${BASE_URL}/interview/business/recruiter/${recruiterId}/paged?status=&sortBy=createdAt&direction=desc&page=0&size=10`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			const json = await res.json()
			console.log("📋 Interviews fetched:", json)

			if (json.success) {
				setInterviews(json.data.content)
			}
		} catch (err) {
			console.error("❌ Error in fetchRecruiterIdAndInterviews:", err)
		}
	}

	// async createInterviewWithFetchedRecruiter(recruiterId, formData, toast) {
	// 	try {
	// 		const token = localStorage.getItem("accessToken")
	// 		console.log("📝 Creating interview with recruiterId:", recruiterId)
	// 		console.log("📨 Payload:", formData)

	// 		const body = {
	// 			recruiterId,
	// 			candidatesEmailList: formData.emailList,
	// 			type: formData.type,
	// 			profession: formData.profession,
	// 			language: formData.language,
	// 			durationMinutes: formData.duration,
	// 			deadline: formData.deadline,
	// 			contextPrompt: formData.contextPrompt || "",
	// 		}

	// 		const res = await fetch(`${BASE_URL}/interview/business/create`, {
	// 			method: "POST",
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 				"Content-Type": "application/json"
	// 			},
	// 			body: JSON.stringify(body)
	// 		})

	// 		const json = await res.json()
	// 		console.log("📤 Create interview response:", json)

	// 		if (json.success) {
	// 			toast.success("Interview(s) created")
	// 		} else {
	// 			toast.error("Failed to create interview")
	// 		}
	// 	} catch (err) {
	// 		console.error("❌ Error creating interview:", err)
	// 		toast.error("Server error")
	// 	}
	// }
	// // ✅ END TEST BLOCK

	async getInterviewsByCompany(companyId, filters = {}, pageable = { page: 0, size: 10 }) {
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

		const url = `/interview/business/company/${companyId}/paged${queryParams ? `?${queryParams}` : ''}`
		return this.request('GET', url)
	}

	// === Meta Config ===
	async getInterviewConfig() {
		return this.request('GET', '/interview/meta/config')
	}

	// === Candidate Access ===
	async startInterview(id) {
		return this.request('POST', `/interview/candidate/start/${id}`)
	}

	async getCandidateInterview(id) {
		return this.request('GET', `/interview/candidate/get/${id}`)
	}

	async getCandidateInterviews(candidateId, pageable = { page: 0, size: 10 }) {
		const queryParams = this.buildQueryParams({
			pageable: {
				page: pageable.page,
				size: pageable.size,
				sort: pageable.sort,
			},
		})

		const url = `/interview/candidate/get-all/${candidateId}/paged${queryParams ? `?${queryParams}` : ''}`
		return this.request('GET', url)
	}

	// === Helpers ===
	getCurrentUser() {
		return this.getUserData()
	}
}

export const interviewAPI = new InterviewAPI()
