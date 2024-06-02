<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="w-full max-w-[380px] border border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
    >
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">ログイン</h1>
      <p class="mt-1 text-muted-foreground">メールアドレスとパスワードを入力してログインしてください。</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <div>
            <UiVeeInput label="メールアドレス" type="email" name="email" placeholder="john@example.com" />
          </div>
          <div>
            <UiVeeInput label="パスワード" type="password" name="password" placeholder="****" />
          </div>
          <div>
            <UiButton class="w-full" type="submit">ログイン</UiButton>
          </div>
        </fieldset>
      </form>

      <p class="mt-4 text-sm text-muted-foreground">
        アカウントをお持ちでないですか？
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="/auth/register"
          >アカウントを作成する</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { LoginSchema } from "~/schema/authSchema";
  import type { TLoginForm } from "~/schema/authSchema";

  const { signIn } = useAuth();
  useSeoMeta({
    title: "ログイン",
    description: "メールアドレスとパスワードを入力してログインしてください。",
  });

  const { handleSubmit, isSubmitting } = useForm<TLoginForm>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (data) => signIn(data));
</script>
