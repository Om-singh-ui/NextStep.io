export default function ScanLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-1/3 mx-auto mb-6 animate-pulse"></div>
          <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scan Input Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
              
              {/* Input Type Selector */}
              <div className="flex space-x-3 mb-8">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl w-28 animate-pulse"
                  ></div>
                ))}
              </div>

              {/* Input Section */}
              <div className="space-y-6">
                {/* URL Input Field */}
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/5 animate-pulse"></div>
                  <div className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg animate-pulse"></div>
                  <div className="h-9 bg-gray-200 rounded w-36 animate-pulse"></div>
                </div>

                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                  <div className="h-16 bg-gray-100 rounded-lg mx-auto mb-4 w-16 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
                </div>

                {/* Submit Button */}
                <div className="h-14 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-pulse"></div>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <div className="h-6 bg-gradient-to-r from-blue-200 to-indigo-200 rounded w-1/4 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className="h-3 w-3 bg-blue-300 rounded-full animate-pulse"></div>
                      <div className="h-4 bg-gradient-to-r from-blue-200 to-indigo-200 rounded flex-1 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Progress Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
              
              {/* Progress Steps */}
              <div className="space-y-6">
                {[
                  { width: 'w-3/4' },
                  { width: 'w-1/2' },
                  { width: 'w-5/6' },
                  { width: 'w-2/3' }
                ].map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-12 animate-pulse"></div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse ${step.width}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Scan History Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* History Items */}
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div 
                    key={item} 
                    className="p-4 border border-gray-100 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="space-y-2 flex-1">
                        <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                      <div className="h-6 w-16 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full animate-pulse ml-4"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 mb-6 animate-pulse"></div>
              
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
              <div className="h-7 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <div className="h-5 w-5 bg-purple-300 rounded-full mt-1 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded flex-1 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button Skeleton */}
        <div className="fixed bottom-8 right-8">
          <div className="h-14 w-14 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full shadow-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 