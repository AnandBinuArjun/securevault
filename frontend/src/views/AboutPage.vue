<template>
  <div class="p-6 lg:p-12 max-w-5xl mx-auto animation-fade-in relative z-20">
    <div class="mb-16">
      <h2 class="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">The SecureVault Protocol</h2>
      <p class="text-gray-500 font-medium mt-2">Transparency in hardware signals and biometric risk assessment.</p>
    </div>

    <div class="space-y-12">
      <!-- Data Sources -->
      <section class="mac-card p-10 relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
           <svg class="w-24 h-24 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" stroke-width="2" stroke-linecap="round"></path></svg>
        </div>
        <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-6">Audited Sourcing</h3>
        <p class="text-gray-500 font-medium leading-relaxed mb-8">SecureVault aggregates cryptographic signal data across global hardware registries to provide high-fidelity diagnostic scores.</p>
        <ul class="space-y-6">
           <li class="flex gap-4">
             <div class="w-1.5 h-6 bg-blue-500 rounded-full"></div>
             <p class="text-sm font-medium text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">National Vulnerability Database (NVD)</strong>: Our primary stream for CVE tracking mapped to hardware CPE arrays.</p>
           </li>
           <li class="flex gap-4">
             <div class="w-1.5 h-6 bg-purple-500 rounded-full"></div>
             <p class="text-sm font-medium text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">GSMA Registry Access</strong>: We verify hardware authenticity and verify stolen/blacklist markers across 800+ global operators.</p>
           </li>
           <li class="flex gap-4">
             <div class="w-1.5 h-6 bg-green-500 rounded-full"></div>
             <p class="text-sm font-medium text-gray-600 dark:text-gray-400"><strong class="text-gray-900 dark:text-white">OEM Security Advisories</strong>: Real-time parsing of Apple, Samsung, and Android security portal bulletins.</p>
           </li>
        </ul>
      </section>

      <!-- Risk Score Logic -->
      <section class="mac-card p-10">
        <h3 class="text-2xl font-black text-gray-900 dark:text-white mb-6">Heuristic Scoring Weights</h3>
        <p class="text-gray-500 font-medium leading-relaxed mb-8">Initial hardware baseline begins at a perfect <strong class="text-blue-500">100</strong>. Automated deductions are applied via the following security weights:</p>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-white/5 text-gray-400">
                <th class="pb-4 text-[10px] font-black uppercase">Condition Matrix</th>
                <th class="pb-4 text-[10px] font-black uppercase">Metric Deduction</th>
                <th class="pb-4 text-[10px] font-black uppercase">Operational Impact</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              <tr>
                <td class="py-5 font-black text-red-500">Critical CVE</td>
                <td class="py-5 font-bold text-gray-100 tabular-nums">-30 PTS</td>
                <td class="py-5 text-sm text-gray-500 font-medium">Critical system exposure detected.</td>
              </tr>
              <tr>
                <td class="py-5 font-black text-orange-500">High Severity</td>
                <td class="py-5 font-bold text-gray-100 tabular-nums">-15 PTS</td>
                <td class="py-5 text-sm text-gray-500 font-medium">Remote exploit potential.</td>
              </tr>
              <tr>
                <td class="py-5 font-black text-yellow-500">Medium Severity</td>
                <td class="py-5 font-bold text-gray-100 tabular-nums">-08 PTS</td>
                <td class="py-5 text-sm text-gray-500 font-medium">Local privilege escalation risk.</td>
              </tr>
              <tr>
                <td class="py-5 font-black text-red-600">Stolen Signal</td>
                <td class="py-5 font-black text-white tabular-nums">100% REDUCE</td>
                <td class="py-5 text-sm text-red-500 font-black">Asset flagged as Blacklisted / Hostile.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Responsible Disclosure -->
      <section class="mac-card p-10 bg-blue-500/5 border-blue-500/10">
        <h3 class="text-2xl font-black text-blue-500 mb-6">Ethical Mandate</h3>
        <p class="text-gray-500 font-medium leading-relaxed">SecureVault operates under a strict responsible disclosure mandate. We do not weaponize discoveries. Any unpatched irregularities detected during our heuristic scans are cryptographically embargoed and reported directly to the OEM prior to any public diagnostic availability.</p>
      </section>
    </div>
  </div>
</template>
