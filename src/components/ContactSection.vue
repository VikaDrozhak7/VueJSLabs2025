<template>
  <section id="contact" class="section">
    <div class="section-inner contact-grid">
      <div>
        <h2 class="section-title">Напишіть нам</h2>
        <p class="section-subtitle">
          Заповніть форму, і ми звʼяжемося з вами, щоб показати, як TaskFlow
          може допомогти вашій команді.
        </p>

        <Card>
          <template #title>Форма зворотного звʼязку</template>
          <template #content>
            <form @submit.prevent="handleSubmit" class="form-grid">
              <div class="form-field">
                <label class="field-label" for="name">Імʼя*</label>
                <InputText
                    id="name"
                    v-model="form.name"
                    :class="{ 'p-invalid': errors.name }"
                    placeholder="Ваше імʼя"
                />
                <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
              </div>

              <div class="form-field">
                <label class="field-label" for="email">Email*</label>
                <InputText
                    id="email"
                    v-model="form.email"
                    :class="{ 'p-invalid': errors.email }"
                    placeholder="name@company.com"
                />
                <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
              </div>

              <div class="form-field">
                <label class="field-label" for="phone">Телефон</label>
                <InputMask
                    id="phone"
                    v-model="form.phone"
                    mask="+38 (999) 999-99-99"
                    placeholder="+38 (0__) ___-__-__"
                />
              </div>

              <div class="form-field">
                <label class="field-label" for="message">
                  Повідомлення / коментар*
                </label>
                <Textarea
                    id="message"
                    v-model="form.message"
                    :autoResize="true"
                    rows="4"
                    :class="{ 'p-invalid': errors.message }"
                    placeholder="Коротко опишіть ваш запит..."
                />
                <small v-if="errors.message" class="field-error">
                  {{ errors.message }}
                </small>
              </div>

              <div class="form-field">
                <div style="display:flex; gap:0.5rem; align-items:flex-start;">
                  <Checkbox
                      inputId="agree"
                      v-model="form.agree"
                      :binary="true"
                      :class="{ 'p-invalid': errors.agree }"
                  />
                  <label for="agree" style="font-size:0.9rem;">
                    Погоджуюсь з політикою конфіденційності*
                  </label>
                </div>
                <small v-if="errors.agree" class="field-error">
                  {{ errors.agree }}
                </small>
              </div>

              <div style="display:flex; justify-content:flex-end; margin-top:1rem;">
                <Button type="submit" label="Надіслати" icon="pi pi-send" />
              </div>
            </form>
          </template>
        </Card>
      </div>

      <div>
        <Card>
          <template #title>Підтримка та продажі</template>
          <template #content>
            <p style="font-size:0.9rem; margin-bottom:0.75rem;">
              Якщо питання термінове — напишіть нам на email служби підтримки
              або скопіюйте адресу за допомогою кнопки нижче.
            </p>

            <div
                style="padding:0.9rem; border-radius:0.75rem; background:#f9fafb; margin-bottom:1rem;"
            >
              <div style="font-size:0.8rem; opacity:0.8;">
                Email служби підтримки
              </div>
              <div
                  style="font-weight:600; font-size:0.95rem; margin-top:0.25rem;"
              >
                support@taskflow.cloud
              </div>
              <Button
                  size="small"
                  severity="secondary"
                  style="margin-top:0.5rem;"
                  @click="$emit('copySupport')"
              >
                <i class="pi pi-copy" style="margin-right:0.35rem;"></i>
                Скопіювати email
              </Button>
            </div>

            <p style="font-size:0.85rem; opacity:0.8;">
              Зазвичай відповідаємо протягом одного робочого дня.
            </p>
          </template>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: '',
  agree: false,
});

const errors = reactive({
  name: '',
  email: '',
  message: '',
  agree: '',
});

const resetErrors = () => {
  errors.name = '';
  errors.email = '';
  errors.message = '';
  errors.agree = '';
};

const resetForm = () => {
  form.name = '';
  form.email = '';
  form.phone = '';
  form.message = '';
  form.agree = false;
};

const validateEmail = (value) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
};

const handleSubmit = () => {
  resetErrors();
  let hasError = false;

  if (!form.name.trim()) {
    errors.name = 'Вкажіть, будь ласка, ваше імʼя.';
    hasError = true;
  }

  if (!form.email.trim()) {
    errors.email = 'Вкажіть ваш email.';
    hasError = true;
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Вкажіть коректний email.';
    hasError = true;
  }

  if (!form.message.trim()) {
    errors.message = 'Опишіть, будь ласка, ваш запит.';
    hasError = true;
  }

  if (!form.agree) {
    errors.agree = 'Потрібно погодитися з політикою конфіденційності.';
    hasError = true;
  }

  if (hasError) {
    toast.add({
      severity: 'warn',
      summary: 'Перевірте форму',
      detail: 'Заповніть усі обовʼязкові поля.',
      life: 3000,
    });
    return;
  }

  resetForm();
  toast.add({
    severity: 'success',
    summary: 'Заявку надіслано',
    detail: 'Ми звʼяжемося з вами найближчим часом.',
    life: 4000,
  });
};
</script>

<style scoped>
.form-grid {
  display: grid;
  gap: 1rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 0.85rem;
  margin-bottom: 0.25rem;
}

.field-error {
  color: #dc2626;
  font-size: 0.75rem;
  margin-top: 0.2rem;
}
</style>
