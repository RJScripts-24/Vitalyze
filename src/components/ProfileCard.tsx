import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, MapPin, Droplet, UploadCloud, Mail, KeyRound, Phone, HeartPulse } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Profile = {
  name?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  address?: string;
  bloodGroup?: string;
  avatarUrl?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

const ProfileCard = ({ initialProfile, initialEmail, onEdit }: { initialProfile?: Profile | null; initialEmail?: string; onEdit?: () => void }) => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [username, setUsername] = useState("User Name");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emName, setEmName] = useState("");
  const [emPhone, setEmPhone] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (initialProfile) {
      setUsername(initialProfile.name || "User Name");
      setDob(initialProfile.dob || "");
      setGender(initialProfile.gender || "");
      setPhone(initialProfile.phone || "");
      setAddress(initialProfile.address || "");
      setBloodGroup(initialProfile.bloodGroup || "");
      setAvatarUrl(initialProfile.avatarUrl || "");
      setEmName(initialProfile.emergencyContactName || "");
      setEmPhone(initialProfile.emergencyContactPhone || "");
    }
    if (initialEmail) setEmail(initialEmail);
  }, [initialProfile, initialEmail]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage.getItem("token");
      const res = await fetch(`${base}/api/profile/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setAvatarUrl(data.url); // url returned from backend/cloudinary
    } catch (err) {
      // Silently ignore upload errors
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 bg-card shadow-[var(--shadow-card)] border-border/50 animate-scale-in">
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-primary/20">
            <AvatarImage src={avatarUrl} alt="User Name" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl md:text-3xl font-semibold text-foreground">
              UN
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-md hover:scale-110 transition-transform"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Upload Image"
          >
            {uploading ? <UploadCloud className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
          </Button>
          {/* Accessible hidden file input with associated label */}
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            aria-label="Upload avatar image"
            title="Upload avatar image"
            onChange={handleImageUpload}
          />
          <label htmlFor="avatar-upload" className="sr-only">Upload avatar image</label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><User className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Full Name</p>
            <p className="text-foreground font-medium">{username}</p>
          </div>
        </div>
        {/* Email */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Mail className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Email Address</p>
            <p className="text-foreground font-medium">{email || "--"}</p>
          </div>
        </div>
        {/* Password */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><KeyRound className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Password</p>
            <p className="text-muted-foreground text-sm">••••••••</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Calendar className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Date of Birth</p>
            <p className="text-foreground font-medium">{dob || "--"}</p>
          </div>
        </div>
        {/* Gender */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><HeartPulse className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Gender</p>
            <p className="text-foreground font-medium capitalize">{gender || "--"}</p>
          </div>
        </div>
        {/* Phone */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Phone className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Mobile Number</p>
            <p className="text-foreground font-medium">{phone || "--"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><MapPin className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Address</p>
            <p className="text-foreground font-medium">{address || "--"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Droplet className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Blood Group</p>
            <p className="text-foreground font-medium">{bloodGroup || "--"}</p>
          </div>
        </div>
        {/* Emergency Contact */}
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Phone className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Emergency Contact Name</p>
            <p className="text-foreground font-medium">{emName || "--"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="mt-0.5"><Phone className="w-5 h-5 text-primary" /></div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium mb-1">Emergency Contact Phone</p>
            <p className="text-foreground font-medium">{emPhone || "--"}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-2">
        <Button
          variant="default"
          onClick={onEdit}
          className="bg-[#F7CB05] text-black hover:bg-[#52F705]"
        >
          Edit
        </Button>
      </div>
    </Card>
  );
};

export default ProfileCard;
