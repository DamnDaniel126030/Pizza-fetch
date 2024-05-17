

document.addEventListener("DOMContentLoaded", () => {
    
    const urlPizza = "https://merlinvizsga.hu/api/pizza/pizza";
    const urlBuyer = "https://merlinvizsga.hu/api/pizza/vevo";
    const urlCourier = "https://merlinvizsga.hu/api/pizza/futar"

    const images = [{
        imageUrl: "./pizzaImages/Pizza_capricciosa.jpg"
    }, {
        imageUrl: "./pizzaImages/pizza-frutti-di-mare.jpg"
    }, {
        imageUrl: "./pizzaImages/hawaii-pizza.png"
    }, {
        imageUrl: "./pizzaImages/pizza-vesuvio.jpg"
    }, {
        imageUrl: "./pizzaImages/pizza-sorrento.jpg"
    }];

    const pizzaCards = document.getElementById("pizzaCards");
    const orderForm = document.getElementById("orderForm");
    const nameInput = document.getElementById("nameInput");
    const addressInput = document.getElementById("addressInput");

    async function fetchPizza(){
        await fetch(urlPizza)
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                let pizzaOutput = document.getElementById("pizzaOutput");
                let out = "";
                for (let item of items){
                    out += `
                    <div class="col-md-4 mb-3 mx-auto">
                        <div class="card h-100">
                            <img src="${images[parseInt(item.pazon) - 1].imageUrl}" class="card-img-top h-100" alt="pizzaImage">
                            <div class="card-body">
                                <h5 class="card-title">${item.pnev}</h5>
                            </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">${item.par}</li>
                                </ul>
                            <div class="card-body">
                                <button class="btn btn-success" type="button" onclick="loadOrder()">Order</button>
                            </div>
                        </div>
                    </div>`
                };
                pizzaOutput.innerHTML = out;
            });
    };
    fetchPizza();

    async function fetchCourier(){
        await fetch(urlCourier)
            .then((response) => {
                return response.json();
            })
            .then((items) => {
                // valahogy el kell tárolni a futárok adatait
            })
    };
    fetchCourier();

    function loadOrder(){
        orderForm.classList.remove("d-none");
        pizzaCards.classList.add("d-none");
    };

    orderForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = nameInput.value;
        const address = addressInput.value;

        const buyer = {
            "vnev": name,
            "vcim": address
        };

        postBuyer(buyer);
        orderForm.classList.add("d-none");
        pizzaCards.classList.remove("d-none");
    })


    async function postBuyer(buyer){
        const response = await fetch(urlBuyer, {
            method: "POST",
            body: JSON.stringify(buyer),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (response.ok){
            alert("The order has been placed!")
        }
        else{
            alert("There was an error placing this order.")
        }
    };

    window.loadOrder = loadOrder;
})