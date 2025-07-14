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

  const [timezones, setTimezones] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
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

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!searchQuery.trim()) return

    const timeout = setTimeout(() => {
      axios
        .get(`https://api.onemeet.app/company/search?query=${searchQuery}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          if (res.data.success && Array.isArray(res.data.data)) {
            setSearchResults(res.data.data)
          }
        })
        .catch(() => setSearchResults([]))
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchQuery])

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
        !['image/jpeg', 'image/jpg', 'image/png'].includes(form.profilePicture.type)
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
          profileCompleted: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const userProfile = userRes.data.data
      localStorage.setItem('userProfile', JSON.stringify(userProfile))
