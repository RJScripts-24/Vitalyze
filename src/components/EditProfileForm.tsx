import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Profile = {
  name?: string;
  dob?: string;
  gender?: string;
  phone?: string;
  address?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

export default function EditProfileForm({
  initialProfile,
  initialEmail,
  onSaved,
  onCancel,
}: {
  initialProfile?: Profile | null;
  initialEmail?: string;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [emName, setEmName] = useState("");
  const [emPhone, setEmPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialProfile) {
      setName(initialProfile.name || "");
      setDob(initialProfile.dob || "");
      setGender(initialProfile.gender || "");
      setPhone(initialProfile.phone || "");
      setAddress(initialProfile.address || "");
      setBloodGroup(initialProfile.bloodGroup || "");
      setEmName(initialProfile.emergencyContactName || "");
      setEmPhone(initialProfile.emergencyContactPhone || "");
    }
    if (typeof initialEmail === "string") setEmail(initialEmail);
  }, [initialProfile, initialEmail]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${base}/api/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: name,
          email,
          password: password || undefined,
          dob,
          gender,
          phone,
          address,
          bloodGroup,
          emergencyContactName: emName,
          emergencyContactPhone: emPhone,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Save failed");
      }
      setPassword("");
      setMessage("Profile updated successfully.");
      onSaved?.();
    } catch (err: any) {
      setMessage(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-6 md:p-8 bg-card shadow-[var(--shadow-card)] border-border/50 mt-8">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password (optional)" />
        </div>
        <div>
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <Label>Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="phone">Mobile number</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 123 4567" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <textarea
            id="address"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base md:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street, City, State, ZIP"
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="bloodGroup">Blood group</Label>
          <Input id="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} placeholder="O+, A-, etc." />
        </div>
        <div>
          <Label htmlFor="emName">Emergency contact name</Label>
          <Input id="emName" value={emName} onChange={(e) => setEmName(e.target.value)} placeholder="Contact name" />
        </div>
        <div>
          <Label htmlFor="emPhone">Emergency contact phone</Label>
          <Input id="emPhone" type="tel" value={emPhone} onChange={(e) => setEmPhone(e.target.value)} placeholder="Contact phone" />
        </div>

        <div className="md:col-span-2 flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          {message && <span className="text-sm text-muted-foreground">{message}</span>}
        </div>
      </form>
    </Card>
  );
}
