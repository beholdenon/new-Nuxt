<script setup lang="ts">
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types';
const { data, status, getCsrfToken, getProviders } = useAuth();
const toast = useToast();
const form = ref();

const errMessage = reactive({
    title: undefined,
    description: undefined
})

const state = reactive({
    id: undefined,
    email: undefined,
    password: undefined,
    firstName: undefined,
    lastName: undefined,
    phone: undefined,
    role: undefined
})


const { data: user } = await useFetch('/api/users/', {
    query: { email: data.value.user.email }
})

if(user) {
    const foundUser = user.value.data[0];
    state.id = foundUser._id;
    state.email = foundUser.email;
    state.firstName = foundUser.firstName;
    state.lastName = foundUser.lastName;
    state.phone = foundUser.phone;
}

const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.email) errors.push({ path: 'email', message: 'Required' })
    if (!state.firstName) errors.push({ path: 'firstName', message: 'Required' })
    if (!state.lastName) errors.push({ path: 'lastName', message: 'Required' })
    if (!state.phone) errors.push({ path: 'lastNphoneame', message: 'Required' })
    return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
    try {
        const { data: responseData } = await useFetch('/api/users/update', {
            method: 'post',
            body: {
                id: state.id,
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                phone: state.phone
            }
        })

        toast.add({ title: 'Your profile has been updated.' })

        console.log(responseData.value)
    } catch (err) {
        if (err.statusCode === 422) {
            form.value.setErrors(err.data.errors.map((err) => {
                // Map validation errors to { path: string, message: string }
            }))
        }
    }

}

async function onError(event: FormErrorEvent) {
    console.log(event.errors);
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

</script>

<template>
    <UContainer class="max-w-3xl w-full">
        <UPageHeader title="Profile" description="Update your personal information below." />
        <UAlert v-if="errMessage.description" :description="errMessage.description" :title="errMessage.title" />
        <UForm :validate="validate" ref="form" :state="state" class="space-y-4" @submit="onSubmit" @error="onError">
            <UFormGroup label="First Name" name="firstName">
                <UInput v-model="state.firstName" icon="i-heroicons-user-circle" />
            </UFormGroup>

            <UFormGroup label="Last Name" name="lastName">
                <UInput v-model="state.lastName" icon="i-heroicons-user-circle" />
            </UFormGroup>

            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" icon="i-heroicons-envelope" placeholder="you@example.com" />
            </UFormGroup>

            <UFormGroup label="Phone" name="phone">
                <UInput v-model="state.phone" icon="i-heroicons-device-phone-mobile" />
            </UFormGroup>

            <UButton type="submit">
                Update
            </UButton>
        </UForm>
    </UContainer>

</template>