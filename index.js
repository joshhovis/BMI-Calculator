document.addEventListener("DOMContentLoaded", () => {
    const radioButtons =
        document.querySelectorAll("input[name=radio]");
    const resultsHeader = document.querySelector(
        ".input-results-header"
    );
    const resultsDescription = document.querySelector(
        ".input-results-description"
    );
    const inputResults = document.querySelector(".input-results");
    const heightInput = document.querySelector(".input-height");
    const weightInput = document.querySelector(".input-weight");
    const feetInput = document.querySelector(".input-feet");
    const inchesInput = document.querySelector(".input-inches");
    const stonesInput = document.querySelector(".input-stones");
    const poundsInput = document.querySelector(".input-pounds");
    const metricInputs = document.querySelectorAll(".metric-input");
    const imperialInputs =
        document.querySelectorAll(".imperial-input");
    const resultMeaningDescription = document.querySelector(".result-text-description");

    // Weight range calulator based on height in cm
    function calculateIdealWeightRangeMetric(heightInCm) {
        let heightInMeters = heightInCm / 100;
        let minWeight = 18.5 * (heightInMeters ** 2);
        let maxWeight = 24.9 * (heightInMeters ** 2);

        return {
            minWeight: minWeight.toFixed(1),
            maxWeight: maxWeight.toFixed(1)
        };
    }

    function calculateIdealWeightRangeImperial(heightInInches) {
        let minWeight = 18.5 * (heightInInches ** 2) / 703;
        let maxWeight = 24.9 * (heightInInches ** 2) / 703;

        function convertToStonesAndPounds(weight) {
            const stones = Math.floor(weight / 14);
            const pounds = (weight % 14).toFixed(1);
            return { stones, pounds };
        }

        const minWeightInStonesAndPounds = convertToStonesAndPounds(minWeight);
        const maxWeightInStonesAndPounds = convertToStonesAndPounds(maxWeight);

        return {
            minWeight: `${minWeightInStonesAndPounds.stones}st ${minWeightInStonesAndPounds.pounds}`,
            maxWeight: `${maxWeightInStonesAndPounds.stones}st ${maxWeightInStonesAndPounds.pounds}`
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
            const idealWeightRange = calculateIdealWeightRangeMetric(height);

            // Give the description text a unique class name when a bmi is rendered so that we can reposition the results description according to design
            if (bmi) {
                inputResults.classList.add('_active');
            }

            if (bmi < 18.5) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're underweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
            `;
                resultMeaningDescription.innerHTML = "A BMI less than 18.5 is considered underweight. Being underweight can lead to health issues such as weakened immune system, fragile bones, and fatigue. Aim to include more nutrient-rich foods in your diet, such as lean proteins, whole grains, and healthy fats. It's also important to engage in regular strength training exercises to build muscle mass and improve overall health."
            } else if (bmi >= 18.5 && bmi < 24.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're a healthy weight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
                resultMeaningDescription.innerHTML = "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week."
            } else if (bmi >= 25 && bmi <= 29.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're overweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
                    resultMeaningDescription.innerHTML = "A BMI between 25 and 29.9 is considered overweight. Carrying excess weight can increase your risk of health problems like heart disease, hypertension, and type 2 diabetes. Focus on a balanced diet that limits processed foods and sugars, and includes plenty of vegetables, fruits, lean proteins, and whole grains. Regular physical activity, such as 30 minutes of moderate exercise most days of the week, is crucial for managing weight and improving health."
            } else {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're obese. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}kgs - ${idealWeightRange.maxWeight}kgs</span>.
                `;
                resultMeaningDescription.innerHTML = "A BMI of 30 or higher is considered obese. Obesity is associated with a higher risk of serious health conditions, including heart disease, diabetes, and certain cancers. To manage your weight, aim for a balanced diet that emphasizes nutrient-dense foods, reduces caloric intake, and limits unhealthy fats and sugars. Regular exercise, such as brisk walking, swimming, or cycling, is essential to support weight loss and enhance well-being. Consulting with a healthcare provider for personalized guidance can also be beneficial."
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

            if (bmi) {
                inputResults.classList.add('_active');
            }

            const idealWeightRange = calculateIdealWeightRangeImperial(height);

            if (bmi < 18.5) {
                resultsDescription.innerHTML = `
                    Your BMI suggests you're underweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}lbs - ${idealWeightRange.maxWeight}lbs</span>.
                `;
                resultMeaningDescription.innerHTML = "A BMI less than 18.5 is considered underweight. Being underweight can lead to health issues such as weakened immune system, fragile bones, and fatigue. Aim to include more nutrient-rich foods in your diet, such as lean proteins, whole grains, and healthy fats. It's also important to engage in regular strength training exercises to build muscle mass and improve overall health."
            } else if (bmi >= 18.5 && bmi < 24.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests you're a healthy weight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}lbs - ${idealWeightRange.maxWeight}lbs</span>.
                `;
                resultMeaningDescription.innerHTML = "A BMI range of 18.5 to 24.9 is considered a 'healthy weight.' Maintaining a healthy weight may lower your chances of experiencing health issues later on, such as obesity and type 2 diabetes. Aim for a nutritious diet with reduced fat and sugar content, incorporating ample fruits and vegetables. Additionally, strive for regular physical activity, ideally about 30 minutes daily for five days a week."
            } else if (bmi >= 25 && bmi <= 29.9) {
                resultsDescription.innerHTML = `
                    Your BMI suggests you're overweight. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}lbs - ${idealWeightRange.maxWeight}lbs</span>.
                `;
                    resultMeaningDescription.innerHTML = "A BMI between 25 and 29.9 is considered overweight. Carrying excess weight can increase your risk of health problems like heart disease, hypertension, and type 2 diabetes. Focus on a balanced diet that limits processed foods and sugars, and includes plenty of vegetables, fruits, lean proteins, and whole grains. Regular physical activity, such as 30 minutes of moderate exercise most days of the week, is crucial for managing weight and improving health."
            } else {
                resultsDescription.innerHTML = `
                    Your BMI suggests that you're obese. Your ideal weight is between <span class="weight-range">${idealWeightRange.minWeight}lbs - ${idealWeightRange.maxWeight}lbs</span>.
                `;
                resultMeaningDescription.innerHTML = "A BMI of 30 or higher is considered obese. Obesity is associated with a higher risk of serious health conditions, including heart disease, diabetes, and certain cancers. To manage your weight, aim for a balanced diet that emphasizes nutrient-dense foods, reduces caloric intake, and limits unhealthy fats and sugars. Regular exercise, such as brisk walking, swimming, or cycling, is essential to support weight loss and enhance well-being. Consulting with a healthcare provider for personalized guidance can also be beneficial."
        }
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
