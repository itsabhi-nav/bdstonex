'use client'

export default function LoadingSpinner({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="flex items-center gap-3 text-gray-300">
        <span className="inline-block w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></span>
        <span className="text-sm">{label}</span>
      </div>
    </div>
  )
}


