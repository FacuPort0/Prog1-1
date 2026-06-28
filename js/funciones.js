window.addEventListener("load", inicio);

let sistema = new Sistema();

function inicio() {
  document
    .getElementById("btnDialogoInfluencers")
    .addEventListener("click", abrirInfluencers);
  document
    .getElementById("btnCerrarInfluencers")
    .addEventListener("click", cerrrarInfluencer);
  document
    .getElementById("btnAgregarInfluencer")
    .addEventListener("click", agregarInfluencer);
  document
    .getElementById("btnDialogoArticulos")
    .addEventListener("click", abrirArticulos);
  document
    .getElementById("btnCerrarArticulos")
    .addEventListener("click", cerrarArticulos);
  document
    .getElementById("btnAgregarArticulo")
    .addEventListener("click", agregarArticulo);
  document
    .getElementById("btnDialogoVentas")
    .addEventListener("click", abrirVentas);
  document
    .getElementById("btnCerrarVentas")
    .addEventListener("click", cerrarVentas);
  document
    .getElementById("btnAgregarVenta")
    .addEventListener("click", agregarVenta);
  cargarDatosFictizios();
  cargar();
}

function cargarDatosFictizios() {
  let datoF1 = new Influencer("Joaquin Cordero", "joaco@gmail.Com", 21);
  let datoF2 = new Influencer("Facundo Portillo", "facu@gmail.com", 20);
  sistema.agregarInfluencer(datoF1);
  sistema.agregarInfluencer(datoF2);

  let datoF3 = new Articulo("A001", "play 5", 10);
  let datoF4 = new Articulo("A002", "caramelo", 999999);
  sistema.agregarArticulo(datoF3);
  sistema.agregarArticulo(datoF4);

  let datoF5 = new Venta(1, datoF3, 3, datoF1, "1 - Instagram");
  let datoF6 = new Venta(2, datoF4, 5, datoF2, "2 - YouTube");
  sistema.agregarVenta(datoF5);
  sistema.agregarVenta(datoF6);
}

function cargar() {
  cargarSelects(
    "NroArticuloVenta",
    sistema.articulos.map((articulo) => articulo.codigoA),
  );
  cargarSelects(
    "influencerVenta",
    sistema.influencers.map((influencer) => influencer.nombre),
  );
  let comisionMax = 0;
  for (let inf of sistema.influencers) {
    if (inf.comision > comisionMax) {
      comisionMax = inf.comision;
    }
  }
  let mayorVenta = 0;
  for (let v of sistema.ventas) {
    if (v.total > mayorVenta) {
      mayorVenta = v.total;
    }
  }
  cargarTablas(
    "tbodyTablaInfluencers",
    sistema.influencers.map((influencer) => {
      let ventasInfluencer = sistema.ventas.filter(
        (ventas) => ventas.influencer.nombre === influencer.nombre,
      );
      let totalVendido = 0;
      let ventaMax = 0;
      let etiquetaI = "";
      let btnDetalles = `<button type="button" onclick="mostrarDetallesVentas('${influencer.nombre}')">Detalles</button>`;
      for (let venta of ventasInfluencer) {
        totalVendido += venta.total;
        if (venta.total > ventaMax) {
          ventaMax = venta.total;
        }
      }
      if (totalVendido === 0) {
        etiquetaI += "🧊";
      }
      if (influencer.comision === comisionMax && comisionMax > 0) {
        etiquetaI += "🔥";
      }
      if (ventaMax === mayorVenta && mayorVenta > 0) {
        etiquetaI += "🟢";
      }
      return [
        influencer.nombre,
        influencer.email,
        `${influencer.comision}%`,
        `$ ${totalVendido}`,
        etiquetaI,
        btnDetalles,
      ];
    }),
  );
  cargarTablas(
    "tbodyTablaArticulos",
    sistema.articulos.map((articulo) => [
      articulo.codigoA,
      articulo.descripcion,
      `$ ${articulo.precio}`,
    ]),
  );
  cargarTablas(
    "tbodyTablaArticulos",
    sistema.articulos.map((articulo) => [
      articulo.codigoA,
      articulo.descripcion,
      `$ ${articulo.precio}`,
    ]),
  );

  cargarTablas(
    "tbodyTablaVentas",
    sistema.ventas.map((venta) => {
      let btnAccion = `<button type="button" onclick="borrarVenta(${venta.nroVenta})">❌</button>`;
      return [
        venta.nroVenta,
        venta.articulo.codigoA,
        venta.influencer.nombre,
        venta.cantidad,
        venta.medio,
        btnAccion,
      ];
    }),
  );
  generarGraficoBurbujas();
}

function mostrarDetallesVentas(nombreInfluencer) {
  let ventasFiltradas = sistema.ventas.filter(
    (v) => v.influencer.nombre === nombreInfluencer,
  );

  cargarTablas(
    "tbodyTablaDetallesInfluencer",
    ventasFiltradas.map((venta) => [
      venta.nroVenta,
      venta.articulo.descripcion,
      venta.cantidad,
      venta.medio,
      `$ ${venta.total}`,
    ]),
  );

  document.getElementById("dialogoDetallesInfluencer").showModal();
}

function borrarVenta(nroVenta) {
  sistema.ventas = sistema.ventas.filter(
    (venta) => venta.nroVenta !== nroVenta,
  );
  cargar();
}

function cargarSelects(elemento, datos) {
  let select = document.getElementById(elemento);
  select.innerHTML = "";
  for (elem of datos) {
    let nodo = document.createElement("option");
    let nodoTexto = document.createTextNode(elem);
    nodo.appendChild(nodoTexto);
    select.appendChild(nodo);
  }
}

function cargarTablas(elemento, datosT) {
  let tabla = document.getElementById(elemento);
  tabla.innerHTML = "";
  for (filaDatos of datosT) {
    let fila = document.createElement("tr");
    for (let celdaDatos of filaDatos) {
      let nodo = document.createElement("td");
      //ayuda del profe
      nodo.innerHTML = celdaDatos;
      fila.appendChild(nodo);
    }
    tabla.appendChild(fila);
  }
}

function abrirInfluencers() {
  let dialogo = document.getElementById("dialogoInfluencers");
  dialogo.showModal();
}

function cerrrarInfluencer() {
  let dialogo = document.getElementById("dialogoInfluencers");
  dialogo.close();
}

function agregarInfluencer(evt) {
  // Evita que la página se recargue al enviar el formulario
  evt.preventDefault();
  if (document.getElementById("formInfluencers").reportValidity()) {
    let nombreI = document.getElementById("datoNombre").value;
    let emailI = document.getElementById("datoMail").value;
    let comisionI = parseInt(document.getElementById("datoComision").value);

    let nuevoInfluencer = new Influencer(nombreI, emailI, comisionI);
    sistema.agregarInfluencer(nuevoInfluencer);
    cargar();
  }
  document.getElementById("formInfluencers").reset();
  cerrrarInfluencer();
}

function abrirArticulos() {
  let dialogo = document.getElementById("dialogoArticulos");
  dialogo.showModal();
}

function cerrarArticulos() {
  let dialogo = document.getElementById("dialogoArticulos");
  dialogo.close();
}

function agregarArticulo(evt) {
  evt.preventDefault();
  if (document.getElementById("formArticulos").reportValidity()) {
    let codigoA = document.getElementById("codigoArticulo").value;
    let descripcionA = document.getElementById("descripcionArticulo").value;
    let precioA = parseInt(document.getElementById("precioArticulo").value);
    let nuevoArticulo = new Articulo(codigoA, descripcionA, precioA);
    sistema.agregarArticulo(nuevoArticulo);
    cargar();
  }
  document.getElementById("formArticulos").reset();
  cerrarArticulos();
}

function abrirVentas() {
  cargar();
  let dialogo = document.getElementById("dialogoVentas");
  dialogo.showModal();
}

function cerrarVentas() {
  let dialogo = document.getElementById("dialogoVentas");
  dialogo.close();
}

function agregarVenta(evt) {
  evt.preventDefault();
  if (document.getElementById("formVentas").reportValidity()) {
    let nroVenta = sistema.ventas.length + 1;
    let nroArticuloV = document.getElementById("NroArticuloVenta").value;
    let cantidadV = parseInt(document.getElementById("cantidadVenta").value);
    let influencerV = document.getElementById("influencerVenta").value;
    let medioV = document.getElementById("medioVenta").value;

    //ayuda de pagina para el find, https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    let datosArticuloV = sistema.articulos.find(
      (art) => art.codigoA === nroArticuloV,
    );
    let datosInfluencerV = sistema.influencers.find(
      (inf) => inf.nombre === influencerV,
    );

    let nuevaVenta = new Venta(
      nroVenta,
      datosArticuloV,
      cantidadV,
      datosInfluencerV,
      medioV,
    );
    sistema.agregarVenta(nuevaVenta);
    cargar();
    generarGraficoBurbujas();
  }
  document.getElementById("formVentas").reset();
  cerrarVentas();
}

function generarGraficoBurbujas() {
  let totalInstagram = 0;
  let totalYouTube = 0;
  let totalTikTok = 0;
  let totalFacebook = 0;
  let totalX = 0;
  let totalOtras = 0;

  for (let venta of sistema.ventas) {
    if (venta.medio === "1 - Instagram" || venta.medio === "1-Instagram") {
      totalInstagram += venta.cantidad;
    } else if (venta.medio === "2 - YouTube" || venta.medio === "2-YouTube") {
      totalYouTube += venta.cantidad;
    } else if (venta.medio === "3 - TikTok" || venta.medio === "3-TikTok" || venta.medio === "3-Tiktok") { 
      totalTikTok += venta.cantidad;
    } else if (venta.medio === "4 - Facebook" || venta.medio === "4-Facebook") {
      totalFacebook += venta.cantidad;
    } else if (venta.medio === "5 - X" || venta.medio === "5-X") {
      totalX += venta.cantidad;
    } else if (venta.medio === "6 - Otras" || venta.medio === "6-Otras") {
      totalOtras += venta.cantidad;
    }
  }

  let sumaTotalGeneral = totalInstagram + totalYouTube + totalTikTok + totalFacebook + totalX + totalOtras;

  actualizarUnaBurbuja("graficoInstagram", totalInstagram, sumaTotalGeneral);
  actualizarUnaBurbuja("graficoYouTube", totalYouTube, sumaTotalGeneral);
  actualizarUnaBurbuja("graficoTikTok", totalTikTok, sumaTotalGeneral);
  actualizarUnaBurbuja("graficoFacebook", totalFacebook, sumaTotalGeneral);
  actualizarUnaBurbuja("graficoX", totalX, sumaTotalGeneral);
  actualizarUnaBurbuja("graficoOtras", totalOtras, sumaTotalGeneral);
}

function actualizarUnaBurbuja(idElemento, cantidadTotal, sumaTotalGeneral) {
  let elementoBurbuja = document.getElementById(idElemento);

  if (elementoBurbuja) {
    if (cantidadTotal > 0) {
      let tamañoMaximoPx = 150; 
      let nuevoDiametro = (cantidadTotal / sumaTotalGeneral) * tamañoMaximoPx;

      if (nuevoDiametro < 30) {
        nuevoDiametro = 30;
      }

      elementoBurbuja.style.setProperty('--circle-diameter', nuevoDiametro + 'px');
      elementoBurbuja.innerHTML = cantidadTotal;
      elementoBurbuja.style.display = "flex"; 
    } else {
      elementoBurbuja.innerHTML = "";
      elementoBurbuja.style.display = "none"; 
    }
  }
}