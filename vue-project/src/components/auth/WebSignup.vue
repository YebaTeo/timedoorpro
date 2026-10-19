<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseButton from "../ui/BaseButton.vue";
import BaseInput from "../ui/BaseInput.vue";

const store = useStore();
const router = useRouter();
const passwordStatusDisplay = ref("none");
const confirmPasswordDoesNotMacth = ref("none");
const confirmPasswordMacth = ref("none");
const signupData = reactive({
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
  imageLink: "",
});

const passwordCheck = () => {
  passwordStatusDisplay.value =
    signupData.password.length < 8 ? "block" : "none";
};
const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMacth.value = "none";
    confirmPasswordMacth.value = "none";
    return;
  }
  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMacth.value = "block";
    confirmPasswordMacth.value = "none";
    return;
  }
  confirmPasswordDoesNotMacth.value = "none";
  confirmPasswordMacth.value = "block";
};
const checkImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  });
};
const register = async () => {
  if (
    signupData.password !== signupData.confirmationPassword ||
    signupData.password.length < 8
  ) {
    signupData.confirmationPassword = "";
    signupData.password = "";
    confirmPasswordDoesNotMacth.value = "none";
    confirmPasswordMacth.value = "none";
  } else {
    await store.dispatch("auth/getRegisterData", signupData);
    router.push("/");
  }
};
</script>

<template>
  <div class="container-fluid py-5" style="background-color: #f5f5f5">
    <div style="background-color: #ffffff" class="p-5 m-auto signup-form">
      <div class="text-center">
        <h2 class="mt-4">Create your account</h2>
        <p>Enter your details to use all the app features.</p>
      </div>
      <form class="mt-3" @submit.prevent="register">
        <div class="row">
          <div class="col-md-6">
            <BaseInput
              type="text"
              identity="firstname"
              placeholder="Ex: Jack"
              label="Firstname"
              v-model="signupData.firstname"
            />
          </div>
          <div class="col-md-6">
            <BaseInput
              type="text"
              identity="lastname"
              placeholder="Ex: Daniel"
              label="Lastname"
              v-model="signupData.lastname"
            />
          </div>
        </div>
        <div class="my-4">
          <BaseInput
            type="text"
            identity="username"
            placeholder="Your username"
            label="Username"
            v-model="signupData.username"
          />
        </div>
        <div class="my-4">
          <BaseInput
            type="email"
            identity="email"
            placeholder="Your email address"
            label="Email"
            v-model="signupData.email"
          />
        </div>
        <div class="my-4">
          <BaseInput
            type="password"
            identity="password"
            placeholder="Your password"
            label="Password"
            v-model="signupData.password"
            @keyInput="passwordCheck"
          />
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: passwordStatusDisplay }"
          >
            The password field must be at least 8 characters
          </p>
        </div>
        <div class="my-4">
          <BaseInput
            type="password"
            identity="confirmationPassword"
            placeholder="Same with password"
            label="Confirmation Password"
            v-model="signupData.confirmationPassword"
            @keyInput="confirmationPasswordCheck"
          />
          <p
            class="text-danger mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordDoesNotMacth }"
          >
            The password confirmation does not match
          </p>
          <p
            class="text-success mt-1 fw-medium"
            style="font-size: 11px"
            :style="{ display: confirmPasswordMacth }"
          >
            The password confirmation does match
          </p>
        </div>
        <div class="my-4">
          <BaseInput
            type="file"
            identity="recipeImage"
            label="Profile Photo"
            :isImage="true"
            accept="image/*"
            @input="checkImage"
            v-slot="{ openFilePicker }"
          >
            <button
              class="profile-photo-picker"
              type="button"
              aria-label="Choose profile photo"
              @click="openFilePicker"
            >
              <img
                v-if="signupData.imageLink"
                :src="signupData.imageLink"
                alt="Selected profile photo"
                class="profile-photo-avatar"
              />
              <svg
                v-else
                class="profile-photo-avatar"
                viewBox="0 0 200 200"
                role="img"
                aria-label="Default profile photo"
              >
                <circle cx="100" cy="100" r="97" fill="#fff" stroke="#e1e5e8" stroke-width="2" />
                <circle cx="100" cy="100" r="91" fill="#566889" />
                <path
                  d="M31 160c12-14 28-23 42-29 7-3 11-10 11-18v-9c-8-7-13-19-13-31V62c0-21 13-35 29-35s29 14 29 35v11c0 12-5 24-13 31v9c0 8 4 15 11 18 14 6 30 15 42 29-16 20-41 32-69 32s-53-12-69-32Z"
                  fill="#eef3f3"
                />
                <path
                  d="M68 74c-5 0-8 4-8 9v12c0 5 3 9 8 9m64-30c5 0 8 4 8 9v12c0 5-3 9-8 9"
                  fill="#eef3f3"
                />
              </svg>
              <span class="profile-photo-camera" aria-hidden="true">
                <svg viewBox="0 0 24 24" focusable="false">
                  <path
                    d="M9 4 7.5 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5L15 4H9Zm3 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  />
                </svg>
              </span>
            </button>
          </BaseInput>
        </div>
        <BaseButton class="login w-100 my-3">Register</BaseButton>
      </form>
      <div class="text-center mt-4">
        <p class="fw-semibold">
          Already have account?
          <span style="color: #4c4ddc"
            ><RouterLink to="/login" class="text-decoration-none"
              >Login</RouterLink
            ></span
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-photo-picker {
  position: relative;
  display: block;
  width: 190px;
  height: 190px;
  margin-top: 8px;
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
}

.profile-photo-picker:focus-visible {
  outline: 3px solid var(--base-color);
  outline-offset: 4px;
}

.profile-photo-avatar {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.profile-photo-camera {
  position: absolute;
  right: 50%;
  bottom: -5px;
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  transform: translateX(50%);
  border: 3px solid #fff;
  border-radius: 50%;
  background: #fff;
  color: #17212b;
}

.profile-photo-camera svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}
</style>
