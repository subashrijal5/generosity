<template>
  <div>
    <UiNavbar sticky>
      <UiContainer class="flex h-14 items-center justify-between">
        <router-link to="/" tag="button">
          <p class="text-lg font-semibold">ジェネロシティ大学</p>
        </router-link>
        <div class="flex items-center gap-2">
          <UiButton
            @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'"
            variant="ghost"
            size="icon-sm"
          >
            <Icon name="lucide:sun-medium" class="h-4 w-4" />
          </UiButton>
          <router-link v-if="!isAuthenticated" to="/auth/login" tag="button">
            <UiButton variant="outline" size="sm"> ログイン </UiButton>
          </router-link>
          <router-link v-if="!isAuthenticated" to="/auth/register" tag="button">
            <UiButton variant="outline" size="sm"> 新規登録 </UiButton>
          </router-link>
          <router-link v-if="isAuthenticated" to="/dashboard" tag="button">
            <UiButton variant="outline" size="sm"> ダッシュボード </UiButton>
          </router-link>

          <UiButton v-if="isAuthenticated" @click="logout()" variant="outline" size="sm">
            ログアウト
          </UiButton>
        </div>
      </UiContainer>
    </UiNavbar>

    <slot />
  </div>
</template>

<script lang="ts" setup>
  const { logout, isAuthenticated } = useAuth();
</script>
