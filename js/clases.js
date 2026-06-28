class Sistema {
  constructor() {
    this.influencers = [];
    this.articulos = [];
    this.ventas = [];
  }
  agregarInfluencer(unInfluencer) {
    this.influencers.push(unInfluencer);
  }
  agregarArticulo(unArticulo) {
    this.articulos.push(unArticulo);
  }
  agregarVenta(unaVenta) {
    this.ventas.push(unaVenta);
  }
}

class Influencer {
  constructor(nombre, email, comision) {
    this.nombre = nombre;
    this.email = email;
    this.comision = comision;
  }
}

class Articulo {
  constructor(codigoA, descripcion, precio) {
    this.codigoA = codigoA;
    this.descripcion = descripcion;
    this.precio = precio;
  }
}

class Venta {
  constructor(nroVenta, articulo, cantidad, influencer, medio) {
    this.nroVenta = nroVenta;
    this.articulo = articulo;
    this.cantidad = cantidad;
    this.influencer = influencer;
    this.medio = medio;
    this.total = articulo.precio * cantidad;
  }
}
