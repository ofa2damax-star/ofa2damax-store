import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, CheckCircle2, User, MapPin, School, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const GRADES = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade", "9th Grade", "10th Grade", "11th Grade", "12th Grade"];

export default function MyProfile() {
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    age: "",
    grade: "",
    school_name: "",
    school_address: "",
    home_address: "",
    city: "",
    state: "",
    zip: "",
    special_requests: "",
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await base44.auth.updateMe({ profile: form });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      // silently ignore
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border/50 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📋</span>
              <h1 className="text-lg font-extrabold">My Info</h1>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="rounded-full gap-2 font-bold"
            size="sm"
          >
            {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-card rounded-3xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-100 rounded-full p-2">
              <User className="w-4 h-4 text-purple-600" />
            </div>
            <h2 className="font-extrabold text-base">About Me</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name" className="font-bold text-sm mb-1 block">Full Name</Label>
              <Input
                id="full_name"
                placeholder="Your name"
                value={form.full_name}
                onChange={e => handleChange("full_name", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="age" className="font-bold text-sm mb-1 block">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="e.g. 10"
                  value={form.age}
                  onChange={e => handleChange("age", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="grade" className="font-bold text-sm mb-1 block">Grade</Label>
                <select
                  id="grade"
                  value={form.grade}
                  onChange={e => handleChange("grade", e.target.value)}
                  className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select grade</option>
                  {GRADES.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* School Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-sky-100 rounded-full p-2">
              <School className="w-4 h-4 text-sky-600" />
            </div>
            <h2 className="font-extrabold text-base">My School</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="school_name" className="font-bold text-sm mb-1 block">School Name</Label>
              <Input
                id="school_name"
                placeholder="e.g. Sunnydale Elementary"
                value={form.school_name}
                onChange={e => handleChange("school_name", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="school_address" className="font-bold text-sm mb-1 block">School Address</Label>
              <Input
                id="school_address"
                placeholder="123 School Street"
                value={form.school_address}
                onChange={e => handleChange("school_address", e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Home Address */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card rounded-3xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-100 rounded-full p-2">
              <MapPin className="w-4 h-4 text-green-600" />
            </div>
            <h2 className="font-extrabold text-base">My Home Address</h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="home_address" className="font-bold text-sm mb-1 block">Street Address</Label>
              <Input
                id="home_address"
                placeholder="456 Home Avenue"
                value={form.home_address}
                onChange={e => handleChange("home_address", e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="city" className="font-bold text-sm mb-1 block">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={form.city}
                  onChange={e => handleChange("city", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="state" className="font-bold text-sm mb-1 block">State</Label>
                <Input
                  id="state"
                  placeholder="State"
                  value={form.state}
                  onChange={e => handleChange("state", e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="zip" className="font-bold text-sm mb-1 block">ZIP Code</Label>
              <Input
                id="zip"
                placeholder="00000"
                value={form.zip}
                onChange={e => handleChange("zip", e.target.value)}
                className="rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Special Requests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-5 shadow-sm border border-border/50"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-100 rounded-full p-2">
              <MessageSquare className="w-4 h-4 text-yellow-600" />
            </div>
            <h2 className="font-extrabold text-base">Special Requests</h2>
          </div>
          <Textarea
            id="special_requests"
            placeholder="Any special needs, allergies, preferences, sizes, or anything else we should know... ✏️"
            value={form.special_requests}
            onChange={e => handleChange("special_requests", e.target.value)}
            className="rounded-xl min-h-[120px] resize-none"
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full rounded-2xl h-12 text-base font-extrabold gap-2"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5" /> All Saved! 🎉
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> Save My Info
              </>
            )}
          </Button>
        </motion.div>

      </div>
    </div>
  );
}