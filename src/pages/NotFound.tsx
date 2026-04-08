import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Truck } from "lucide-react";

const NotFound = () => (
  <div className="flex items-center justify-center py-32 md:py-40">
    <div className="text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
        <Truck className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-6xl md:text-8xl font-bold text-gradient mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        This route doesn't exist. Let's get you back on track.
      </p>
      <Link to="/">
        <Button className="gap-2 h-11 px-6 shadow-lg shadow-primary/20">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
