export function MainLayout({ children }) {
	return (
		<div className='min-h-screen bg-gray-50'>
			<div className='container mx-auto px-6 py-8 max-w-7xl'>
				{children}
			</div>
		</div>
	)
}
