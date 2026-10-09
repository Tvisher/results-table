<template>
  <div class="layout-wrapper">
    <div class="container">
      <div class="page-head">
        <div class="page-head__wrapper">
          <h1>Результаты голосования</h1>
          <p>
            Подсчет шорт/не шорт и средних баллов по критериям. Фильтры,
            сортировка, экспорт в Excel.
          </p>
        </div>
        <div class="export-btn">Экспорт в Excel</div>
      </div>
      <div class="steps-btn-wrapper">
        <router-link to="/" class="nav-step-btn" exact-active-class="active">
          Голосование — 1 этап
        </router-link>

        <router-link
          to="/step-two"
          class="nav-step-btn hide"
          exact-active-class="active"
        >
          Голосование — 2 этап
        </router-link>
      </div>
      <main class="content-area">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup></script>

<style>
.nav-step-btn.hide {
  opacity: 0.3;
  pointer-events: none;
}
</style>
