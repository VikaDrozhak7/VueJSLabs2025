<template>
  <div class="container" style="display:grid;place-items:center;min-height:100dvh">
    <div class="card" style="width:min(520px, 94vw);">
      <slot name="title">
        <h2 style="margin:0 0 6px">Welcome</h2>
      </slot>
      <p class="small" style="margin:0 0 18px"><slot name="subtitle"/></p>
      <slot/>
    </div>
  </div>
</template>
