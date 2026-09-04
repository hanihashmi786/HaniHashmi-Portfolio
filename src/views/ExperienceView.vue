<script>
import ExperienceCard from '../components/ExperienceCard.vue'

export default {
  components: { ExperienceCard },
  data() {
    return {
      expandedIndex: 0,
      experiences: [
        {
          role: 'Product Developer (Full-Stack)',
          company: 'Otaishan Investments',
          period: 'Oct 2025 - Present',
          location: 'Riyadh, Saudi Arabia',
          current: true,
          summary:
            "Own end-to-end delivery of the company's digital products: frontend, backend, APIs, database, admin platforms and marketing sites. Four production platforms for the Saudi market, spanning marketplace, booking, real-time and on-demand service domains.",
          products: [
            {
              name: 'Mrafqk',
              tagline: 'Medical companion booking platform',
              status: 'Internal testing',
              statusColor: '#f59e0b',
              color: '#14b8a6',
              url: 'https://mrafqk.com',
              stack: 'TypeScript · React Native (Expo) · Next.js · Node.js/Express · tRPC · PostgreSQL · Redis · WebSockets'
            },
            {
              name: 'BAHHR',
              tagline: 'Vehicle & adventure rental marketplace',
              status: 'Pre-launch',
              statusColor: '#38bdf8',
              color: '#00b4d8',
              url: 'https://www.bahhr.net',
              stack: 'React Native (Expo) · NestJS · PostgreSQL · Prisma · Next.js · Socket.IO · TypeScript · Tailwind CSS'
            },
            {
              name: 'Motorekcs',
              tagline: 'On-demand automotive service platform',
              status: 'In production',
              statusColor: '#22c55e',
              color: '#f97316',
              url: 'https://motorekcs.com',
              stack: 'Next.js · React · TypeScript · Django REST Framework · PostgreSQL · React Native · Tailwind CSS'
            },
            {
              name: 'The Perfect House',
              tagline: 'Architecture & construction platform',
              status: 'Live on Google Play',
              statusColor: '#22c55e',
              color: '#eab308',
              url: 'https://theperfecthouse.co',
              stack: 'React Native (Expo) · Next.js · Three.js/WebGL · TypeScript · Node.js serverless · Vercel'
            }
          ],
          responsibilities: [
            'Built Mrafqk end-to-end: cross-platform React Native (Expo) app, type-safe tRPC and Express backend, PostgreSQL data layer, Next.js admin platform and marketing site',
            'Engineered real-time bidding and chat over WebSockets with Redis pub/sub, enabling live matching between users and verified medical companions',
            'Architected the BAHHR multi-category rental marketplace, with a booking engine that validates availability and overlaps to prevent double-booking across concurrent reservations',
            'Delivered real-time chat and notifications via Socket.IO, with JWT/OTP authentication, MFA and role-based access control across mobile, admin and API layers',
            'Built the Motorekcs Django REST Framework backend, Next.js customer platform and React Native app, integrating payments and push notifications',
            'Engineered The Perfect House web platform and Expo app, including 3D architectural experiences in Three.js/WebGL, technical SEO and serverless deployment on Vercel'
          ],
          impact: [
            'Four production platforms for the Saudi market delivered end-to-end, from first commit to release',
            'Booking, payment and payout workflows covering the full request-to-settlement lifecycle',
            'Full English/Arabic internationalisation with RTL support, shipped on Vercel with GitHub Actions CI'
          ],
          stack: ['TypeScript', 'React Native (Expo)', 'Next.js', 'Node.js', 'Express', 'NestJS', 'tRPC', 'Django REST Framework', 'PostgreSQL', 'Prisma', 'Redis', 'WebSockets', 'Socket.IO', 'Three.js', 'Tailwind CSS', 'Vercel', 'GitHub Actions']
        },
        {
          role: 'Freelance Full-Stack Developer',
          company: 'Independent Contractor',
          period: 'Aug 2025 - Mar 2026',
          location: 'Riyadh, Saudi Arabia',
          current: false,
          note: 'Concurrent with the Otaishan Investments role',
          responsibilities: [
            'Built the customer-facing Gogo Sports platform (gogosports.online) in Next.js with a backend-free architecture, routing the order flow directly through WhatsApp',
            'Delivered and deployed 3+ client portfolio websites with responsive design and live hosting'
          ],
          impact: [
            'A production storefront live with no backend to maintain, orders flowing straight to WhatsApp',
            'Every client site delivered live, responsive and on time'
          ],
          stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel']
        },
        {
          role: 'Full-Stack Developer',
          company: 'Mars BPO Pvt. Ltd.',
          period: 'Jul 2024 - Aug 2025',
          location: 'Rawalpindi, Pakistan',
          current: false,
          responsibilities: [
            "Built the React Native mobile app for Call Loom (callloom.com), the company's flagship commercial AI call-tracking and IVR platform, integrating the product APIs and shipping the app to the Google Play Store",
            'Developed and maintained 5+ web applications in React and mobile applications in React Native, backed by Python (Flask/Django) services and PostgreSQL',
            'Contributed to further products including Break Portal, Data Scrubber (Blacklist Alliance API integration), Dial Loom and Taskio'
          ],
          impact: [
            'Improved application response times through Redis caching and database query optimisation',
            'Reduced issue resolution time by refactoring the backend codebase and streamlining debugging and deployment'
          ],
          stack: ['React', 'React Native', 'Python', 'Flask', 'Django', 'PostgreSQL', 'Redis', 'AWS']
        },
        {
          role: 'Freelance Full-Stack Developer',
          company: 'Independent Contractor',
          period: 'Sep 2023 - Jul 2024',
          location: 'Islamabad, Pakistan',
          current: false,
          responsibilities: [
            'Built an e-commerce store using the MERN stack',
            'Developed a React Native mobile application for online clothing sales',
            'Designed and built a React.js UI/UX dashboard'
          ],
          impact: [
            'Delivered multiple client projects independently, end-to-end and on time'
          ],
          stack: ['MongoDB', 'Express', 'React', 'Node.js', 'React Native']
        },
        {
          role: 'JavaScript Developer (Internship)',
          company: 'SOFTOO Pvt. Ltd.',
          period: 'Jul 2023 - Sep 2023',
          location: 'Islamabad, Pakistan',
          current: false,
          responsibilities: [
            'Completed intensive Node.js training',
            'Contributed to backend development tasks and participated in peer code review'
          ],
          impact: [
            'Contributed to a collaborative team culture by sharing solutions',
            'Improved peer review quality through active participation'
          ],
          stack: ['JavaScript', 'Node.js']
        }
      ],
      education: {
        degree: 'BS Software Engineering',
        institution: 'Capital University of Science & Technology',
        period: '2020 - 2024',
        location: 'Islamabad, Pakistan',
        highlights: [
          'Final Year Project, Brain Tumour Detection from MRI: AI medical imaging system in Python, TensorFlow/Keras and OpenCV using CNN, VGG-16, ResNet-50 and Inception-V3 for multi-class tumour classification, delivered as a Flask web application',
          'Focused on Full Stack Development, AI/ML, and Mobile App Development',
          'Strong foundation in Data Structures, Algorithms, and System Design'
        ]
      }
    };
  },
  methods: {
    toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },
    delayClass(index) {
      return 'fadeins-' + Math.min(index + 1, 5);
    }
  }
}
</script>

<template>
  <div class="px-4 py-5 md:px-8 md:py-10 mx-3">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2" style="color: var(--text);">Experience & Education</h2>
      <p class="text-sm" style="color: var(--text-muted);">My professional journey and academic background</p>
    </div>

    <!-- Work Experience Section -->
    <div class="mb-16">
      <div class="text-2xl font-bold mb-10 flex items-center fadein-bot" style="color: var(--text);">
        <div class="h-[1px] w-10 md:w-20" style="background-color: var(--accent);"></div>
        &nbsp; Work Experience
      </div>

      <!-- Zigzag Timeline (Desktop) -->
      <div class="hidden md:block relative">
        <!-- Center vertical line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" style="background-color: var(--accent);"></div>

        <div v-for="(exp, index) in experiences" :key="index" class="relative mb-12" :class="['fadein-left', delayClass(index)]">
          <!-- Timeline dot -->
          <div class="absolute left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
            style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 5px rgba(var(--accent-rgb), 0.25)' } : {}">
          </div>

          <!-- LEFT card (even index) -->
          <div v-if="index % 2 === 0" class="flex items-start">
            <div class="w-[47%] pr-8">
              <ExperienceCard :exp="exp" :expanded="expandedIndex === index" @toggle="toggleExpand(index)" />
            </div>
            <div class="w-[6%]"></div>
            <div class="w-[47%]"></div>
          </div>

          <!-- RIGHT card (odd index) -->
          <div v-else class="flex items-start">
            <div class="w-[47%]"></div>
            <div class="w-[6%]"></div>
            <div class="w-[47%] pl-8">
              <ExperienceCard :exp="exp" :expanded="expandedIndex === index" @toggle="toggleExpand(index)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Timeline (stacked) -->
      <div class="md:hidden relative">
        <div class="absolute left-4 top-0 bottom-0 w-[2px]" style="background-color: rgba(var(--accent-rgb), 0.3);"></div>
        <div v-for="(exp, index) in experiences" :key="'m'+index" class="relative mb-6 ml-10" :class="['fadein-left', delayClass(index)]">
          <div class="absolute -left-[1.75rem] top-4 w-3 h-3 rounded-full" style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 4px rgba(var(--accent-rgb), 0.2)' } : {}"></div>
          <ExperienceCard :exp="exp" :expanded="expandedIndex === index" compact @toggle="toggleExpand(index)" />
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div class="mb-32">
      <div class="text-2xl font-bold mb-10 flex items-center fadein-bot" style="color: var(--text);">
        Education &nbsp;
        <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
      </div>

      <div class="rounded-xl p-6 md:p-8 fadein-left fadeins-1" style="background-color: var(--bg-card); border: 1px solid var(--border);">
        <div class="flex flex-col md:flex-row md:items-start gap-5">
          <!-- Education icon -->
          <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div class="flex-grow">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold" style="color: var(--text);">{{ education.degree }}</h3>
                <p class="text-sm mt-1" style="color: var(--accent);">{{ education.institution }}</p>
              </div>
              <div class="text-left md:text-right mt-2 md:mt-0">
                <span class="inline-block px-3 py-1 text-xs rounded-full" style="background-color: rgba(var(--accent-rgb), 0.1); color: var(--accent);">{{ education.period }}</span>
                <p class="text-xs mt-1 flex items-center gap-1 md:justify-end" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ education.location }}
                </p>
              </div>
            </div>
            <!-- Key Highlights heading -->
            <div class="pt-6 mt-4" style="border-top: 1px solid var(--border);">
              <div class="flex items-center justify-center gap-2 mb-6 fadein-left fadeins-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <h4 class="text-base font-bold" style="color: var(--text);">Key Highlights</h4>
              </div>
              <!-- Highlight cards grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="(h, hi) in education.highlights" :key="hi"
                  :class="['rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 fadein-left', hi === 0 ? 'fadeins-3' : hi === 1 ? 'fadeins-4' : 'fadeins-5']"
                  style="background-color: var(--bg); border: 1px solid rgba(var(--accent-rgb), 0.2);">
                  <!-- Medal/ribbon icon -->
                  <div class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="8" r="6" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 14l-1.5 8 5-3 5 3-1.5-8" />
                    </svg>
                  </div>
                  <p class="text-sm leading-relaxed" style="color: var(--text-muted);">{{ h }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fadein-left {
  opacity: 0;
  animation: fadeInLeftAbout 0.5s ease-out forwards;
}

@keyframes fadeInLeftAbout {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s forwards;
}

@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeins-1 {
  animation-delay: 300ms;
}

.fadeins-2 {
  animation-delay: 600ms;
}

.fadeins-3 {
  animation-delay: 900ms;
}

.fadeins-4 {
  animation-delay: 1200ms;
}

.fadeins-5 {
  animation-delay: 1500ms;
}
</style>
