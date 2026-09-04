<template>
  <main
    class="mt-10 md:mt-1 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]">
    <div class="space-y-2 text-center md:text-left px-10">
      <p class="fadein-bot" style="color: var(--accent);">Hello World, I'm</p>
      <h1 class="text-4xl font-bold md:text-5xl fadein-up" style="color: var(--text);">Hani Hashmi</h1>
      <div class="py-2">
        <h1
          class="typewrite text-xl font-semibold text-transparent bg-clip-text md:text-2xl fadein-up"
          style="background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));"
          ref="typewriter">
          <span class="wrap">{{ txt }}</span>
        </h1>
      </div>
      <p class="pr-4 fade-in-from-left leading-relaxed text-sm md:text-base max-w-lg" style="color: var(--text-muted);">
        Product Engineer with 3 years of experience building and shipping full-stack products across mobile, web and backend. Strong in TypeScript, React Native, Next.js, Node.js and Django, with bilingual Arabic/English (RTL) product experience.
      </p>
      <p class="text-sm fade-in-from-left flex items-center justify-center md:justify-start gap-1 pt-2" style="color: var(--text-muted);">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        Riyadh, Saudi Arabia
      </p>
      <br>
      <div class="fadein-bot fade-500 flex items-center gap-3 justify-center md:justify-start">
        <router-link to="/contact"
          class="flex items-center py-2 px-4 text-sm font-medium rounded-lg border transition duration-300 md:py-2.5 md:px-5 focus:outline-none w-fit hover:opacity-80"
          style="color: var(--accent); border-color: var(--accent);">
          <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Get In Touch
        </router-link>
        <router-link to="/portfolio"
          class="flex items-center py-2 px-4 text-sm font-medium rounded-lg border transition duration-300 md:py-2.5 md:px-5 focus:outline-none w-fit hover:opacity-80"
          style="color: var(--text); border-color: var(--border);">
          View My Work
        </router-link>
      </div>
    </div>
    <div class="flex justify-center md:justify-start fadein-right">
      <div class="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 pict overflow-hidden flex items-center justify-center"
        style="border-color: #000000; background-color: #000000;">
        <video
          src="/videos/welcome.mov"
          autoplay
          loop
          muted
          playsinline
          class="w-[140%] h-[140%] object-contain"
          style="transform: scale(0.7);"
          aria-label="Hani Hashmi welcome animation"
        ></video>
      </div>
    </div>
  </main>

  <CurrentlyWorkingOn />
</template>

<script>
import CurrentlyWorkingOn from '../components/CurrentlyWorkingOn.vue'

export default {
  name: 'HomeView',
  components: { CurrentlyWorkingOn },
  data() {
    return {
      toRotate: ["Product Engineer", "Full-Stack Developer", "React Native Dev", "Next.js & Node.js Dev"],
      period: 2000,
      txt: '',
      loopNum: 0,
      isDeleting: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
    });
  },
  methods: {
    tick() {
      let typewriter = this.$refs.typewriter;

      if (!typewriter) {
        return;
      }

      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
      typewriter.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(() => {
        that.tick();
      }, delta);
    },
  }
}
</script>

<style>
body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.typewrite>.wrap {
  border-right: 0.08em solid var(--text);
}

.pict {
  box-shadow: 0px 0px 73px -9px var(--img-glow);
  -webkit-box-shadow: 0px 0px 73px -9px var(--img-glow);
  -moz-box-shadow: 0px 0px 73px -9px var(--img-glow);
}

.fadein-up {
  opacity: 0;
  animation-name: fadeInUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  animation-delay: 500ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fade-in-from-left {
  opacity: 0;
  animation: fadeInLeftHome 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInLeftHome {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-right {
  opacity: 0;
  animation: fadeInRight 0.5s ease-out forwards;
  animation-delay: 500ms;
}

@keyframes fadeInRight {
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

.fadein-1 {
  animation-delay: 200ms;
}
.fadein-2 {
  animation-delay: 400ms;
}
.fadein-3 {
  animation-delay: 600ms;
}
.fade-500 {
  animation-delay: 500ms;
}
</style>
