
const ProfileHeader = () => {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-semibold mb-2">
        <span style={{ 
          background: 'linear-gradient(90deg, #F7CB05, #52F705)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Hi! Welcome to Vitalyze
        </span>
      </h1>
    </div>
  );
};

export default ProfileHeader;
