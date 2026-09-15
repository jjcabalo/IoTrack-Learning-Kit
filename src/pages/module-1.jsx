import Head from 'next/head';
import Link from 'next/link';

export default function Module1() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-blue-200 pb-12">
      <Head>
        <title>Module 1: What is IOT & Hardware - IoTrack</title>
      </Head>
      
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-semibold hover:underline">
            &larr; Back to Home
          </Link>
          <h1 className="font-bold text-xl text-gray-800">Module 1</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Module Hero */}
          <div className="bg-blue-600 text-white px-8 py-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4">What is IoT?</h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Understanding the Internet of Things and the core hardware behind the kit.
            </p>
          </div>

          <div className="p-8 sm:p-12 space-y-16">
            
            {/* Section 1: Core IoT Concepts */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Core IoT Concepts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-sm">
                  <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mb-4 text-2xl">
                    🎯
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">Sensors</h3>
                  <p className="text-blue-800">
                    Devices that detect the world around them, like an RGB sensor identifying colors.
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6 border border-purple-100 shadow-sm">
                  <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-4 text-2xl">
                    🧠
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 mb-2">Controllers</h3>
                  <p className="text-purple-800">
                    The "brain" of the device (like the Arduino UNO) that makes decisions based on data.
                  </p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 border border-green-100 shadow-sm">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mb-4 text-2xl">
                    🌐
                  </div>
                  <h3 className="text-xl font-bold text-green-900 mb-2">Connectivity</h3>
                  <p className="text-green-800">
                    Using Wi-Fi or Bluetooth to communicate with other devices and web servers.
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-xl p-6 border border-orange-100 shadow-sm">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mb-4 text-2xl">
                    ⚙️
                  </div>
                  <h3 className="text-xl font-bold text-orange-900 mb-2">Actuators</h3>
                  <p className="text-orange-800">
                    Motors and moving parts that carry out physical actions, like the robot arm joints.
                  </p>
                </div>
              </div>
            </section>
            
            {/* Graph Image Placeholders */}
            <div className="flex justify-center my-8">
              <div className="w-full max-w-2xl bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center py-16 relative group overflow-hidden">
                 <img 
                   src="/module-images/graph_module_1.svg" 
                   alt="Module 1 Graph" 
                   className="max-w-full h-auto object-contain z-10" 
                   onError={(e) => { 
                     e.target.style.display='none'; 
                     e.target.nextSibling.style.display='flex'; 
                   }} 
                 />
                 <div className="absolute inset-0 flex-col items-center justify-center text-gray-500 hidden z-0">
                    <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">graph module 1.svg</span>
                 </div>
              </div>
            </div>

            {/* Section 2: Hardware */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">The Hardware Behind the Kit</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <HardwareCard 
                  title="Frame" 
                  desc="The mechanical structure of the arm." 
                  imgSrc="frame.png" 
                />
                
                <HardwareCard 
                  title="Servo Motors" 
                  desc="Move the robot's joints and gripper." 
                  imgSrc="servo_motors.png" 
                />
                
                <HardwareCard 
                  title="Color Sensor" 
                  desc="Detects object colors for sorting." 
                  imgSrc="color_sensor.png" 
                />
                
                <HardwareCard 
                  title="Sensor Shield v5 Expansion Board" 
                  desc="Connects multiple sensors and modules to the Arduino easily." 
                  imgSrc="sensor_shield.png" 
                />
                
                <HardwareCard 
                  title="Arduino UNO" 
                  desc="The main brain controlling the kit." 
                  imgSrc="arduino_uno.png" 
                />
                
                <HardwareCard 
                  title="ESP32 Wifi Module" 
                  desc="Provides Wi-Fi connectivity for sending and receiving data wirelessly." 
                  imgSrc="esp32.png" 
                />
                
                <HardwareCard 
                  title="Power Supply" 
                  desc="Safe 5V supply for reliable operation." 
                  imgSrc="power_supply.png" 
                />
                
                <HardwareCard 
                  title="Wiring" 
                  desc="Connects all electronics together." 
                  imgSrc="wiring.png" 
                />
                
                <HardwareCard 
                  title="Breadboard" 
                  desc="Allows components to be connected and tested without soldering." 
                  imgSrc="breadboard.png" 
                />

              </div>
            </section>
            
          </div>
          
          {/* Footer Navigation */}
          <div className="bg-gray-50 border-t p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
             <Link href="/" className="px-6 py-3 rounded-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors w-full sm:w-auto text-center">
               Back to Modules
             </Link>
             <Link href="/module-2" className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto text-center">
               Next: Module 2 &rarr;
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function HardwareCard({ title, desc, imgSrc }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group h-full">
      <div className="aspect-video bg-gray-50 border-b flex items-center justify-center p-4 relative overflow-hidden">
        <img 
          src={`/module-images/${imgSrc}`} 
          alt={title} 
          className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105 z-10" 
          onError={(e) => { 
            e.target.style.display='none'; 
            e.target.nextSibling.style.display='flex'; 
          }} 
        />
        <div className="absolute inset-0 flex-col items-center justify-center text-gray-400 bg-gray-100 hidden z-0">
           <svg className="w-8 h-8 mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <span className="text-xs font-medium text-center px-2">{imgSrc}</span>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 flex-1">{desc}</p>
      </div>
    </div>
  );
}
