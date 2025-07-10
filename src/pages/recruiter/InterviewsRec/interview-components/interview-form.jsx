import { Loader2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { interviewAPI } from '@/lib/api'

// ✅ Helper to get default datetime-local format (YYYY-MM-DDTHH:mm)
const getCurrentDateTimeLocal = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()) // adjust for local tz
  return now.toISOString().slice(0, 16)
}

export const InterviewForm = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState(null)
  const [emailInput, setEmailInput] = useState('')
  const [emailList, setEmailList] = useState([])

  const [formData, setFormData] = useState({
    recruiterId: '',
    type: '',
    profession: '',
    language: '',
    durationMinutes: 45,
    deadline: getCurrentDateTimeLocal(), // ✅ set default
    contextPrompt: '',
  })

  useEffect(() => {
    initializeUserData()
    loadConfig()
  }, [])

 const initializeUserData = async () => {
	try {
		const recruiterId = await interviewAPI.getRecruiterId()
		setFormData(prev => ({
			...prev,
			recruiterId,
		}))
		console.log("✅ Recruiter ID set in formData:", recruiterId)
	} catch (err) {
		toast.error("Recruiterni aniqlab bo‘lmadi")
	}
}


  const loadConfig = async () => {
    try {
      const response = await interviewAPI.getInterviewConfig()
      const configData = response.data

      if (!configData?.interviewTypes || !configData?.supportedLanguages) {
        throw new Error('Interview konfiguratsiyasi to‘liq emas')
      }

      setConfig({
        interviewTypes: configData.interviewTypes,
        supportedLanguages: configData.supportedLanguages,
        durations: configData.durations || [15, 30, 45, 60],
      })

      setFormData(prev => ({
        ...prev,
        type: configData.interviewTypes[0],
        language: configData.supportedLanguages[0],
        durationMinutes: configData.durations?.[0] || 45,
      }))
    } catch (error) {
      toast.error('Interview konfiguratsiyani yuklab bo‘lmadi')
      console.error(error)
    }
  }

  const handleEmailKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const email = emailInput.trim()
      if (email && !emailList.includes(email)) {
        if (!/\S+@\S+\.\S+/.test(email)) {
          toast.error('Email formati noto‘g‘ri')
          return
        }
        setEmailList(prev => [...prev, email])
        setEmailInput('')
      }
    }
  }

  const removeEmail = (emailToRemove) => {
    setEmailList(prev => prev.filter(email => email !== emailToRemove))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (emailList.length === 0) {
      toast.error('Iltimos, kamida bitta email kiriting')
      return
    }

    setIsLoading(true)
    try {
      const deadlineISO = new Date(formData.deadline).toISOString()

      const requestData = {
        recruiterId: formData.recruiterId,
        candidatesEmailList: emailList,
        type: formData.type,
        profession: formData.profession,
        language: formData.language,
        durationMinutes: formData.durationMinutes,
        deadline: deadlineISO,
        contextPrompt: formData.contextPrompt || '',
      }

      console.log("📤 Submitting interview:", requestData) // ✅ Debug log

      await interviewAPI.createInterview(requestData)
      toast.success('Interview(lar) muvaffaqiyatli yaratildi')
      onSuccess?.()
    } catch (error) {
      toast.error('Interview yaratishda xatolik')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!config) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-6 w-6 animate-spin' />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='md:col-span-2'>
          <Label htmlFor='candidateEmails'>Enter Candidate Emails *</Label>
          <Input
            id='candidateEmails'
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            onKeyDown={handleEmailKeyDown}
            placeholder='Type email and press Enter...'
          />
          <div className='mt-2 flex flex-wrap gap-2'>
            {emailList.map(email => (
              <span
                key={email}
                className='flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm'
              >
                {email}
                <button
                  type='button'
                  className='ml-2 text-gray-600 hover:text-red-500'
                  onClick={() => removeEmail(email)}
                >
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor='profession'>Profession *</Label>
          <Input
            id='profession'
            value={formData.profession}
            onChange={e => updateFormData('profession', e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor='type'>Interview Type *</Label>
          <Select
            value={formData.type}
            onValueChange={value => updateFormData('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select type' />
            </SelectTrigger>
            <SelectContent>
              {config.interviewTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='language'>Language *</Label>
          <Select
            value={formData.language}
            onValueChange={value => updateFormData('language', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
              {config.supportedLanguages.map(lang => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor='durationMinutes'>Duration *</Label>
          <Select
            value={formData.durationMinutes.toString()}
            onValueChange={value =>
              updateFormData('durationMinutes', parseInt(value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select duration' />
            </SelectTrigger>
            <SelectContent>
              {config.durations.map(min => (
                <SelectItem key={min} value={min.toString()}>
                  {min} minutes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='md:col-span-2'>
          <Label htmlFor='deadline'>Deadline *</Label>
          <Input
            id='deadline'
            type='datetime-local'
            value={formData.deadline}
            onChange={e => updateFormData('deadline', e.target.value)}
            required
          />
        </div>

        <div className='md:col-span-2'>
          <Label htmlFor='contextPrompt'>Context Prompt</Label>
          <Textarea
            id='contextPrompt'
            value={formData.contextPrompt}
            onChange={e => updateFormData('contextPrompt', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type='submit' disabled={isLoading || emailList.length === 0}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Create Interview
        </Button>
      </div>
    </form>
  )
}
