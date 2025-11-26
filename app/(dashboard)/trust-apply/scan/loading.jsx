export default function ScanLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scan Input Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-pulse"></div>
              </div>
              
              {/* Input Type Tabs */}
              <div className="flex space-x-2 mb-6 p-1 bg-gray-50 rounded-lg">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-32 animate-pulse"
                    style={{ animationDelay: `${item * 0.1}s` }}
                  ></div>
                ))}
              </div>

              {/* URL Input Field */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse"></div>
                  <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 animate-pulse"></div>
                </div>

                {/* Submit Button */}
                <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse mt-4"></div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-4 w-4 bg-blue-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-32 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div 
                      key={item}
                      className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded animate-pulse"
                      style={{ width: `${80 + item * 5}%`, animationDelay: `${item * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Analysis Preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-56 mb-6 animate-pulse"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Score Card */}
                <div className="space-y-4">
                  <div className="h-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
                
                {/* Risk Indicators */}
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-gray-200 rounded-full animate-pulse"></div>
                      <div 
                        className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                        style={{ width: `${60 + item * 10}%`, animationDelay: `${item * 0.1}s` }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Scans */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="space-y-2 flex-1">
                        <div 
                          className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                          style={{ width: `${70 + item * 5}%`, animationDelay: `${item * 0.1}s` }}
                        ></div>
                        <div 
                          className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                          style={{ width: `${50 + item * 8}%`, animationDelay: `${item * 0.15}s` }}
                        ></div>
                      </div>
                      <div className="h-6 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse ml-2"></div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div 
                        className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                        style={{ width: '40%', animationDelay: `${item * 0.2}s` }}
                      ></div>
                      <div 
                        className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
                        style={{ width: '30%', animationDelay: `${item * 0.25}s` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Guidance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-5 w-5 bg-yellow-200 rounded animate-pulse"></div>
                <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 animate-pulse"></div>
              </div>
              
              <div className="space-y-3">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="h-2 w-2 bg-gray-200 rounded-full mt-2 animate-pulse"></div>
                    <div 
                      className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded flex-1 animate-pulse"
                      style={{ animationDelay: `${item * 0.1}s` }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 text-white">
              <div className="h-6 bg-blue-400 rounded w-32 mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="text-center">
                    <div className="h-8 bg-blue-400 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-blue-400 rounded w-16 mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading Progress Bar */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
}