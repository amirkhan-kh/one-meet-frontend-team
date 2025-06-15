const BASE_URL = 'https://api.onemeet.app'

class ApiError extends Error {
	constructor(message, status) {
		super(message)
		this.name = 'ApiError'
		this.status = status
	}
}

const handleResponse = async response => {
	if (!response.ok) {
		throw new ApiError(
			`HTTP error! status: ${response.status}`,
			response.status
		)
	}

	const data = await response.json()
	if (!data.success) {
		throw new ApiError(data.message || data.reason || 'API request failed')
	}

	return data
}

const candidateApi = {
	getAll: async () => {
		const response = await fetch(`${BASE_URL}/candidate/getAll`)
		const result = await handleResponse(response)
		return result.data
	},

	getById: async id => {
		const response = await fetch(
			`${BASE_URL}/candidate/getByCandidateId/${id}`
		)
		const result = await handleResponse(response)
		return result.data
	},

	create: async data => {
		const response = await fetch(`${BASE_URL}/candidate/create`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		})
		const result = await handleResponse(response)
		return result.data
	},

	update: async (id, data) => {
		const response = await fetch(
			`${BASE_URL}/candidate/updateCandidate/${id}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		)
		const result = await handleResponse(response)
		return result.data
	},

	patch: async (id, data) => {
		const response = await fetch(
			`${BASE_URL}/candidate/patchCandidate/${id}`,
			{
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		)
		const result = await handleResponse(response)
		return result.data
	},

	delete: async id => {
		const response = await fetch(
			`${BASE_URL}/candidate/deleteCandidate/${id}`,
			{
				method: 'DELETE',
			}
		)
		await handleResponse(response)
	},
}

export default candidateApi
