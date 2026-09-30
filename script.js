function addFood() {
    const foodName = document.getElementById("foodName").value;
    const expiryDate = document.getElementById("expiryDate").value;

    if (foodName === "" || expiryDate === "") {
        alert("Please enter food name and expiry date.");
        return;
    }

    const food = {
        name: foodName,
        expiry: expiryDate
    };

    let foods = JSON.parse(localStorage.getItem("foods")) || [];

    foods.push(food);

    localStorage.setItem("foods", JSON.stringify(foods));

    document.getElementById("foodName").value = "";
    document.getElementById("expiryDate").value = "";

    displayFoods();
}

function displayFoods() {
    const foodList = document.getElementById("foodList");

    foodList.innerHTML = "";

    let foods = JSON.parse(localStorage.getItem("foods")) || [];

    foods.forEach((food, index) => {

        const today = new Date();
        const expiry = new Date(food.expiry);

        const difference = expiry - today;
        const daysLeft = Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );

        let status = "";
        let className = "";

        if (daysLeft < 0) {
            status = "❌ Expired";
            className = "expired";
        } 
        else if (daysLeft <= 3) {
            status = "⚠️ Expiring Soon";
            className = "soon";
        } 
        else {
            status = "✅ Fresh";
            className = "fresh";
        }

        foodList.innerHTML += `
            <div class="food-item ${className}">
                <strong>${food.name}</strong>
                <p>Expiry Date: ${food.expiry}</p>
                <p>${status}</p>

                <button 
                    class="delete-btn"
                    onclick="deleteFood(${index})">
                    Delete
                </button>
            </div>
        `;
    });
}

function deleteFood(index) {

    let foods = JSON.parse(localStorage.getItem("foods")) || [];

    foods.splice(index, 1);

    localStorage.setItem("foods", JSON.stringify(foods));

    displayFoods();
}

displayFoods();
