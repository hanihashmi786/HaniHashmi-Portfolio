<script>
export default {
  name: 'ExperienceCard',
  props: {
    exp: { type: Object, required: true },
    expanded: { type: Boolean, default: false },
    // Tighter spacing and type for the stacked mobile timeline.
    compact: { type: Boolean, default: false }
  },
  emits: ['toggle']
}
</script>

<template>
  <div
    class="exp-card rounded-xl text-left transition-all duration-300 cursor-pointer"
    :class="[compact ? 'p-4' : 'p-5', expanded ? 'is-open' : '']"
    style="background-color: var(--bg-card); border: 1px solid var(--border);"
    role="button"
    tabindex="0"
    :aria-expanded="expanded"
    @click="$emit('toggle')"
    @keydown.enter.prevent="$emit('toggle')"
    @keydown.space.prevent="$emit('toggle')">
    <div class="flex items-start gap-3">
      <div v-if="!compact" class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div class="flex-grow min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <p class="text-xs font-medium" style="color: var(--accent);">{{ exp.period }}</p>
          <span v-if="exp.current" class="now-pill">
            <span class="now-dot" aria-hidden="true"></span>
            Present
          </span>
        </div>
        <h3 :class="compact ? 'text-sm' : 'text-base'" class="font-bold mt-0.5" style="color: var(--text);">{{ exp.role }}</h3>
        <p class="text-xs mt-1 flex items-center gap-1" style="color: var(--text-muted);">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span>{{ exp.company }} | {{ exp.location }}</span>
        </p>
        <p v-if="exp.note" class="text-[11px] mt-1 italic" style="color: var(--text-muted); opacity: 0.8;">{{ exp.note }}</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 transition-transform duration-300" :class="expanded ? 'rotate-180' : ''" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <!-- Expanded content -->
    <div v-if="expanded" class="mt-4 pt-4" style="border-top: 1px solid var(--border);">
      <p v-if="exp.summary" class="leading-relaxed mb-4" :class="compact ? 'text-xs' : 'text-sm'" style="color: var(--text-secondary);">{{ exp.summary }}</p>

      <template v-if="exp.products && exp.products.length">
        <h4 class="section-label">Products Delivered</h4>
        <ul class="flex flex-col gap-2 mb-4">
          <li v-for="p in exp.products" :key="p.name" class="product-row">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <div class="flex items-center gap-2 min-w-0 flex-wrap">
                <span class="w-2 h-2 rounded-full flex-shrink-0" :style="{ backgroundColor: p.color }"></span>
                <a v-if="p.url" :href="p.url" target="_blank" rel="noopener" class="font-semibold text-sm hover:underline" style="color: var(--text);" @click.stop>{{ p.name }}</a>
                <span v-else class="font-semibold text-sm" style="color: var(--text);">{{ p.name }}</span>
                <span class="text-xs" style="color: var(--text-muted);">{{ p.tagline }}</span>
              </div>
              <span class="status-pill" :style="{ color: p.statusColor, backgroundColor: p.statusColor + '22', borderColor: p.statusColor + '55' }">{{ p.status }}</span>
            </div>
            <p class="text-[11px] mt-1 pl-4 leading-relaxed" style="color: var(--text-muted); opacity: 0.85;">{{ p.stack }}</p>
          </li>
        </ul>
      </template>

      <h4 class="section-label">Key Responsibilities</h4>
      <ul class="flex flex-col gap-1.5 mb-4">
        <li v-for="(r, ri) in exp.responsibilities" :key="ri" class="leading-relaxed flex items-start gap-2" :class="compact ? 'text-xs' : 'text-sm'" style="color: var(--text-muted);">
          <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
          <span>{{ r }}</span>
        </li>
      </ul>

      <h4 class="section-label">Impact</h4>
      <ul class="flex flex-col gap-1.5">
        <li v-for="(i, ii) in exp.impact" :key="ii" class="leading-relaxed flex items-start gap-2" :class="compact ? 'text-xs' : 'text-sm'" style="color: var(--text-muted);">
          <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
          <span>{{ i }}</span>
        </li>
      </ul>

      <div v-if="exp.stack && exp.stack.length" class="flex flex-wrap gap-1.5 mt-4 pt-3" style="border-top: 1px solid var(--border);">
        <span v-for="s in exp.stack" :key="s" class="stack-chip">{{ s }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.exp-card:hover {
  border-color: rgba(var(--accent-rgb), 0.4) !important;
}

.exp-card.is-open {
  border-color: rgba(var(--accent-rgb), 0.5) !important;
}

.exp-card:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.now-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #22c55e;
  background: rgba(34, 197, 94, 0.12);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.now-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  animation: nowPulse 1.8s ease-out infinite;
}

@keyframes nowPulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.section-label {
  margin-bottom: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
}

.product-row {
  padding: 0.55rem 0.7rem;
  border-radius: 0.6rem;
  background: rgba(var(--accent-rgb), 0.05);
  border: 1px solid rgba(var(--accent-rgb), 0.12);
}

.status-pill {
  flex: none;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stack-chip {
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid rgba(var(--accent-rgb), 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .now-dot {
    animation: none;
  }
}
</style>
