"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2, Loader2, Image } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TourFormModal } from "@/components/modules/dashboard/admin/TourFormModal";
import { toast } from "sonner";

interface ITour {
  _id: string;
  title: string;
  slug: string;
  costFrom: number;
  location: string;
  tourType: string;
  images: string[];
  division: { _id: string; name: string } | null;
  tourDuration: { _id: string; name: string } | null;
  maxPeople: number;
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTour, setEditTour] = useState<ITour | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("searchTerm", search);
      params.append("page", page.toString());
      params.append("limit", limit.toString());
      const res = await axiosInstance.get(`/tour?${params.toString()}`);
      setTours(res.data.data?.data || []);
      const meta = res.data.data?.meta;
      setTotalPages(meta?.totalPages || meta?.totalPage || 1);
    } catch {
      setTours([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [search, page]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/tour/${deleteId}`);
      toast.success("Tour deleted successfully");
      fetchTours();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete tour");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manage Tours</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create, edit and delete tours
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="gap-2 shrink-0"
        >
          <Plus className="h-4 w-4" />
          Add Tour
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tours..."
          className="pl-9"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tours.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Image className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="font-medium text-foreground">No tours found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first tour to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Tour
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Division
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Price
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Max People
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tours.map((tour, index) => (
                  <tr
                    key={tour._id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                      index % 2 === 0 ? "" : "bg-muted/10"
                    }`}
                  >
                    {/* Tour */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-muted">
                          {tour.images?.[0] ? (
                            <img
                              src={tour.images[0]}
                              alt={tour.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Image className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {tour.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {tour.location || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Division */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">
                        {tour.division?.name || "—"}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3">
                      {tour.tourType ? (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {tour.tourType}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-primary">
                        ৳{tour.costFrom?.toLocaleString() || "—"}
                      </span>
                    </td>

                    {/* Max People */}
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">
                        {tour.maxPeople || "—"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => setEditTour(tour)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:border-destructive"
                          onClick={() => setDeleteId(tour._id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 p-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(p)}
                className="w-9"
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <TourFormModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          setShowCreateModal(false);
          fetchTours();
        }}
      />

      {/* Edit Modal */}
      <TourFormModal
        open={!!editTour}
        onClose={() => setEditTour(null)}
        onSuccess={() => {
          setEditTour(null);
          fetchTours();
        }}
        tour={editTour}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tour</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tour? This action cannot be
              undone. All associated images will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
