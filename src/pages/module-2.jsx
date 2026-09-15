import Head from 'next/head';
import Link from 'next/link';

export default function Module2() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-indigo-200 pb-12">
      <Head>
        <title>Module 2: How the Robotic Arm Works - IoTrack</title>
      </Head>
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-indigo-600 font-semibold hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="font-bold text-xl text-gray-800">Module 2</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="bg-indigo-600 text-white px-8 py-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4">How the Robotic Arm Works</h1>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
              Understanding the mechanical movements and joints of the arm.
            </p>
          </div>

          <div className="p-6 sm:p-12 space-y-12">
            
            <section>
              <div className="space-y-12">
                
                {/* Part 1 */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex-1 w-full">
                    <div className="bg-white aspect-video rounded-xl shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                      <img 
                        src="/module-images/base_shoulder.png" 
                        alt="Base & Shoulder" 
                        className="max-w-full max-h-full object-contain p-4 transition-transform group-hover:scale-105 z-10"
                        onError={(e) => { 
                          e.target.style.display='none'; 
                          e.target.nextSibling.style.display='flex'; 
                        }} 
                      />
                      <div className="absolute inset-0 flex-col items-center justify-center text-gray-400 bg-gray-100 hidden z-0">
                         <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-sm font-medium">base_shoulder.png</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm mb-2 shadow-sm">
                      Joints 1 & 2
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Base & Shoulder</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The <strong className="text-indigo-600">base</strong> rotates left and right, allowing the arm to pivot across its workspace. Meanwhile, the <strong className="text-indigo-600">shoulder</strong> tilts the entire arm assembly forward and backward, controlling its reach.
                    </p>
                  </div>
                </div>

                {/* Part 2 */}
                <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                  <div className="flex-1 w-full">
                    <div className="bg-white aspect-video rounded-xl shadow-sm border border-gray-200 overflow-hidden flex items-center justify-center relative group">
                      <img 
                        src="/module-images/elbow_claw.png" 
                        alt="Elbow & Claw" 
                        className="max-w-full max-h-full object-contain p-4 transition-transform group-hover:scale-105 z-10"
                        onError={(e) => { 
                          e.target.style.display='none'; 
                          e.target.nextSibling.style.display='flex'; 
                        }} 
                      />
                      <div className="absolute inset-0 flex-col items-center justify-center text-gray-400 bg-gray-100 hidden z-0">
                         <svg className="w-10 h-10 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                         </svg>
                         <span className="text-sm font-medium">elbow_claw.png</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="inline-flex items-center justify-center px-3 py-1 bg-indigo-100 text-indigo-800 font-semibold rounded-full text-sm mb-2 shadow-sm">
                      Joint 3 & Gripper
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Elbow & Claw</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      The <strong className="text-indigo-600">elbow</strong> bends the middle joint, bringing the gripper closer or farther from the base. Finally, the <strong className="text-indigo-600">claw (gripper)</strong> opens and closes to grab, hold, and release objects with precision.
                    </p>
                  </div>
                </div>

              </div>
            </section>
            
          </div>
          
          <div className="bg-gray-50 border-t p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
             <Link href="/module-1" className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors w-full sm:w-auto text-center">
               &larr; Back to Module 1
             </Link>
             <Link href="/module-3" className="px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm w-full sm:w-auto text-center">
               Next: Module 3 &rarr;
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
