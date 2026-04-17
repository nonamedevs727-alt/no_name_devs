import { useState, useEffect } from 'react';
import ScrollExpandMedia from './ui/scroll-expansion-hero';

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

interface MediaContentCollection {
  [key: string]: MediaContent;
}

const sampleMediaContent: MediaContentCollection = {
  video: {
    src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1',
    poster:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    background:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1920&q=80',
    title: 'NOname dev Studio',
    date: 'EST. 2024',
    scrollToExpand: 'Scroll to explore',
    about: {
      overview:
        'We are a creative studio where brands and stories move off-trails. We build identity, digital experiences, and visual worlds that feel precise, human, and alive.',
      conclusion:
        'Strategy, design, motion, and development come together as one system instead of disconnected deliverables.',
    },
  },
  image: {
    src: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1280&q=80',
    background:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1920&q=80',
    title: 'Digital Experience',
    date: 'Craft & Curiosity',
    scrollToExpand: 'Scroll to explore',
    about: {
      overview:
        'The result is thoughtful digital work with strong technical foundations, smooth interaction, and lasting visual character.',
      conclusion:
        'We stay curious enough to find new ideas and disciplined enough to execute them with precision.',
    },
  },
};

const MediaContent = ({ mediaType }: { mediaType: 'video' | 'image' }) => {
  const currentMedia = sampleMediaContent[mediaType];

  return (
    <div className="max-w-4xl mx-auto text-center mt-12">
      <h2 className="big-text-style mb-8">
        About NOname dev
      </h2>
      <p className="text-xl md:text-2xl mb-8 text-[#37503a] font-light leading-relaxed">
        {currentMedia.about.overview}
      </p>
      <p className="text-lg md:text-xl mb-8 text-[#4d6a51] font-light leading-relaxed">
        {currentMedia.about.conclusion}
      </p>
    </div>
  );
};

export default function Hero() {
  const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
  const currentMedia = sampleMediaContent[mediaType];

  useEffect(() => {
    window.scrollTo(0, 0);
    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, [mediaType]);

  return (
    <div className="min-h-screen bg-[#dfe6df]">
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:bottom-auto sm:left-auto sm:translate-x-0 sm:top-24 sm:right-6 z-50 flex gap-2">
        <button
          onClick={() => setMediaType('video')}
          className={`relative overflow-hidden px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 group ${
            mediaType === 'video'
              ? 'bg-[#1f3324] text-[#dfe6df]'
              : 'bg-[#cfd8cf] text-[#4d6a51] hover:text-[#1f3324]'
          }`}
        >
          <span className="relative z-10">Video</span>
          {mediaType !== 'video' && (
             <div className="absolute inset-0 bg-[#b9cfae] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          )}
        </button>
        <button
          onClick={() => setMediaType('image')}
          className={`relative overflow-hidden px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-300 group ${
            mediaType === 'image'
              ? 'bg-[#1f3324] text-[#dfe6df]'
              : 'bg-[#cfd8cf] text-[#4d6a51] hover:text-[#1f3324]'
          }`}
        >
          <span className="relative z-10">Image</span>
          {mediaType !== 'image' && (
             <div className="absolute inset-0 bg-[#b9cfae] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          )}
        </button>
      </div>

      <ScrollExpandMedia
        mediaType={mediaType}
        mediaSrc={currentMedia.src}
        posterSrc={mediaType === 'video' ? currentMedia.poster : undefined}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend={false}
      >
        <MediaContent mediaType={mediaType} />
      </ScrollExpandMedia>
    </div>
  );
}
