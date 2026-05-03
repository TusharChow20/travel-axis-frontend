"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";

const tourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().min(0).optional(),
  tourType: z.string().optional(),
  maxPeople: z.number().min(1).optional(),
  minAge: z.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  division: z.string().min(1, "Division is required"),
  tourDuration: z.string().min(1, "Tour duration is required"),
});

type TourForm = z.infer<typeof tourSchema>;

const tourTypes = [
  "Adventure",
  "Beach",
  "Trekking",
  "Nature",
  "Cultural",
  "Historical",
  "Wildlife",
];

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  tour?: any;
}

export const TourFormModal = ({ open, onClose, onSuccess, tour }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [divisions, setDivisions] = useState<{ _id: string; name: string }[]>(
    [],
  );
  const [tourDurations, setTourDurations] = useState<
    { _id: string; name: string }[]
  >([]);
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreviews, setImagesPreviews] = useState<string[]>([]);
  const [included, setIncluded] = useState<string[]>([""]);
  const [excluded, setExcluded] = useState<string[]>([""]);
  const [amenities, setAmenities] = useState<string[]>([""]);
  const [tourPlan, setTourPlan] = useState<string[]>([""]);
  const isEdit = !!tour;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TourForm>({ resolver: zodResolver(tourSchema) });

  // ✅ Load divisions and durations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [divRes, durRes] = await Promise.all([
          axiosInstance.get("/division"),
          axiosInstance.get("/tour-duration"),
        ]);
        setDivisions(divRes.data.data || []);
        setTourDurations(durRes.data.data || []);
      } catch {}
    };
    if (open) fetchData();
  }, [open]);

  // ✅ Populate form on edit
  useEffect(() => {
    if (tour && open) {
      reset({
        title: tour.title || "",
        description: tour.description || "",
        location: tour.location || "",
        costFrom: tour.costFrom || undefined,
        tourType: tour.tourType || "",
        maxPeople: tour.maxPeople || undefined,
        minAge: tour.minAge || undefined,
        startDate: tour.startDate ? tour.startDate.split("T")[0] : "",
        endDate: tour.endDate ? tour.endDate.split("T")[0] : "",
        departureLocation: tour.departureLocation || "",
        arrivalLocation: tour.arrivalLocation || "",
        division: tour.division?._id || tour.division || "",
        tourDuration: tour.tourDuration?._id || tour.tourDuration || "",
      });
      setIncluded(tour.included?.length ? tour.included : [""]);
      setExcluded(tour.excluded?.length ? tour.excluded : [""]);
      setAmenities(tour.amenities?.length ? tour.amenities : [""]);
      setTourPlan(tour.tourPlan?.length ? tour.tourPlan : [""]);
      setImagesPreviews(tour.images || []);
    } else if (!tour && open) {
      reset();
      setIncluded([""]);
      setExcluded([""]);
      setAmenities([""]);
      setTourPlan([""]);
      setImages([]);
      setImagesPreviews([]);
    }
  }, [tour, open, reset]);

  // ✅ Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    const previews = files.map((f) => URL.createObjectURL(f));
    setImagesPreviews(previews);
  };

  // ✅ Dynamic array field helpers
  const updateArrayField = (
    arr: string[],
    setArr: (v: string[]) => void,
    index: number,
    value: string,
  ) => {
    const updated = [...arr];
    updated[index] = value;
    setArr(updated);
  };

  const addArrayField = (arr: string[], setArr: (v: string[]) => void) => {
    setArr([...arr, ""]);
  };

  const removeArrayField = (
    arr: string[],
    setArr: (v: string[]) => void,
    index: number,
  ) => {
    setArr(arr.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: TourForm) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // ✅ Clean arrays
      const cleanArr = (arr: string[]) => arr.filter((s) => s.trim() !== "");

      const payload = {
        ...data,
        included: cleanArr(included),
        excluded: cleanArr(excluded),
        amenities: cleanArr(amenities),
        tourPlan: cleanArr(tourPlan),
      };

      formData.append("data", JSON.stringify(payload));
      images.forEach((img) => formData.append("files", img));

      if (isEdit) {
        await axiosInstance.patch(`/tour/${tour._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Tour updated successfully!");
      } else {
        await axiosInstance.post("/tour/create-tour", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Tour created successfully!");
      }

      onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save tour");
    } finally {
      setIsLoading(false);
    }
  };

  const ArrayField = ({
    label,
    values,
    setValues,
    placeholder,
  }: {
    label: string;
    values: string[];
    setValues: (v: string[]) => void;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      {values.map((val, i) => (
        <div key={i} className="flex gap-2">
          <Input
            placeholder={placeholder}
            value={val}
            onChange={(e) =>
              updateArrayField(values, setValues, i, e.target.value)
            }
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="shrink-0 h-9 w-9"
            onClick={() => removeArrayField(values, setValues, i)}
            disabled={values.length === 1}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="gap-1 h-8"
        onClick={() => addArrayField(values, setValues)}
      >
        <Plus className="h-3 w-3" />
        Add {label}
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Tour" : "Create New Tour"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Tour title"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-destructive text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Tour description..."
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                {...register("description")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="division">Division *</Label>
              <select
                id="division"
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                {...register("division")}
              >
                <option value="">Select division</option>
                {divisions.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.division && (
                <p className="text-destructive text-xs">
                  {errors.division.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tourDuration">Tour Duration *</Label>
              <select
                id="tourDuration"
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                {...register("tourDuration")}
              >
                <option value="">Select duration</option>
                {tourDurations.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              {errors.tourDuration && (
                <p className="text-destructive text-xs">
                  {errors.tourDuration.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tourType">Tour Type</Label>
              <select
                id="tourType"
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                {...register("tourType")}
              >
                <option value="">Select type</option>
                {tourTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="costFrom">Price (৳)</Label>
              <Input
                id="costFrom"
                type="number"
                placeholder="5000"
                {...register("costFrom", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Cox's Bazar"
                {...register("location")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxPeople">Max People</Label>
              <Input
                id="maxPeople"
                type="number"
                placeholder="20"
                {...register("maxPeople", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minAge">Min Age</Label>
              <Input
                id="minAge"
                type="number"
                placeholder="12"
                {...register("minAge", { valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" type="date" {...register("startDate")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" type="date" {...register("endDate")} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="departureLocation">Departure Location</Label>
              <Input
                id="departureLocation"
                placeholder="Dhaka"
                {...register("departureLocation")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="arrivalLocation">Arrival Location</Label>
              <Input
                id="arrivalLocation"
                placeholder="Cox's Bazar"
                {...register("arrivalLocation")}
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-2">
            <Label>Images</Label>
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {imagesPreviews.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {imagesPreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview ${i}`}
                    className="w-16 h-16 object-cover rounded-lg border border-border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Array Fields */}
          <ArrayField
            label="Included"
            values={included}
            setValues={setIncluded}
            placeholder="e.g. Hotel, Transport"
          />
          <ArrayField
            label="Excluded"
            values={excluded}
            setValues={setExcluded}
            placeholder="e.g. Personal expenses"
          />
          <ArrayField
            label="Amenities"
            values={amenities}
            setValues={setAmenities}
            placeholder="e.g. WiFi, Guide"
          />
          <ArrayField
            label="Tour Plan"
            values={tourPlan}
            setValues={setTourPlan}
            placeholder="e.g. Day 1: Arrival and check-in"
          />

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {isEdit ? "Updating..." : "Creating..."}
                </>
              ) : isEdit ? (
                "Update Tour"
              ) : (
                "Create Tour"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
