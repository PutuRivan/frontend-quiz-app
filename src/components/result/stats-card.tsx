interface StatCardProps {
  label: string
  value: number
}

export default function StatsCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-2xl p-6 text-center">
      <p className="text-gray-600 font-medium mb-2">{label}</p>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
