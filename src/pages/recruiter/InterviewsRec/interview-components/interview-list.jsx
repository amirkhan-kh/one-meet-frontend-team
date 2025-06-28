"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Clock, Edit, Eye, Filter, Mail, Trash2, User } from "lucide-react"
import { useEffect, useState } from "react"

import { interviewAPI } from '@/lib/api'
import { toast } from "sonner"



export const InterviewList = ({ onEdit, onView, onDelete, refreshKey }) => {
  const [interviews, setInterviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [filters, setFilters] = useState({
    status: "ALL", // Updated default value to "ALL"
    sortBy: "createdAt",
    direction: "desc",
  })
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  })

  useEffect(() => {
    const userData = interviewAPI.getCurrentUser()
    setCurrentUser(userData)
  }, [])

  useEffect(() => {
    if (currentUser) {
      loadInterviews()
    }
  }, [currentUser, pagination.page, filters, refreshKey])

  // const loadInterviews = async () => {
  //   if (!currentUser) return

  //   try {
  //     setIsLoading(true)
  //     let response

  //     const pageable = {
  //       page: pagination.page,
  //       size: pagination.size,
  //     }

  //     if (currentUser.authRole === "RECRUITER") {
  //       response = await interviewAPI.getInterviewsByRecruiter(currentUser.id, filters, pageable)
  //     } else if (currentUser.authRole === "CANDIDATE") {
  //       response = await interviewAPI.getCandidateInterviews(currentUser.id, pageable)
  //     } else if (currentUser.authRole === "COMPANY") {
  //       response = await interviewAPI.getInterviewsByCompany(currentUser.id, filters, pageable)
  //     } else {
  //       throw new Error("Unsupported user role for interview listing")
  //     }

  //     setInterviews(response.content)
  //     setPagination((prev) => ({
  //       ...prev,
  //       totalElements: response.totalElements,
  //       totalPages: response.totalPages,
  //     }))
  //   } catch (error) {
  //     toast.error("Failed to load interviews")
  //     console.error(error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }
 const loadInterviews = async () => {
  if (!currentUser) {
    console.log("currentUser mavjud emas")
    return
  }

  try {
    setIsLoading(true)
    console.log("Intervyular yuklanmoqda...", { currentUser, pagination, filters })
    
    let response

    const pageable = {
      page: pagination.page || 0,
      size: pagination.size || 10,
      sort: "createdAt,desc" // Bu muhim!
    }

    // User role ga qarab turli xil API chaqiruvlar
    if (currentUser.authRole === "RECRUITER") {
      console.log("RECRUITER uchun intervyular yuklanmoqda...")
      response = await interviewAPI.getInterviewsByRecruiter(currentUser.id, filters, pageable)
      
    } else if (currentUser.authRole === "CANDIDATE") {
      console.log("CANDIDATE uchun intervyular yuklanmoqda...")
      response = await interviewAPI.getCandidateInterviews(currentUser.id, pageable)
      
    } else if (currentUser.authRole === "COMPANY") {
      console.log("COMPANY uchun intervyular yuklanmoqda...")
      // COMPANY uchun filters ham kerak
      const companyFilters = filters || {}
      response = await interviewAPI.getInterviewsByCompany(currentUser.id, companyFilters, pageable)
      
    } else {
      throw new Error(`Noma'lum user role: ${currentUser.authRole}`)
    }

    console.log("API javob:", response)

    // Response strukturasini tekshirish
    if (!response) {
      throw new Error("API dan javob kelmadi")
    }

    // Ma'lumotlarni o'rnatish
    const interviewsData = response.content || response.data || response
    const totalElements = response.totalElements || response.total || 0
    const totalPages = response.totalPages || Math.ceil(totalElements / pageable.size) || 0

    setInterviews(Array.isArray(interviewsData) ? interviewsData : [])
    setPagination((prev) => ({
      ...prev,
      totalElements,
      totalPages,
    }))

    console.log("Ma'lumotlar muvaffaqiyatli yuklandi:", { 
      interviewsCount: interviewsData?.length, 
      totalElements, 
      totalPages 
    })

  } catch (error) {
    console.error("loadInterviews xatosi:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      currentUser,
      pagination,
      filters
    })

    // Xato turlariga qarab turli xil xabarlar
    if (error.message.includes("Unauthorized")) {
      toast.error("Avtorizatsiya muammosi. Qaytadan kiring.")
      // Login sahifasiga yo'naltirish qo'shishingiz mumkin
    } else if (error.response?.status === 500) {
      toast.error("Server xatosi. Iltimos keyinroq urinib ko'ring.")
    } else if (error.response?.status === 404) {
      toast.error("Ma'lumot topilmadi.")
    } else {
      toast.error(`Intervyularni yuklashda xatolik: ${error.message}`)
    }
  } finally {
    setIsLoading(false)
  }
}
  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return "bg-blue-100 text-blue-800"
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800"
      case "COMPLETED":
        return "bg-green-100 text-green-800"
      case "CANCELLED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 0 })) // Reset to first page
  }

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please log in to view interviews.</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Status:</span>
              <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Status</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <Select value={filters.sortBy} onValueChange={(value) => updateFilter("sortBy", value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="profession">Profession</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Order:</span>
              <Select
                value={filters.direction}
                onValueChange={(value) => updateFilter("direction", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="desc">Newest</SelectItem>
                  <SelectItem value="asc">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interview List */}
      {interviews.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
            <p className="text-gray-600">
              {currentUser.authRole === "RECRUITER"
                ? "Create your first interview to get started."
                : "No interviews scheduled for you yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-semibold text-gray-900">{interview.profession}</h3>
                      <Badge className={getStatusColor(interview.status)}>{interview.status}</Badge>
                      <Badge variant="outline">{interview.type}</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{interview.candidateName || "Candidate"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{interview.candidateEmail || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{interview.durationMinutes} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(interview.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => onView?.(interview)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {currentUser.authRole === "RECRUITER" && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => onEdit?.(interview)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete?.(interview)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="outline"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 0}
          >
            Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {pagination.page + 1} of {pagination.totalPages}({pagination.totalElements} total interviews)
          </span>

          <Button
            variant="outline"
            onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page >= pagination.totalPages - 1}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
