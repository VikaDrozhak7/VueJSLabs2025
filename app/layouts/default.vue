<template>
  <div class="min-h-screen flex flex-col">
    <header class="header">
      <div class="header-inner">
        <NuxtLink to="/" class="header-logo">
          Житомирська політехніка
        </NuxtLink>

        <nav class="header-nav">
          <NuxtLink to="/">Головна</NuxtLink>
          <NuxtLink to="/blog">Інформаційні матеріали</NuxtLink>
          <NuxtLink to="/about">Про університет</NuxtLink>
        </nav>

        <div class="menu-btn">☰</div>
      </div>
    </header>

    <UContainer class="flex-1 flex flex-col py-6">
      <main class="flex-1 py-4">
        <slot />
      </main>

      <footer class="footer">
        © {{ new Date().getFullYear() }} Державний університет «Житомирська політехніка»
      </footer>
    </UContainer>
  </div>
</template>
