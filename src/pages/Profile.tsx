import ProfileHeader from "@/components/ProfileHeader";
import ProfileCard from "@/components/ProfileCard";
import HealthSummary from "@/components/HealthSummary";
import { useEffect, useState } from "react";
import EditProfileForm from "@/components/EditProfileForm";

const Profile = () => {
  // Example: fetch profile from backend
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [showEdit, setShowEdit] = useState(false);
  const loadProfile = () => {
    const token = localStorage.getItem('token');
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    fetch(`${base}/api/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => { setProfile(data.profile); setEmail(data.email); })
      .catch(() => setProfile(null));
  };

  useEffect(() => { loadProfile(); }, []);

  // TODO: Add update logic and pass profile data to ProfileHeader/ProfileCard
  return (
    <div className="min-h-screen bg-[image:var(--gradient-care)] relative overflow-hidden">
      <main className="relative container max-w-4xl mx-auto px-4 py-8 md:py-12">
        <ProfileHeader />
        <ProfileCard initialProfile={profile} initialEmail={email} onEdit={() => setShowEdit(true)} />
        {showEdit && (
          <EditProfileForm
            initialProfile={profile}
            initialEmail={email}
            onSaved={() => { loadProfile(); setShowEdit(false); }}
            onCancel={() => setShowEdit(false)}
          />
        )}
        <HealthSummary />
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Rishabh Kumar Jha Productions. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
