'use client';
import { useState} from 'react';
import axios from 'axios';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

import { InteractiveGridPattern } from "../components/background/interactive-grid-pattern";
import InteractiveHoverButton from "../components/ui/interactive-hover-button";
import TypingAnimation from "../components/ui/typing-animation";
import { IconCloud } from "../components/ui/icon-cloud";

const slugs = [
  "typescript", "javascript", "java", "react", "flutter", "android", "html5",
  "css3", "nodedotjs", "express", "nextdotjs", "prisma", "amazonaws", "postgresql",
  "firebase", "nginx", "vercel", "docker", "git", "jira", "github", "gitlab", 
  "visualstudiocode", "androidstudio", "figma",
];

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`);

export default function Home() {
  const [code, setCode] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("sending data:",{code})
      const result = await axios.post('http://localhost:5000/debug', { 'code':code },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const debuggedCode = result.data;

       router.push(`/response?originalCode=${encodeURIComponent(code)}&debuggedCode=${encodeURIComponent(debuggedCode)}`);
    } catch (error) {
      console.log('Error in debugging process',error);
      alert('Failed to debug the code. Please try again.');
    }
  };

  return (
    <div className="relative flex min-h-screen text-foreground w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className="relative flex flex-row w-full h-full">
        {/* Left-side container */}
        <div className="w-1/2 flex flex-col items-start justify-center p-10 space-y-6 z-10">
          <div className="text-4xl font-bold tracking-tight text-left shadow-gray-300 text-black dark:text-white">
            <TypingAnimation>Code Debugging AI Agent</TypingAnimation>
          </div>
          <div className="w-full max-w-xl space-y-4">
            <form onSubmit={handleSubmit}> 
              {/* Textarea element */}
              <textarea
                className="w-full rounded-md bg-white border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none p-4 text-lg shadow-sm resize-none z-20"
                rows={10}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Paste your code here..."
              ></textarea>
              {/* Submit button */}
              <InteractiveHoverButton onClick={handleSubmit} text="Debug" className='z-20' />
            </form>
          </div>
        </div>
        
        {/* Right-side container for cloud icons */}
        <div className="w-1/2 flex items-center justify-center p-6">
          <IconCloud images={images} />
        </div>
      </div>

      {/* Background grid pattern with lower z-index */}
      <InteractiveGridPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "z-0"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />
    </div>
  );
}
