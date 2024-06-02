<template>
  <div>
    <div class="container grid grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)]">
      <SectionsSidebar></SectionsSidebar>

      <div class="mx-auto w-full pb-5 md:max-w-2xl lg:max-w-full">
        <UiNavbar sticky>
          <UiContainer class="flex h-14 items-center justify-end">
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
              <router-link v-if="isAuthenticated" to="/auth/user" tag="button">
                <UiButton variant="outline" size="sm"> プロフィール </UiButton>
              </router-link>

              <UiButton v-if="isAuthenticated" @click="logout()" variant="outline" size="sm">
                ログアウト
              </UiButton>
            </div>
          </UiContainer>
        </UiNavbar>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { logout, isAuthenticated } = useAuth();
</script>
