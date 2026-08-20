import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
  className?: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle, className }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={isMuted ? 'Enable sound effects' : 'Disable sound effects'}
      className={cn(
        'group relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-obsidian-900/60 backdrop-blur-md text-xs font-mono tracking-wider transition-all duration-300 hover:border-jade-500/50 hover:bg-jade-500/10 text-[#8B949E] hover:text-white',
        className
      )}
      data-cursor-label="AUDIO"
    >
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-jade-400 transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-jade-400 animate-pulse" />
      )}
      <span className="hidden sm:inline-block">
        {isMuted ? 'AUDIO OFF' : 'AUDIO ON'}
      </span>
      {!isMuted && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-0.5 h-2 bg-jade-400 animate-[pulseSubtle_1s_ease-in-out_infinite]" />
          <span className="w-0.5 h-3 bg-jade-400 animate-[pulseSubtle_1.3s_ease-in-out_infinite]" />
          <span className="w-0.5 h-1.5 bg-jade-400 animate-[pulseSubtle_0.8s_ease-in-out_infinite]" />
        </span>
      )}
    </button>
  );
};
