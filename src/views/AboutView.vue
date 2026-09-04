<script>
export default {
  data() {
    return {
      activeTab: 1,
      tech: [
        { id: 1, name: 'Python', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', status: 'Advanced' },
        { id: 2, name: 'JavaScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', status: 'Advanced' },
        { id: 3, name: 'TypeScript', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', status: 'Advanced' },
        { id: 4, name: 'React', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', status: 'Advanced' },
        { id: 5, name: 'React Native', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', status: 'Advanced' },
        { id: 6, name: 'Next.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', status: 'Advanced' },
        { id: 7, name: 'HTML', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', status: 'Advanced' },
        { id: 8, name: 'CSS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', status: 'Advanced' },
        { id: 9, name: 'Tailwind CSS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', status: 'Advanced' },
        { id: 10, name: 'Angular', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', status: 'Intermediate' },
        { id: 11, name: 'Flask', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', status: 'Advanced' },
        { id: 12, name: 'Django', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', status: 'Advanced' },
        { id: 13, name: 'Node.js', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', status: 'Advanced' },
        { id: 14, name: 'Express', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', status: 'Advanced' },
        { id: 15, name: 'PostgreSQL', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', status: 'Advanced' },
        { id: 16, name: 'MySQL', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', status: 'Intermediate' },
        { id: 17, name: 'MongoDB', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', status: 'Advanced' },
        { id: 18, name: 'Firebase', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', status: 'Intermediate' },
      ],
      tools: [
        { id: 1, name: 'Git', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', status: 'Version Control' },
        { id: 2, name: 'GitHub', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', status: 'Git Hosting' },
        { id: 3, name: 'AWS', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', status: 'Cloud' },
        { id: 4, name: 'Docker', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', status: 'Containers' },
        { id: 5, name: 'VS Code', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', status: 'IDE' },
        { id: 6, name: 'NPM', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', status: 'Package Manager' },
        { id: 7, name: 'Selenium', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg', status: 'Automation' },
        { id: 8, name: 'TensorFlow', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', status: 'AI/ML' },
      ],

      certifications: [
        { name: 'Google IT Support', issuer: 'Google', category: 'IT Support', url: 'https://www.coursera.org/professional-certificates/google-it-support' },
        { name: 'Crash Course on Python', issuer: 'Google', category: 'Programming', url: 'https://www.coursera.org/learn/python-crash-course' },
        { name: 'Introduction to DevOps', issuer: 'Coursera', category: 'DevOps', url: 'https://www.coursera.org/learn/intro-to-devops' },
        { name: 'Data Science', issuer: 'Coursera', category: 'Data Science', url: 'https://www.coursera.org/browse/data-science' },
        { name: 'JavaScript (Basics)', issuer: 'Coursera', category: 'Programming', url: 'https://www.coursera.org/learn/javascript-basics' },
        { name: 'JavaScript', issuer: 'Coursera', category: 'Programming', url: 'https://www.coursera.org/learn/javascript' },
        { name: 'Advanced Appium: Scalable Mobile Automation', issuer: 'Coursera', category: 'Test Automation', url: 'https://www.coursera.org/account/accomplishments/verify/W9XMI8AGU48H' },
        { name: 'Lean Six Sigma White Belt', issuer: 'Smart Irtekaz', category: 'Process Improvement', url: null },
      ]
    };
  }
}
</script>
<template>
  <!-- About Me Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left mx-3 mb-5 rounded-3xl" style="background-color: var(--bg-card); border: 1px solid var(--border);">
    <article>
      <header>
        <div class="text-2xl font-bold mb-5 fadein-bot title-section flex items-center" style="color: var(--text);">
          About Me &nbsp;
          <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
        </div>
      </header>
      <section class="text-sm md:text-base text-justify flex flex-col md:flex-row gap-6">
        <div class="flex-shrink-0 flex justify-center md:justify-start">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2" style="border-color: var(--accent);">
            <img src="/images/profile-about.jpeg" alt="Hani Hashmi" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <p class="leading-relaxed fadein-left fadeins-1" style="color: var(--text-muted);">
            I am a Product Engineer with 3 years of experience building and shipping full-stack products across mobile, web and backend. Strong in TypeScript, React Native, Next.js, Node.js and Django, with bilingual Arabic/English (RTL) product experience and a solid foundation in AI and Machine Learning.
          </p>
          <p class="leading-relaxed fadein-left fadeins-2" style="color: var(--text-muted);">
            At Otaishan Investments in Riyadh I own end-to-end delivery of four production platforms for the Saudi market: Mrafqk, BAHHR, Motorekcs and The Perfect House, spanning marketplace, booking, real-time and on-demand service domains. Before that I shipped Call Loom, Break Portal, Data Scrubber, Dial Loom and Taskio at Mars BPO, and built Gogo Sports and the Mutma'innah app independently.
          </p>
        </div>
      </section>
    </article>
  </div>



  <!-- Skills Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold mb-5 fadein-bot title-section flex items-center" style="color: var(--text);">
          <div class="h-[1px] w-10 md:w-20" style="background-color: var(--accent);"></div>
          &nbsp; Skills & Technologies
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center mb-5" style="color: var(--text-muted);">
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg transition-colors"
                :style="activeTab === 1 ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}" @click="activeTab = 1">Tech Stack</button>
            </li>
            <li class="mr-2">
              <button class="inline-block px-4 py-3 rounded-lg transition-colors"
                :style="activeTab === 2 ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}" @click="activeTab = 2">Tools</button>
            </li>
          </ul>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tech" :key="item.id">
              <div class="item-tech flex cursor-pointer items-center gap-2 rounded px-2 py-2 md:gap-3 lg:px-3 transition-colors"
                style="border: 1px solid var(--accent);">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium transition-all duration-300 translate-y-0" style="color: var(--text-secondary);">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] transition-all duration-300 md:text-xs lg:text-sm" style="color: var(--accent);">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tools" :key="item.id">
              <div class="item-tech flex cursor-pointer items-center gap-2 rounded px-2 py-2 md:gap-3 lg:px-3 transition-colors"
                style="border: 1px solid var(--accent);">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium transition-all duration-300 translate-y-0" style="color: var(--text-secondary);">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] transition-all duration-300 md:text-xs lg:text-sm" style="color: var(--accent);">{{ item.status }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>

  <!-- Certifications Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-left mx-3 mb-32">
    <article>
      <header>
        <div class="text-2xl font-bold mb-8 fadein-bot title-section flex items-center" style="color: var(--text);">
          Certifications &nbsp;
          <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
        </div>
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="(cert, index) in certifications" :key="index"
            class="cert-card rounded-xl p-5 transition-all duration-300"
            style="background-color: var(--bg-card); border: 1px solid var(--border);">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-sm font-semibold" style="color: var(--text);">{{ cert.name }}</h3>
                <p class="text-xs mt-1" style="color: var(--accent);">{{ cert.issuer }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="inline-block px-2 py-0.5 text-[10px] rounded-full" style="background-color: rgba(var(--accent-rgb), 0.1); color: var(--accent); opacity: 0.8;">{{ cert.category }}</span>
                  <a v-if="cert.url" :href="cert.url" target="_blank" rel="noopener"
                    class="transition-opacity hover:opacity-100 flex items-center justify-center w-7 h-7 rounded-md" style="color: var(--accent); opacity: 0.6; background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
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

.fadeins-1 {
  animation-delay: 500ms;
}

.fadeins-2 {
  animation-delay: 800ms;
}

.img-tech,
.tech {
  transition: transform 0.3s ease;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}

.cert-card:hover {
  transform: translateY(-4px);
}
</style>
