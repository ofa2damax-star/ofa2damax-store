import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, School, Home as HomeIcon, Shirt, Ruler, Save, LogOut, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import PullToRefresh from "@/components/PullToRefresh";
import MobileSelect from "@/components/MobileSelect";
import AuthLayout from "@/components/AuthLayout";
import { toast } from "sonner";

const gradeOptions = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];
const clothesSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const shoeSizes = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

export default function MyProfile() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    grade: "",
    clothes_size: "",
    shoe_size: "",
    home_address: "",
    special_requests: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const queryClient = useQueryClient();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      try {
        return await base44.auth.me();
      } catch (e) {
        return null;
      }
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || "",
        email: user.email || "",
        phone: user.phone || "",
        grade: user.grade || "",
        clothes_size: user.clothes_size || "",
        shoe_size: user.shoe_size || "",
        home_address: user.home_address || "",
        special_requests: user.special_requests || "",
      });
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data) => {
      await base44.auth.updateMe(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setIsEditing(false);
      toast.success("Profile updated successfully! ✨");
    },
    onError: (error) => {
      toast.error("Failed to update profile");
    },
  });

  const handleSave = () => {
    updateProfileMutation.mutate(formData);
  };

  const handleLogout = () => {
    base44.auth.logout();
  };

  const handleDeleteAccount = async () => {
    try {
      // Permanently delete the user account and all associated data
      await base44.auth.deleteMe();
      toast.success("Account deleted successfully");
      // Redirect to login after deletion
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to delete account");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AuthLayout
      title="My Profile"
      subtitle="Your personal information"
      icon={<User className="w-8 h-8 text-primary" />}
    >
      <PullToRefresh onRefresh={() => queryClient.invalidateQueries({ queryKey: ['user-profile'] })} className="safe-inset">
        <div className="space-y-6 pb-8 safe-viewport">
          {/* Personal Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-3">Personal Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm font-semibold">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                  aria-label="Full name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                  aria-label="Email address"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10"
                  placeholder="(555) 123-4567"
                  aria-label="Phone number"
                />
              </div>
            </div>
          </div>

          {/* School Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-3">School Details</h3>
            
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Grade Level</Label>
              <MobileSelect
                options={gradeOptions}
                value={formData.grade}
                onChange={(value) => handleInputChange('grade', value)}
                placeholder="Select your grade"
                disabled={!isEditing}
                icon={<School className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Clothes Size</Label>
                <MobileSelect
                  options={clothesSizes}
                  value={formData.clothes_size}
                  onChange={(value) => handleInputChange('clothes_size', value)}
                  placeholder="Size"
                  disabled={!isEditing}
                  icon={<Shirt className="w-4 h-4" />}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Shoe Size</Label>
                <MobileSelect
                  options={shoeSizes}
                  value={formData.shoe_size}
                  onChange={(value) => handleInputChange('shoe_size', value)}
                  placeholder="Size"
                  disabled={!isEditing}
                  icon={<Ruler className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>

          {/* Home Address Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-3">Home Address</h3>
            
            <div className="space-y-2">
              <Label htmlFor="home_address" className="text-sm font-semibold">Address</Label>
              <div className="relative">
                <HomeIcon className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Textarea
                  id="home_address"
                  value={formData.home_address}
                  onChange={(e) => handleInputChange('home_address', e.target.value)}
                  disabled={!isEditing}
                  className="pl-10 min-h-[100px]"
                  placeholder="Enter your full home address"
                  aria-label="Home address"
                />
              </div>
            </div>
          </div>

          {/* Special Requests Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-3">Special Requests</h3>
            
            <div className="space-y-2">
              <Label htmlFor="special_requests" className="text-sm font-semibold">Additional Notes</Label>
              <Textarea
                id="special_requests"
                value={formData.special_requests}
                onChange={(e) => handleInputChange('special_requests', e.target.value)}
                disabled={!isEditing}
                className="min-h-[100px]"
                placeholder="Any special requirements or notes..."
                aria-label="Special requests or additional notes"
              />
              <p className="text-xs text-muted-foreground">
                Let us know about any allergies, preferences, or special needs
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={updateProfileMutation.isPending}
                  className="w-full h-12 text-base font-bold gap-2"
                >
                  <Save className="w-5 h-5" />
                  {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="w-full h-12 text-base font-bold"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full h-12 text-base font-bold"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full h-12 text-base font-bold gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full h-12 text-base font-bold gap-2 bg-red-700 hover:bg-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Account
                </Button>
              </>
            )}
          </div>

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
                  <h3 className="text-xl font-bold">Delete Account?</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  This will permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-red-700 hover:bg-red-800"
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </PullToRefresh>
    </AuthLayout>
  );
}