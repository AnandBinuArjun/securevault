<template>
  <div class="p-6 lg:p-12 max-w-7xl mx-auto animation-fade-in relative z-20">
    <div class="text-center mb-20">
      <h2 class="text-6xl font-black tracking-tighter text-gray-900 dark:text-white mb-6">Business Pipeline API</h2>
      <p class="text-lg text-gray-500 font-medium max-w-3xl mx-auto leading-relaxed">Automate cryptographic security checks at scale. Integrate the SecureVault registry directly into your refurbishment pipeline, POS system, or enterprise diagnostic toolset.</p>
    </div>

    <!-- Rate Limit Display -->
    <div class="mac-card p-10 flex flex-col lg:flex-row items-center justify-between gap-10 mb-20 shadow-2xl relative overflow-hidden group">
       <div class="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
          <svg class="w-40 h-40 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2" stroke-linecap="round"></path></svg>
       </div>
       <div class="z-10">
         <p class="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 ml-1">Current Protocol: STARTER TIER</p>
         <h4 class="text-5xl font-black text-gray-900 dark:text-white tabular-nums">482 <span class="text-xl font-bold text-gray-400">/ 1,000 requests</span></h4>
       </div>
       <div class="w-full lg:w-1/2 z-10">
         <div class="h-4 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
           <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(0,122,255,0.4)] transition-all duration-1000" style="width: 48.2%"></div>
         </div>
       </div>
       <button class="mac-button-primary !py-4 !px-10 !text-sm !font-black !tracking-widest uppercase z-10 shadow-[0_10px_30px_rgba(0,122,255,0.3)]">Elevate Access</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <!-- Why Use API -->
      <div class="space-y-12">
        <h3 class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">Enterprise Integration</h3>
        <ul class="space-y-10">
          <li class="flex gap-6 group">
            <div class="mt-1 w-14 h-14 rounded-3xl mac-glass text-blue-500 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2.5"></path></svg>
            </div>
            <div>
              <h4 class="text-xl font-black text-gray-900 dark:text-white">Real-Time Auditing</h4>
              <p class="text-gray-500 font-medium mt-2 leading-relaxed">Cross-check hardware integrity signals the second devices enter your facility's network. No manual entry required.</p>
            </div>
          </li>
          <li class="flex gap-6 group">
            <div class="mt-1 w-14 h-14 rounded-3xl mac-glass text-purple-500 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2.5"></path></svg>
            </div>
            <div>
              <h4 class="text-xl font-black text-gray-900 dark:text-white">Compliance Manifests</h4>
              <p class="text-gray-500 font-medium mt-2 leading-relaxed">Automatically generate cryptographically signed security manifests for your b2b refurbishment partners.</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Code Block -->
      <div class="mac-card overflow-hidden shadow-2xl scale-105">
        <div class="h-10 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10 flex items-center px-4 justify-between">
          <div class="flex items-center gap-2">
            <div class="traffic-light tl-red"></div>
            <div class="traffic-light tl-yellow"></div>
            <div class="traffic-light tl-green"></div>
          </div>
          <span class="text-[10px] font-black text-gray-400 uppercase tracking-widest">zsh — secure-vult — 80x24</span>
        </div>
        <div class="p-8 font-mono text-sm leading-relaxed overflow-x-auto bg-[#0A0A0B]">
          <div class="flex gap-3 mb-4">
            <span class="text-green-500">➜</span>
            <span class="text-gray-300">~</span>
            <span class="text-blue-500 font-bold">curl</span>
            <span class="text-gray-400">-X GET "https://api.securevault.local/diagnose" \</span>
          </div>
          <div class="ml-6 space-y-1">
             <div class="text-gray-400">  -H "Authorization: Bearer <span class="text-orange-400">sk_live_x88...</span>" \</div>
             <div class="text-gray-400">  -d "identifier=<span class="text-blue-400">353123456789012</span>"</div>
          </div>
          
          <div class="mt-8 text-gray-600 font-bold tracking-tight"># Response Object [200 OK]</div>
          <div class="text-indigo-400 mt-2">
            {
              <div class="ml-4">"status": <span class="text-green-400">"SUCCESS"</span>,</div>
              <div class="ml-4">"integrity": <span class="text-green-400">"VERIFIED"</span>,</div>
              <div class="ml-4">"metrics": {
                <div class="ml-4">"score": <span class="text-blue-400">98</span>,</div>
                <div class="ml-4">"threats": <span class="text-blue-400">0</span></div>
              }</div>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
