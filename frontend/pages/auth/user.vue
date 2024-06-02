<template>
  <UiContainer>
    <div class="m-8 flex gap-8">
      <div
        class="w-full min-w-[360px] border border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
      >
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">あなたの詳細</h1>
        <p class="mt-1 text-muted-foreground">ここであなたの詳細を見ることができます。</p>

        <div class="mt-10">
          <fieldset class="grid gap-5">
            <div>
              <label class="font-bold" label="Name">名前:</label> <br />
              <label label="Name">{{ user?.name }}</label>
            </div>
            <div>
              <label class="font-bold" label="Email">メール:</label> <br />
              <label label="Email">{{ user?.email }}</label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        class="w-full min-w-[360px] border border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
      >
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">パスワードの変更</h1>
        <p class="mt-1 text-muted-foreground">ここでパスワードを変更できます。</p>

        <form class="mt-10" @submit="handleChangePassword">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <div>
              <UiVeeInput
                label="古いパスワード"
                type="password"
                name="oldPassword"
                placeholder="****"
              />
            </div>
            <div>
              <UiVeeInput
                label="新しいパスワード"
                type="password"
                name="newPassword"
                placeholder="****"
              />
            </div>
            <div>
              <UiVeeInput
                label="パスワードの確認"
                type="password"
                name="confirmPassword"
                placeholder="****"
              />
            </div>
            <div>
              <UiButton class="w-full" type="submit">送信</UiButton>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </UiContainer>
</template>
<script lang="ts" setup>
  import { changePasswordSchema } from "~/schema/authSchema";
  import type { TChangePasswordForm } from "~/schema/authSchema";

  definePageMeta({
    layout: "dashboard",
  });
  const { user } = useAuth();

  const { handleSubmit, isSubmitting, resetForm } = useForm<TChangePasswordForm>({
    validationSchema: changePasswordSchema,
  });
  const handleChangePassword = handleSubmit(async (data) => {
    useAuth()
      .changePassword(data)
      .then((res) => {
        if (res.status.value === "success") {
          resetForm();
        }
      });
  });
</script>
