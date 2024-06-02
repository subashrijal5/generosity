<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]"
    />

    <div
      class="relative w-full max-w-[380px] border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg min-[480px]:border"
    >
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="mt-1 text-muted-foreground">{{ description }}</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput required label="名前" name="name" placeholder="John Doe" />
          <UiVeeInput
            required
            label="メールアドレス"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <UiVeeInput
            required
            label="パスワード"
            type="password"
            name="password"
            placeholder="****"
          />
          <UiVeeInput
            required
            label="パスワードの確認"
            type="password"
            name="confirm_password"
            placeholder="****"
          />
          <UiButton class="w-full" type="submit">アカウントを作成する</UiButton>
        </fieldset>
      </form>
      <p class="mt-8 text-sm text-muted-foreground">
        すでにアカウントをお持ちですか？
        <NuxtLink
          class="font-semibold text-primary underline-offset-2 hover:underline"
          to="/auth/login"
          >ログイン</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { signUpFormSchema } from "~/schema/authSchema";
  import type { TSignupForm } from "~/schema/authSchema";

  const title = "新規登録";
  const description = "アカウントを作成して始めましょう。";

  const { signUp } = useAuth();

  useSeoMeta({ title, description });

  const { handleSubmit, isSubmitting } = useForm<TSignupForm>({
    validationSchema: signUpFormSchema,
  });

  const submit = handleSubmit(async (data) => {
    await signUp(data);
  });
</script>
