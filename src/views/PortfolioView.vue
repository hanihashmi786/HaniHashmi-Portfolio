<script>
import { projects, ORG_FILTERS, STATUS } from '../data/projects.js'

export default {
  name: 'PortfolioView',
  data() {
    return {
      hoveredProject: null,
      activeFilter: 'all',
      broken: {},
      filters: ORG_FILTERS
    };
  },
  computed: {
    items() {
      if (this.activeFilter === 'all') return projects;
      return projects.filter((p) => p.orgKey === this.activeFilter);
    }
  },
  methods: {
    countFor(key) {
      return key === 'all' ? projects.length : projects.filter((p) => p.orgKey === key).length;
    },
    statusOf(item) {
      return STATUS[item.status] || STATUS.shipped;
    },
    canPreview(item) {
      return Boolean(item.demo) && item.preview !== false;
    },
    onImgError(id) {
      this.broken[id] = true;
    }
  }
}
</script>
<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left mx-3">
    <article>
      <header>
        <div class="text-2xl font-bold mb-6 fadein-bot title-section flex items-center justify-center flex-col">
          <h4 style="color: var(--text);">Projects</h4>
          <h4 class="text-base font-normal text-transparent bg-clip-text" style="background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));">
            Production platforms, mobile apps and tools I have shipped</h4>
        </div>

        <!-- Filter chips -->
        <div class="flex flex-wrap justify-center gap-2 mb-8 fadein-bot" role="group" aria-label="Filter projects by organisation">
          <button v-for="f in filters" :key="f.key" type="button"
            class="filter-chip" :class="{ active: activeFilter === f.key }"
            :aria-pressed="activeFilter === f.key"
            @click="activeFilter = f.key">
            {{ f.label }}
            <span class="filter-count">{{ countFor(f.key) }}</span>
          </button>
        </div>
      </header>
      <section>
        <div :key="activeFilter" class="grid grid-cols-1 gap-4 pb-16 md:grid-cols-2 lg:grid-cols-3 md:gap-5 fade-zoom-in">
          <div v-for="item in items" :key="item.id" class="relative"
            @mouseenter="canPreview(item) ? hoveredProject = item.id : null"
            @mouseleave="hoveredProject = null">
            <div class="item-card flex flex-col gap-3 rounded-xl px-5 py-5 h-full transition-all duration-300"
              style="background-color: var(--bg-card); border: 1px solid var(--border);">
              <!-- Project image + status badge -->
              <div class="relative w-full h-36 rounded-lg overflow-hidden -mt-1 mb-1">
                <img v-if="!broken[item.id]" :src="item.image" :alt="item.name" loading="lazy" class="w-full h-full object-cover" @error="onImgError(item.id)" />
                <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold tracking-wider"
                  :style="{ background: 'linear-gradient(135deg, ' + item.color + '33, ' + item.color + '99)', color: 'var(--text)' }">
                  {{ item.name }}
                </div>
                <span class="status-badge" :style="{ '--sc': statusOf(item).color }">
                  <span class="status-dot" aria-hidden="true"></span>
                  {{ statusOf(item).label }}
                </span>
              </div>
              <!-- Color accent bar -->
              <div class="w-full h-1 rounded-full" :style="{ backgroundColor: item.color }"></div>

              <div>
                <h3 class="text-lg font-semibold leading-tight" style="color: var(--text);">{{ item.name }}</h3>
                <p class="text-xs mt-1 font-medium" style="color: var(--accent);">{{ item.tagline }}</p>
              </div>
              <p class="text-sm leading-relaxed flex-grow" style="color: var(--text-muted);">{{ item.description }}</p>

              <!-- Tech icons row -->
              <div class="flex items-center gap-2 mt-2">
                <img v-for="icon in item.icons" :key="icon.name"
                  :src="icon.src" :alt="icon.name" :title="icon.name" loading="lazy"
                  class="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" :class="{ 'icon-dark': icon.dark }" />
              </div>

              <div class="text-xs mt-1" style="color: var(--accent);">{{ item.tech }}</div>

              <div class="flex justify-between items-center gap-2 mt-2 pt-3" style="border-top: 1px solid var(--border);">
                <span class="org-tag">{{ item.org }}</span>
                <div class="flex items-center gap-2">
                  <span v-if="item.note" class="text-[11px] italic text-right" style="color: var(--text-muted);">{{ item.note }}</span>
                  <a v-if="item.demo" :href="item.demo" target="_blank" rel="noreferrer"
                    title="View live site" class="transition-colors hover:opacity-80" style="color: var(--text-muted);">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                  <a v-if="item.playstore" :href="item.playstore" target="_blank" rel="noreferrer"
                    title="View on Play Store" class="transition-colors hover:opacity-80" style="color: var(--text-muted);">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 9.991l-2.302 2.302L5.864 3.658z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- Hover preview for live sites -->
            <div v-if="hoveredProject === item.id && canPreview(item)"
              class="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 h-48 rounded-lg overflow-hidden shadow-2xl pointer-events-none"
              style="border: 2px solid var(--accent);">
              <iframe :src="item.demo" class="w-full h-full scale-50 origin-top-left pointer-events-none"
                style="width: 200%; height: 200%;" frameborder="0" loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>
            </div>
          </div>
        </div>

        <!-- Final Year Project -->
        <div class="mb-32">
          <div class="text-xl font-bold mb-6 flex items-center" style="color: var(--text);">
            <div class="h-[1px] w-10 md:w-20 mr-3" style="background-color: var(--accent);"></div>
            Final Year Project
          </div>
          <div class="rounded-xl p-6 md:p-8" style="background-color: var(--bg-card); border: 1px solid var(--border);">
            <h3 class="text-lg font-semibold mb-2" style="color: var(--text);">Brain Tumour Detection from MRI</h3>
            <p class="text-sm leading-relaxed mb-4" style="color: var(--text-muted);">
              AI medical imaging system built in Python, TensorFlow/Keras and OpenCV to detect and classify brain tumours from MRI scans. Implemented CNN, VGG-16, ResNet-50 and Inception-V3 for multi-class tumour classification: the system identifies tumour presence, classifies it as benign or malignant, and further categorises it as Glioma, Meningioma, Pituitary Tumour or No Tumour. Delivered as a complete Flask web application.
            </p>
            <div class="flex items-center gap-2">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" class="w-5 h-5 icon-dark" />
            </div>
            <div class="text-xs mt-2" style="color: var(--accent);">Python, TensorFlow/Keras, OpenCV, Flask, CNN, VGG-16, ResNet-50, Inception-V3</div>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<style>
.item-card:hover {
  transition: transform 0.3s ease;
  transform: translateY(-8px);
  background-color: var(--bg-card-hover) !important;
}

@keyframes fadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.94);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-zoom-in {
  animation: fadeZoomIn 0.6s ease-out;
}

/* Filter chips */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.filter-chip:hover {
  color: var(--text);
  border-color: rgba(var(--accent-rgb), 0.4);
}

.filter-chip.active {
  color: var(--accent);
  background-color: rgba(var(--accent-rgb), 0.1);
  border-color: rgba(var(--accent-rgb), 0.45);
}

.filter-count {
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.65rem;
  background-color: rgba(var(--accent-rgb), 0.12);
}

/* Status badge over the project image */
.status-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--sc);
  box-shadow: 0 0 8px var(--sc);
}

.org-tag {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text-muted);
  background-color: rgba(var(--accent-rgb), 0.06);
  border: 1px solid var(--border);
}

/* Black-on-transparent logos are invisible on the dark theme. */
html:not([data-theme="mono"]) .icon-dark {
  filter: invert(1) hue-rotate(180deg);
}
</style>
