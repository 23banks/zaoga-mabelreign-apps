import { Video, Mic, Camera } from 'lucide-react';

const types = {
  video: { Icon: Video, tone: 'from-primary to-secondary' },
  audio: { Icon: Mic, tone: 'from-accent to-amber-500' },
  photo: { Icon: Camera, tone: 'from-secondary to-primary' },
};

export default function Thumb({ type, className = 'h-36', iconSize = 36 }) {
  const { Icon, tone } = types[type] || types.video;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${tone} text-white ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 15%, rgba(255,255,255,0.5), transparent 45%)' }}
      />
      <Icon size={iconSize} strokeWidth={1.6} className="relative drop-shadow" />
    </div>
  );
}
