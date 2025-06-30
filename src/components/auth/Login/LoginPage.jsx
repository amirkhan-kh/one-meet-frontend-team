import axios from 'axios'
import { useState } from 'react'
import { FaGoogle, FaLinkedin } from 'react-icons/fa'
import Logo from '../../../assets/one_meet_logo.png'
import '../../../styles/forms.css'

export default function Login() {
	const [form, setForm] = useState({ email: '', password: '' })
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const isFilled = form.email.trim() !== '' && form.password.trim() !== ''

	const handleInputChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}


	
	const handleSubmit = async e => {
		e.preventDefault()
		if (!isFilled || loading) return

		try {
			setLoading(true)
			setError('')

			// 1. Login so'rovi
			const response = await axios.post(
				'https://api.onemeet.app/auth/login',
				{
					email: form.email,
					password: form.password,
				}
			)

			const { data } = response

			if (data.success) {
				const { accessToken, refreshToken, authRole } = data.data

				// 2. Tokenlarni saqlash
				localStorage.setItem('accessToken', accessToken)
				localStorage.setItem('refreshToken', refreshToken)

				// 3. auth/me dan userData olish
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

				// 4. Sahifaga o'tish
				const rolePath = authRole.toLowerCase()
				window.location.href = `/${rolePath}`
			} else {
				setError(data.reason || 'Login failed.')
			}
		} catch (err) {
			setError(err.response?.data?.reason || 'Something went wrong.')
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
					Welcome to OneMeet
				</h1>

				<form onSubmit={handleSubmit}>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='input-field slim-input'
						value={form.email}
						onChange={handleInputChange}
						required
					/>

					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						className='input-field slim-input'
						value={form.password}
						onChange={handleInputChange}
						required
					/>

					{error && <p className='form-error'>{error}</p>}

					<button
						type='submit'
						className={`ai-cta slim-cta ${
							isFilled ? 'active-cta' : 'inactive-cta'
						}`}
						disabled={!isFilled || loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

=======
	const handleSubmit = async e => {
		e.preventDefault()
		if (!isFilled || loading) return

		try {
			setLoading(true)
			setError('')

			// 1. Login so'rovi
			const response = await axios.post(
				'https://api.onemeet.app/auth/login',
				{
					email: form.email,
					password: form.password,
				}
			)

			const { data } = response

			if (data.success) {
				const { accessToken, refreshToken, authRole } = data.data

				// 2. Tokenlarni saqlash
				localStorage.setItem('accessToken', accessToken)
				localStorage.setItem('refreshToken', refreshToken)

				// 3. auth/me dan userData olish
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

				// 4. Sahifaga o'tish
				const rolePath = authRole.toLowerCase()
				window.location.href = `/${rolePath}`
			} else {
				setError(data.reason || 'Login failed.')
			}
		} catch (err) {
			setError(err.response?.data?.reason || 'Something went wrong.')
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
					Welcome to OneMeet
				</h1>

				<form onSubmit={handleSubmit}>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						className='input-field slim-input'
						value={form.email}
						onChange={handleInputChange}
						required
					/>

					<label htmlFor='password' className='form-label'>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						className='input-field slim-input'
						value={form.password}
						onChange={handleInputChange}
						required
					/>

					{error && <p className='form-error'>{error}</p>}

					<button
						type='submit'
						className={`ai-cta slim-cta ${
							isFilled ? 'active-cta' : 'inactive-cta'
						}`}
						disabled={!isFilled || loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>

>>>>>>> feature/Abduvoris
				<div className='separator'>or</div>

				<div className='oauth-buttons vertical-oauth'>
					<button className='btn-google'>
						<FaGoogle
							size={20}
							style={{ color: '#4285F4', marginRight: '8px' }}
						/>
						Continue with Google
					</button>
					<button className='btn-linkedin'>
						<FaLinkedin
							size={20}
							style={{ color: '#0A66C2', marginRight: '8px' }}
						/>
						Continue with LinkedIn
					</button>
				</div>

				<div className='form-links'>
					<AnimatedLink href='/signup' label='Create an account' />
					<AnimatedLink
						href='/forgot-password'
						label='Forgot password?'
					/>
				</div>
			</div>
		</div>
	)
}

function AnimatedLink({ href, label }) {
	return (
		<a href={href} className='animated-link'>
			{label}
		</a>
	)
}
