import { Outlet } from 'react-router-dom'
import { CompanyHeader } from '@/pages/company/components-compony/header-company'
import './style.css'

export const CompanyDashboard = () => {
	return (
		 <>
      <CompanyHeader />
      <main className='min-h-screen pt-20 bg-[#cacdd2] relative overflow-hidden'>
        {/* Outlet – eng yuqorida bo'lishi uchun yuqori z-index */}
        <div className="relative z-10">
          <Outlet />
        </div>

        {/* Wave background – pastki qatlam */}
        <div className="htmlmain absolute bg-gr top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="bodymain w-full h-full">
            <div className="ocean w-full h-full">
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          </div>
        </div>
      </main>
    </>
	)
}
