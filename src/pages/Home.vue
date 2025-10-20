<template>
  <div class="container">
    <div class="card">
      <h2 style="margin-top:0">Головна</h2>
      <div class="row">
        <RouterLink class="btn" :to="{name:'login'}">Увійти</RouterLink>
        <RouterLink class="btn ghost" :to="{name:'register'}">Зареєструватися</RouterLink>
      </div>
    </div>
  </div>
</template>
