import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../../assets/one_meet_logo.png'
import '../../../../styles/forms.css'

export default function RecruiterCompleteProfile() {
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		timezone: '',
		profilePicture: null,
		companyId: '',
		position: '',
	})

	const companies = [
		{
			id: '3fa85f64-5717-4562-b3fc-2c963f66a111',
			name: 'Tech Solutions LLC',
		},
		{ id: '3fa85f64-5717-4562-b3fc-2c963f66a222', name: 'InnovateX' },
		{
			id: '3fa85f64-5717-4562-b3fc-2c963f66a333',
			name: 'FutureWorks Inc.',
		},
	]

	const [timezones, setTimezones] = useState({})
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('accessToken')

		axios
			.get('https://api.onemeet.app/user/time-zones', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				if (res.data.success && Array.isArray(res.data.data)) {
					const grouped = res.data.data.reduce((acc, tz) => {
						const parts = tz.split(' - ')
						const region = parts[1]?.split('/')?.[0] || 'Other'
						if (!acc[region]) acc[region] = []
						acc[region].push(tz)
						return acc
					}, {})
					setTimezones(grouped)
				} else {
					setTimezones({})
				}
			})
			.catch(() => setTimezones({}))
	}, [])

	const handleChange = e => {
		const { name, value, files } = e.target
		if (name === 'profilePicture') {
			setForm({ ...form, profilePicture: files[0] })
		} else {
			setForm({ ...form, [name]: value })
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const token = localStorage.getItem('accessToken')

		try {
			setLoading(true)
			setError('')
			setMessage('')

			if (
				!form.profilePicture ||
				!['image/jpeg', 'image/jpg', 'image/png'].includes(
					form.profilePicture.type
				)
			) {
				setError('Only JPEG and PNG images are allowed.')
				setLoading(false)
				return
			}

			// Step 1: Upload profile picture
			const formData = new FormData()
			formData.append('file', form.profilePicture)

			const uploadRes = await axios.post(
				'https://api.onemeet.app/media/business/upload-avatar',
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			)

			const mediaId = uploadRes.data?.data?.id
			if (!mediaId) throw new Error('Profile picture upload failed.')

			// Step 2: Create user profile
			const userRes = await axios.post(
				'https://api.onemeet.app/user/create',
				{
					firstName: form.firstName,
					lastName: form.lastName,
					timezone: form.timezone,
					profilePicture: mediaId,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			const userProfile = userRes.data.data
			localStorage.setItem('userProfile', JSON.stringify(userProfile))

			// Step 3: Create recruiter
			await axios.post(
				'https://api.onemeet.app/recruiter/create',
				{
					userProfileId: userProfile.id,
					companyId: form.companyId,
					position: form.position,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setMessage('Recruiter profile completed.')
			const accessToken = localStorage.getItem('accessToken')

			const userResponse = await axios.get(
				'https://api.onemeet.app/auth/me',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const userData = userResponse.data.data
			localStorage.setItem('userData', JSON.stringify(userData))
			navigate('/recruiter')
		} catch (err) {
			setError(err.response?.data?.message || 'Submission failed.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='page-background'>
			<div className='form-container compact-form no-shadow'>
				<div className='logo-container'>
					<img
						src={Logo}
						alt='OneMeet Logo'
						className='logo bigger-logo'
					/>
				</div>

				<h1 className='hero-subtitle fixed-width-subtitle match-bg-subtitle'>
					Complete Your Recruiter Profile
				</h1>

				<form onSubmit={handleSubmit}>
					<label htmlFor='firstName' className='form-label'>
						First Name
					</label>
					<input
						type='text'
						id='firstName'
						name='firstName'
						className='input-field slim-input'
						value={form.firstName}
						onChange={handleChange}
						required
					/>

					<label htmlFor='lastName' className='form-label'>
						Last Name
					</label>
					<input
						type='text'
						id='lastName'
						name='lastName'
						className='input-field slim-input'
						value={form.lastName}
						onChange={handleChange}
						required
					/>

					<label htmlFor='timezone' className='form-label'>
						Your Timezone
					</label>
					<select
						id='timezone'
						name='timezone'
						className='input-field slim-input'
						value={form.timezone}
						onChange={handleChange}
						required
					>
						<option value=''>Select your timezone</option>
						{Object.keys(timezones).map(region => (
							<optgroup key={region} label={region}>
								{timezones[region].map(tz => (
									<option key={tz} value={tz}>
										{tz}
									</option>
								))}
							</optgroup>
						))}
					</select>

					<label htmlFor='profilePicture' className='form-label'>
						Upload Profile Picture
					</label>
					<input
						type='file'
						id='profilePicture'
						name='profilePicture'
						className='input-field slim-input'
						onChange={handleChange}
						required
					/>

					<label htmlFor='companyId' className='form-label'>
						Select Company
					</label>
					<select
						id='companyId'
						name='companyId'
						className='input-field slim-input'
						value={form.companyId}
						onChange={handleChange}
						required
					>
						<option value=''>Select a company</option>
						{companies.map(company => (
							<option key={company.id} value={company.id}>
								{company.name}
							</option>
						))}
					</select>

					<label htmlFor='position' className='form-label'>
						Your Position
					</label>
					<input
						type='text'
						id='position'
						name='position'
						className='input-field slim-input'
						value={form.position}
						onChange={handleChange}
						required
					/>

					{error && <p className='form-error'>{error}</p>}
					{message && <p className='form-success'>{message}</p>}

					<button
						type='submit'
						className={`ai-cta slim-cta ${
							loading ? 'inactive-cta' : 'active-cta'
						}`}
						disabled={loading}
					>
						{loading ? 'Submitting...' : 'Submit'}
					</button>
				</form>
			</div>
		</div>
	)
}
