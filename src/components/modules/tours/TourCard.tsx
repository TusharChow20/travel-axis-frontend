import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ITour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  costFrom: number;
  images: string[];
  division: { _id: string; name: string };
  tourType: string;
  location: string;
}

export const TourCard = ({ tour }: { tour: ITour }) => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            tour.images?.[0] ||
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
          }
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs">
            {tour.tourType || "Tour"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">4.8</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1 text-muted-foreground mb-2">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="text-xs truncate">
            {tour.division?.name || tour.location || "Bangladesh"}
          </span>
        </div>

        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
          {tour.title}
        </h3>

        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {tour.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">From</span>
            <p className="text-lg font-bold text-primary">
              ৳{tour.costFrom?.toLocaleString() || "N/A"}
            </p>
          </div>
          <Button asChild size="sm" className="gap-1">
            <Link href={`/tours/${tour.slug}`}>
              View
              <ArrowRight className="h-3 w-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
