class Carrito{
     
    // Añade el producto

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){ //verifica si se hace click en el boton comprar, entonces ese valor lo vamos a guardar.
            const producto = e.target.parentElement.parentElement; //
            this.leerDatosProducto(producto); //llamamos el metodo leerDatosProducto donde le paso el producto
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h4').textContent,
            precio : producto.querySelector('.precio span').textContent,
            id : producto.querySelector('a').getAttribute('data-id'), //nos va servir para eliminar y que se elimine solo el seleccionado
            cantidad : 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id; //el producto que seleccione con el que ya tenemos lo vamos almacenar para luego comparar
            }
        });
        /*
        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya esta agregado',
                timer: 1000,
                showConfirmButton: false
            })
        }
        else{
            this.insertarCarrito(infoProducto)
        }*/
   /* ------------------------------------------------
                      OPERADOR TERNARIO
      ------------------------------------------------  */ 
            (productosLS === infoProducto.id) ? Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya esta agregado',
                timer: 1000,
                showConfirmButton: false
            }) : this.insertarCarrito(infoProducto);
    

    }
    insertarCarrito(producto){ //creo el metodo
        //creo la tabla para insertar los productos
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100> 
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

    //creo la tabla para eliminar productos
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement; 
            productoID = producto.querySelector('a').getAttribute('data-id'); //almacenar valor en localstore
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }
    
    //creo la tabla para vaciar productos
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        }
        this.vaciarLocalStorage();
        return false;
    }

    //creo la tabla para guardar productos
    guardarProductosLocalStorage(producto){
        let productos;
        //obtener valores de LS, si no hay crea en vacio y si lo hay va agregar el producto al carrito
        productos = this.obtenerProductosLocalStorage(); 
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //creo la tabla para obtener productos del LS
    /*obtenerProductosLocalStorage(){
        let productoLS;

        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS;
    }*/

    
       /* ------------------------------------------------
                      OPERADOR TERNARIO
      ------------------------------------------------  */ 

    obtenerProductosLocalStorage(){
        let productoLS; 
        
        (localStorage.getItem('productos') === null) ? productoLS = [] : productoLS = JSON.parse(localStorage.getItem('productos'));
        return productoLS;
    }

    //creo la tabla para eliminar productos del LS
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //creo la tabla para leer los datosdel LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100> 
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
            listaProductos.appendChild(row); 
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100> 
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control" cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row); 
        });
    }
    
    vaciarLocalStorage(){
        LocalStorage.clear();
    }

    procesarPedido(e){ 
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El carrito esta vacio, agrega algun producto',
                timer: 2000,
                showConfirmButton: false
            })
        }
        else{
            location.href ='compra.html';
        }
        
    }

    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, igv = 0;
        productoLS = this.obtenerProductosLocalStorage();
        for(let i = 0; i < productoLS.length; i++){
            let element = Number (productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }
        igv = parseFloat(total * 0.18).toFixed(2); //2 decimales
        subtotal = parseFloat(total-igv).toFixed(2);

        document.getElementById('subtotal').innerHTML = "S/. " + subtotal;
        document.getElementById('igv').innerHTML = "S/. " + igv;
        document.getElementById('total').innerHTML = "S/. " + total.toFixed(2);
    }
}