<script setup lang="ts">
import AnonymousData from "./providers/AnonymousData.vue";
import ProfileData from "./providers/ProfileData.vue";
import AnonymousDailyForm from "./views/AnonymousDailyForm.vue";
</script>

<template>
  <AnonymousData>
    <ProfileData>
      <AnonymousDailyForm />
    </ProfileData>
  </AnonymousData>
</template>
