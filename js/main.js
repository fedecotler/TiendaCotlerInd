
function iniciarMap(){
    var coord = {lat:-34.5868388 ,lng: -58.4275246};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}



const clickButton = document.querySelectorAll(".button")
const tbody = document.querySelector(".tbody")
let carrito = []



clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarrito)
})




function addToCarrito(e) {
    const button = e.target
    const item = button.closest(".card");
    const itemTitle = item.querySelector(".card-title").textContent;  
    const itemPrecio = item.querySelector(".precio").textContent;
    const itemImg = item.querySelector(".card-img-top").src;

    const nuevoItem = {
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(nuevoItem)
    
}

function addItemCarrito(nuevoItem) {

    const alert = document.querySelector('.alert')

    setTimeout(function () {
        alert.classList.add('hide')
    }, 2000)
    alert.classList.remove('hide')

    

    const inputElemento = tbody.getElementsByClassName("input__elemento")
    for(let i = 0; i < carrito.length; i++){
        if(carrito[i].title.trim() == nuevoItem.title.trim()){
            carrito[i].cantidad++;
            const inputValor = inputElemento[i];
            inputValor.value++;
            carritoTotal()
            return null;
        }
    }

    carrito.push(nuevoItem)

    renderCarrito()
    
}

function renderCarrito() {
    tbody.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement("tr")
        tr.classList.add("itemCarrito")
        const contenido = `
                        <th scope="row">1</th>
                        <td class="table__productos">
                            <img src=${item.img} alt="">
                            <h6 class="title">${item.title}</h6>
                        </td>
                        <td class="table__precio"><p>${item.precio}</p></td>
                        <td class="table__cantidad">
                            <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                            <button class="delete btn btn-danger">x</button>
                        </td>
        
        `
    tr.innerHTML = contenido;
    tbody.appendChild(tr)
    
    tr.querySelector(".delete").addEventListener("click", removeItemCarrito);
    tr.querySelector(".input__elemento").addEventListener("change", sumarCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let Total = 0;
    const itemCartTotal = document.querySelector(".itemCartTotal");
    carrito.forEach((item) => {
        let precio = Number(item.precio.replace("$", ""))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage()
}


function removeItemCarrito(e){
    
    const alert = document.querySelector('.remove')

    setTimeout(function () {
        alert.classList.add('remove')
    }, 2000)
    alert.classList.remove('remove')
    
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".itemCarrito")
    const title = tr.querySelector(".title").textContent;
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }        
    }
    tr.remove()
    carritoTotal()
}

function sumarCantidad(e) {
    const sumaInput = e.target
    const tr = sumaInput.closest(".itemCarrito")
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value
            carritoTotal()
        }
    })
    
}


//localStorage

function addLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem("carrito"))
    if(storage){
        carrito = storage;
        renderCarrito()
    }
}

