const form = document.querySelector('form');

function showToast() {
	const toast = document.getElementById('toast');
	toast.classList.add('show');

	setTimeout(() => {
		toast.classList.remove('show');
	}, 4000); // toast stays visible for 4 seconds
}

const validateField = (field) => {
	const errorEl =
		field.type === 'radio'
			? field.closest('fieldset').querySelector('.error-message')
			: field.parentElement.querySelector('.error-message');

	if (errorEl) {
		errorEl.textContent = 'Please select an option';
	} else {
		console.warn('Error message element not found for field:', field);
	}

	if (!field.validity.valid) {
		errorEl.textContent = field.dataset.error || 'This field is required';
		return false;
	}
	errorEl.textContent = '';
	return true;
};

form.querySelectorAll('input, textarea').forEach((input) => {
	input.addEventListener('blur', () => {
		validateField(input);
	});
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	let isValid = true;

	const fields = form.querySelectorAll('input, textarea');

	fields.forEach((field) => {
		const fieldValid = validateField(field);
		if (!fieldValid) {
			isValid = false;
		}
	});

	const invalidField = form.querySelector(':invalid');

	if (invalidField) {
		// Focus the first invalid field to guide the user
		invalidField.focus();
	} else {
		// No invalid fields, safe to submit
		showToast();
		form.reset();
	}
});
