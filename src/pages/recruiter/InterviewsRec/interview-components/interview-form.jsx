'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Loader2, Search } from 'lucide-react'

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

export const InterviewForm = ({ onSuccess, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState(null)
  const [candidates, setCandidates] = useState([])
  const [isSearchingCandidates, setIsSearchingCandidates] = useState(false)
  const [candidateSearchTerm, setCandidateSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    recruiterId: '',
    candidateId: '',
    companyId: '',
    type: '',
    profession: '',
    language: '',
    durationMinutes: 45,
    deadline: '',
    contextPrompt: '',
  })

  useEffect(() => {
    loadConfig()
    initializeUserData()
  }, [])

  const initializeUserData = () => {
    const userData = interviewAPI.getCurrentUser()
    if (userData) {
      setFormData(prev => ({
        ...prev,
        recruiterId: userData.id,
        companyId: userData.id, // Agar real company ID bo‘lsa, shu yerga joylashtiring
      }))
    }
  }

  const loadConfig = async () => {
    try {
      const response = await interviewAPI.getInterviewConfig()
      const configData = response.data

      if (
        !configData ||
        !configData.interviewTypes ||
        !configData.supportedLanguages
      ) {
        throw new Error('Konfiguratsiya to‘liq emas')
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
      toast.error('Failed to load interview configuration')
      console.error(error)
    }
  }

  const searchCandidates = async searchTerm => {
    if (!searchTerm.trim()) {
      setCandidates([])
      return
    }

    try {
      setIsSearchingCandidates(true)
      const mockCandidates = [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ].filter(
        c =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setCandidates(mockCandidates)
    } catch (error) {
      toast.error('Failed to search candidates')
      console.error(error)
    } finally {
      setIsSearchingCandidates(false)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const deadlineISO = new Date(formData.deadline).toISOString()

      const requestData = {
        recruiterId: formData.recruiterId,
        candidateId: formData.candidateId,
        companyId: formData.companyId,
        type: formData.type,
        profession: formData.profession,
        language: formData.language,
        durationMinutes: formData.durationMinutes,
        deadline: deadlineISO,
        contextPrompt: formData.contextPrompt || '',
      }

      console.log('Yuborilayotgan maʼlumot:', requestData)

      const interview = await interviewAPI.createInterview(requestData)
      toast.success('Interview created successfully')
      onSuccess?.(interview)
    } catch (error) {
      toast.error('Failed to create interview')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCandidateSelect = candidate => {
    updateFormData('candidateId', candidate.id)
    setCandidateSearchTerm(`${candidate.name} (${candidate.email})`)
    setCandidates([])
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
          <Label htmlFor='candidateSearch'>Search Candidate *</Label>
          <div className='relative'>
            <Input
              id='candidateSearch'
              value={candidateSearchTerm}
              onChange={e => {
                setCandidateSearchTerm(e.target.value)
                searchCandidates(e.target.value)
              }}
              placeholder='Search by name or email...'
              required={!formData.candidateId}
            />
            <Search className='absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400' />

            {candidates.length > 0 && (
              <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                {candidates.map(candidate => (
                  <button
                    key={candidate.id}
                    type='button'
                    className='w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50'
                    onClick={() => handleCandidateSelect(candidate)}
                  >
                    <div className='font-medium'>{candidate.name}</div>
                    <div className='text-sm text-gray-500'>
                      {candidate.email}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {isSearchingCandidates && (
              <div className='absolute right-10 top-1/2 -translate-y-1/2'>
                <Loader2 className='h-4 w-4 animate-spin' />
              </div>
            )}
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
              <SelectValue placeholder='Select interview type' />
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
          <Label htmlFor='contextPrompt'>Context Prompt (optional)</Label>
          <Textarea
            id='contextPrompt'
            value={formData.contextPrompt}
            onChange={e => updateFormData('contextPrompt', e.target.value)}
            rows={4}
            placeholder='Optional instructions for interviewer...'
          />
        </div>
      </div>

      <div className='flex justify-end gap-4'>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type='submit' disabled={isLoading || !formData.candidateId}>
          {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          Create Interview
        </Button>
      </div>
    </form>
  )
}
