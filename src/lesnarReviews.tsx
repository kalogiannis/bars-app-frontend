import React from 'react'

const Reviews = () => {
  return (
    <div>
        {data?.summary && (
  <div className="space-y-2 mb-6">
    <div className="flex items-center space-x-2">
      <span className="text-3xl font-bold">{data.summary.average.toFixed(1)}</span>
      <span className="flex">
        {Array(5).fill(0).map((_, i) => (
          <svg key={i}
               className={`w-5 h-5 ${
                 i < Math.round(data.summary.average) ? "text-amber-400" : "text-gray-500"
               }`} viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c...Z" /> {/* star path */}
          </svg>
        ))}
      </span>
      <span>({data.summary.total})</span>
    </div>

    {([5,4,3,2,1] as const).map((star) => {
      const count = data.summary.counts[star];
      const pct = data.summary.total
        ? (count / data.summary.total) * 100
        : 0;
      return (
        <div key={star} className="flex items-center space-x-2">
          <span className="w-12 text-right">{["Terrible","Poor","Average","Good","Excellent"][5-star]}</span>
          <div className="relative flex-1 h-2 bg-gray-700 rounded">
            <div
              className="absolute top-0 left-0 h-2 bg-amber-400 rounded"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-6 text-right">{count}</span>
        </div>
      );
    })}
  </div>
)}

    </div>
  )
}

export default Reviews