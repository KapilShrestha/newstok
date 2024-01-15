// frontend/src/utilities.ts
export function togglePasswordVisibility(passwordInputId: string, passwordToggleId: string) {
    const passwordInput = document.getElementById(passwordInputId) as HTMLInputElement;
    const passwordVisibilityToggle = document.getElementById(passwordToggleId) as HTMLSpanElement;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordVisibilityToggle.innerHTML = '<i class="ri-eye-line"></i>';
    } else {
        passwordInput.type = 'password';
        passwordVisibilityToggle.innerHTML = '<i class="ri-eye-off-line"></i>';
    }
}
