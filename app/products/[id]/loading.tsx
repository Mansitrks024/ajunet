export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Loading */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-16 h-8 bg-muted rounded-lg animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Image Loading */}
          <div>
            <div className="bg-card rounded-2xl border border-border flex items-center justify-center h-72 mb-4">
              <div className="w-20 h-20 bg-muted rounded-xl animate-pulse"></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl border border-border h-20 flex items-center justify-center">
                  <div className="w-12 h-4 bg-muted rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Loading */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-20 h-6 bg-muted rounded-full animate-pulse"></div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 bg-muted rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="w-3/4 h-8 bg-muted rounded-lg mb-2 animate-pulse"></div>
            <div className="w-1/2 h-4 bg-muted rounded mb-6 animate-pulse"></div>

            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 mb-8 border border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="w-8 h-8 bg-muted rounded mx-auto mb-1 animate-pulse"></div>
                    <div className="w-12 h-3 bg-muted rounded mx-auto animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="w-32 h-4 bg-muted rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex justify-between py-3 border-b border-border/50">
                      <div className="w-20 h-3 bg-muted rounded animate-pulse"></div>
                      <div className="w-24 h-3 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="w-24 h-4 bg-muted rounded mb-4 animate-pulse"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 bg-muted rounded mt-0.5 animate-pulse"></div>
                      <div className="w-32 h-3 bg-muted rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="w-full h-12 bg-muted rounded-xl animate-pulse"></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="w-full h-10 bg-muted rounded-xl animate-pulse"></div>
                <div className="w-full h-10 bg-muted rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-card rounded-2xl border border-border p-8">
          <div className="w-32 h-6 bg-muted rounded mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-muted rounded animate-pulse"></div>
                  <div className="w-48 h-3 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
