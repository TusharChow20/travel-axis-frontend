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

const fallbackImages: Record<string, string> = {
  Beach:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  Adventure:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
  Trekking:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  Nature:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  Cultural:
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
  Historical:
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
  Wildlife:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  Sylhet:
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
  Chittagong:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
  Khulna:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  Rangamati:
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
  default:
    "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80",
};

const getFallbackImage = (tourType?: string, divisionName?: string): string => {
  if (tourType && fallbackImages[tourType]) return fallbackImages[tourType];
  if (divisionName && fallbackImages[divisionName])
    return fallbackImages[divisionName];
  return fallbackImages.default;
};

export const TourCard = ({ tour }: { tour: ITour }) => {
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            tour.images?.[0] ||
            getFallbackImage(tour.tourType, tour.division?.name)
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
