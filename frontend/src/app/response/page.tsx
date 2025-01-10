'use client';

import { useSearchParams } from 'next/navigation';
import { CodeBlock } from '@/components/ui/code-block';

export default function ResponsePage() {
  const searchParams = useSearchParams();
  const originalCode = searchParams.get('originalCode') || '';
  const debuggedCode = searchParams.get('debuggedCode') || '';

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start p-6 bg-background text-foreground overflow-hidden rounded-lg border md:shadow-xl">
      <div className="w-full max-w-7xl p-10 space-y-8">
        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center text-slate-950 dark:text-white mb-8">
          Results
        </h1>

        <div className="flex flex-wrap gap-8 justify-between">
          {/* Original Code Block */}
          <div className="flex-1 min-w-[300px] max-w-[48%] bg-[#2e3440] border-2 border-gray-600 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Original Code</h2>
            <CodeBlock
              language="javascript"
              filename="OriginalCode.js"
              code={decodeURIComponent(originalCode)}
              highlightLines={[]}
            />
          </div>

          {/* Debugged Code Block */}
          <div className="flex-1 min-w-[300px] max-w-[48%] bg-[#2e3440] border-2 border-gray-600 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Debugged Code</h2>
            <CodeBlock
              language="javascript"
              filename="DebuggedCode.js"
              code={decodeURIComponent(debuggedCode)}
              highlightLines={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
