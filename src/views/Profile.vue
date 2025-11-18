<template>
  <section>
    <h2>{{ t('profile.title') }}</h2>

    <form @submit.prevent="onSubmit" class="form card">
      <FieldBlock :label="t('profile.name')" name="name" />
      <FieldBlock :label="t('profile.email')" name="email" type="email" />
      <FieldBlock :label="t('profile.dateOfBirth')" name="dateOfBirth" type="date" />
      <FieldBlock :label="t('profile.address')" name="address" type="textarea" />

      <div class="phones">
        <label>{{ t('profile.phones') }}</label>

        <div
            class="phone-row"
            v-for="(phone, index) in phoneFields"
            :key="phone.key"
        >
          <Field :name="`phones[${index}]`" v-slot="{ field, errorMessage }">
            <div class="phone-input-block">
              <input
                  v-bind="field"
                  type="text"
                  class="input"
                  :class="{ 'input-error': !!errorMessage }"
              />
              <p v-if="errorMessage" class="error">
                {{ errorMessage }}
              </p>
            </div>
          </Field>

          <button
              type="button"
              class="btn-remove"
              @click="removePhone(index)"
              :disabled="phoneFields.length === 1"
          >
            {{ t('buttons.remove') }}
          </button>
        </div>

        <p v-if="typeof errors.phones === 'string'" class="error">
          {{ errors.phones }}
        </p>

        <button type="button" class="btn-add" @click="addPhone">
          {{ t('buttons.addPhone') }}
        </button>
      </div>

      <div class="actions">
        <button type="submit">{{ t('buttons.save') }}</button>
        <button type="button" @click="reset">{{ t('buttons.reset') }}</button>
      </div>
    </form>

    <ModalWindow
        v-if="showModal"
        title="Введені дані"
        @close="showModal = false"
    >
      <div class="modal-item"><strong>{{ t('profile.name') }}:</strong> {{ submittedData.name }}</div>
      <div class="modal-item"><strong>Email:</strong> {{ submittedData.email }}</div>
      <div class="modal-item"><strong>{{ t('profile.dateOfBirth') }}:</strong> {{ submittedData.dateOfBirth }}</div>
      <div class="modal-item"><strong>{{ t('profile.address') }}:</strong> {{ submittedData.address }}</div>

      <div class="modal-item">
        <strong>{{ t('profile.phones') }}:</strong>
        <ul>
          <li v-for="(p, idx) in submittedData.phones" :key="idx">{{ p }}</li>
        </ul>
      </div>
    </ModalWindow>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { useForm, useFieldArray, Field } from "vee-validate"
import * as yup from "yup"
import { useI18n } from "vue-i18n"
import FieldBlock from "@/components/FieldBlock.vue"
import ModalWindow from "@/components/ModalWindow.vue"

const { t } = useI18n()

const showModal = ref(false)
const submittedData = ref({})
const usedEmails = ref([])
const phoneRegExp = /^(?:\+?380|0)\d{9}$/

const schema = yup.object({
  name: yup.string().required(t("errors.required")),
  email: yup.string()
      .email(t("errors.email"))
      .required(t("errors.required"))
      .test("email-taken", t("errors.emailTaken"),
          value => !usedEmails.value.includes(value)
      ),
  dateOfBirth: yup.string().required(t("errors.required")),
  address: yup.string().required(t("errors.required")),
  phones: yup
      .array()
      .of(
          yup.string()
              .required(t("errors.required"))
              .matches(phoneRegExp, t("errors.wrongPhone"))
      )
      .min(1, t("errors.minOnePhone"))
})

const { errors, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    phones: [""]
  }
})

const { fields: phoneFields, push, remove } = useFieldArray("phones")

const addPhone = () => push("")
const removePhone = (i) => {
  if (phoneFields.value.length > 1) {
    remove(i)
  }
}

const onSubmit = handleSubmit((values) => {
  submittedData.value = values
  showModal.value = true
  usedEmails.value.push(values.email)
})

const reset = () => {
  resetForm()
  showModal.value = false
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-item {
  margin-bottom: 10px;
}

.phone-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.phone-input-block {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-error {
  border-color: #e63946 !important;
}

.error {
  color: #e63946;
  margin-top: 4px;
}

.btn-remove {
  background: #ff5252;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
}

.btn-add {
  margin-top: 8px;
  padding: 6px 10px;
  background: #1976d2;
  color: white;
  border-radius: 6px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}
</style>
