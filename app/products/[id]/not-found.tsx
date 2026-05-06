import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Search, Package } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Product Not Found</h1>
          <p className="text-muted-foreground text-sm">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/products">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full border-border hover:bg-muted text-foreground flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse All Categories
            </Button>
          </Link>
        </div>

        <div className="mt-8 p-4 bg-muted/30 rounded-xl border border-border">
          <p className="text-xs text-muted-foreground">
            If you believe this is an error, please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}
