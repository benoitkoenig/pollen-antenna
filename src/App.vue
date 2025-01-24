<script setup lang="ts">
import AnonymousData from "./providers/AnonymousData.vue";
import ProfileData from "./providers/ProfileData.vue";
</script>

<template>
  <AnonymousData>
    <ProfileData>
      <router-view />
    </ProfileData>
  </AnonymousData>
</template>
