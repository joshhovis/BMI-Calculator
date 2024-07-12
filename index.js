document.addEventListener("DOMContentLoaded", () => {
    const radioButtons =
        document.querySelectorAll("input[name=radio]");
    const resultsHeader = document.querySelector(
        ".input-results-header"
    );
    const resultsDescription = document.querySelector(
        ".input-results-description"
    );
    const heightInput = document.querySelector(".input-height");
    const weightInput = document.querySelector(".input-weight");
    const feetInput = document.querySelector(".input-feet");
    const inchesInput = document.querySelector(".input-inches");
    const stonesInput = document.querySelector(".input-stones");
    const poundsInput = document.querySelector(".input-pounds");
    const metricInputs = document.querySelectorAll(".metric-input");
    const imperialInputs =
        document.querySelectorAll(".imperial-input");

    // Weight range calulator based on height in cm
    function calculateIdealWeightRange(heightInCm) {
        let heightInMeters = heightInCm / 100;
        let minWeight = 18.5 * (heightInMeters ** 2);
        let maxWeight = 24.9 * (heightInMeters ** 2);

        return {
            minWeight: minWeight.toFixed(1),
            maxWeight: maxWeight.toFixed(1)
        };
    }

    function calculateBMI() {
        const selectedUnit = document.querySelector(
            'input[name="radio"]:checked'
        ).value;
        let height, weight, bmi;

        if (selectedUnit === "1") {
            // Metric
            height = parseFloat(heightInput.value);
            weight = parseFloat(weightInput.value);

            // Return error message if user does not enter a number
            if (isNaN(height) || isNaN(weight)) {
                resultsDescription.textContent =
                    "Please enter a valid height and weight";
                return;
            }

            bmi = (weight / height ** 2) * 10000;

            // Calculate ideal weight range
            const idealWeightRange = calculateIdealWeightRange(height);

            if (bmi < 18.5) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're underweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
            `;
            } else if (bmi >= 18.5 && bmi < 24.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're a healthy weight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
            } else if (bmi >= 25 && bmi <= 29.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're overweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
            } else {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're obese. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
            }

        } else {
            // imperial
            const feet = parseFloat(feetInput.value);
            const inches = parseFloat(inchesInput.value);
            const stones = parseFloat(stonesInput.value);
            const pounds = parseFloat(poundsInput.value);

            if (
                isNaN(feet) ||
                isNaN(inches) ||
                isNaN(stones) ||
                isNaN(pounds)
            ) {
                resultsDescription.textContent =
                    "Please enter a valid height and weight";
                return;
            }

            height = feet * 12 + inches;
            weight = stones * 14 + pounds;
            bmi = (weight / height ** 2) * 703;

            resultsDescription.innerHTML = `
            Your BMI suggests you're a healthy weight.
        `;
        }

        resultsHeader.innerHTML = `
        Your BMI is... <span class="bmi">${bmi.toFixed(1)}</span>`;
    }

    radioButtons.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.value === "1") {
                metricInputs.forEach(
                    (input) => (input.style.display = "flex")
                );
                imperialInputs.forEach(
                    (input) => (input.style.display = "none")
                );
            } else {
                metricInputs.forEach(
                    (input) => (input.style.display = "none")
                );
                imperialInputs.forEach(
                    (input) => (input.style.display = "flex")
                );
            }
            calculateBMI();
        });
    });

    heightInput.addEventListener("input", calculateBMI);
    weightInput.addEventListener("input", calculateBMI);
    feetInput.addEventListener("input", calculateBMI);
    inchesInput.addEventListener("input", calculateBMI);
    stonesInput.addEventListener("input", calculateBMI);
    poundsInput.addEventListener("input", calculateBMI);
});
