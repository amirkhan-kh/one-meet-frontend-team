import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/one_meet_logo.png';
import '../../../../styles/forms.css';

export default function CandidateUpdateProfile() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    timezone: '',
    profilePicture: null,
    bio: '',
  });

  const [timezones, setTimezones] = useState({});
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfileId, setUserProfileId] = useState('');
  const [candidateId, setCandidateId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    axios
      .get('https://api.onemeet.app/user/time-zones', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        if (res.data.success && Array.isArray(res.data.data)) {
          const grouped = res.data.data.reduce((acc, tz) => {
            const parts = tz.split(' - ');
            const region = parts[1]?.split('/')?.[0] || 'Other';
            if (!acc[region]) acc[region] = [];
            acc[region].push(tz);
            return acc;
          }, {});
          setTimezones(grouped);
        }
      });

    axios
      .get('https://api.onemeet.app/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(async res => {
        const user = res.data.data;
        setUserProfileId(user.id);
        setForm(prev => ({
          ...prev,
          firstName: user.firstName,
          lastName: user.lastName,
          timezone: user.timezone,
        }));

        const candidateRes = await axios.get(
          `https://api.onemeet.app/candidate/by-user/${user.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const candidate = candidateRes.data.data;
        setCandidateId(candidate.id);
        setForm(prev => ({ ...prev, bio: candidate.career_goals || '' }));
      })
      .catch(() => setError('Failed to load profile information'));
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setForm({ ...form, profilePicture: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      setLoading(true);
      setError('');
      setMessage('');

      let mediaId = null;
      if (form.profilePicture) {
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(form.profilePicture.type)) {
          setError('Only JPEG and PNG images are allowed.');
          setLoading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', form.profilePicture);

        const uploadRes = await axios.post(
          'https://api.onemeet.app/media/business/upload-avatar',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        mediaId = uploadRes.data?.data?.id;
      }

      await axios.patch(
        `https://api.onemeet.app/user/${userProfileId}`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          timezone: form.timezone,
          profilePicture: mediaId,
          profileCompleted: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await axios.patch(
        `https://api.onemeet.app/candidate/patchCandidate/${candidateId}`,
        {
          userProfileId,
          resumeUrl: '',
          careerGoals: form.bio,
          interviewReminderEnabled: true,
          marketingNotificationsEnabled: true,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage('Profile updated successfully.');
      navigate('/candidate');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='page-background'>
      <div className='form-container compact-form no-shadow'>
        <div className='logo-container'>
          <img src={Logo} alt='OneMeet Logo' className='logo bigger-logo' />
        </div>

        <h1 className='hero-subtitle fixed-width-subtitle match-bg-subtitle'>
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName' className='form-label'>First Name</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            className='input-field slim-input'
            placeholder='First name'
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor='lastName' className='form-label'>Last Name</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            className='input-field slim-input'
            placeholder='Last name'
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <label htmlFor='timezone' className='form-label'>Your Timezone</label>
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
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </optgroup>
            ))}
          </select>

          <label htmlFor='profilePicture' className='form-label'>Upload Profile Picture</label>
          <input
            type='file'
            id='profilePicture'
            name='profilePicture'
            className='input-field slim-input'
            onChange={handleChange}
          />

          <label htmlFor='bio' className='form-label'>Bio (optional)</label>
          <input
            type='text'
            id='bio'
            name='bio'
            className='input-field slim-input'
            placeholder='Bio (optional)'
            value={form.bio}
            onChange={handleChange}
          />

          {error && <p className='form-error'>{error}</p>}
          {message && <p className='form-success'>{message}</p>}

          <button
            type='submit'
            className={`ai-cta slim-cta ${loading ? 'inactive-cta' : 'active-cta'}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
