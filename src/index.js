
//import ubicanos from './component/ubicanos.vue'
import {Feature, Map, Overlay, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';
import {Circle, Fill, Style} from 'ol/style.js';

//import App from './App.vue'
import StadiaMaps from 'ol/source/StadiaMaps.js';
new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    
    data() {
        return {
            modal: {
                servicios: false,
                quienes: false,
                producto:false
            },
            pag:{
              cant:0,
              inicio:0,
              ruta:'/producto/list/',
              fin:0,
              actual:1,

            },
            zoom: 2,
            MenuCategoria:[
              {
                Nombre:"Linea Digital",
                producto:[

                  "LD-00000632","LD-00000633","LD-00000634","LD-00000635"

                ]
              },
              {
                Nombre:"Linea Marron",
                producto:[

                  "LM-00000092","LM-00000086","LM-00000084","LM-00000035"

                ]
              },
              {
                Nombre:"Linea Hogar",
                producto:[

                  "LH-00000018","LH-00000028","LH-00000058","LH-00000098"

                ]
              },
              {
                Nombre:"Linea Blanca",
                producto:[

                  "LB-00000632","LB-00000633","LB-00000634","LB-00000635"

                ]
              },
            ],
            comprar:true,
            init:false,
            servicios: [
                {
                    nombre: "Instalacion",
                    url:"video/intalacion.mp4",
                    ico:"mdi-tools"
                },
                {
                    nombre: " Servicio Tecnico",
                    url:"video/gg.mp4",
                    ico:"mdi-cube-send"
                },
                {
                    nombre: "Garantia",
                    url:"video/garantia.mp4",
                    ico:"mdi-ballot-recount"
                },
                {
                    nombre: "Envio Gratis",
                    url:"video/envio.mp4",
                    ico:"mdi-van-utility"
                }
            ],
            catselect:'',
            Pdestacado:[
              {sap:'LB-00000478'},
              {sap:'LB-00001048'},
              {sap:"LB-00000632"},
              {sap:'LB-00000972'}
            ],
            categoria:[
              "MICROONDAS",
"CAMPANAS",
"HORNOS",
"SECADORAS PAREJAS",
"REFRIGERADORES PAREJA",
"CONGELADORES VERTICALES",
"LAVAVAJILLAS",
"AIRES COMERCIALES",
"LAVADORAS AUTOMATICAS",
"HORNOS DOBLES",
"TOPES ELECTRICOS",
"TOPES A GAS",
"COCINAS A GAS",
"REFRIGERADORES",
"LAVADORAS/SECADORAS",
"AIRES SPLITS 12 MIL",
"DISPENSADORES DE AGUA",
"CONGELADORES DOMESTICOS",
"AIRES PORTATILES",
"AIRES VENTANA 12 MIL",
"AIRES VENTANA 05 MIL",
"SECADORAS",
"COCINAS ELECTRICAS",
"LAVADORAS SEMIAUTOMATICAS",
"FABRICADORES DE HIELO COMPACTOS",
"NEVERAS EJECUTIVAS",
"MANTAS",
"CORNETAS",
"TV 55 PULG",
"TV 65 PULG",
"TV 58 PULG",
"TV 50 PULG",
"TV 70 PULG",
"TV 75 PULG",
"TV 43 PULG",
"ACCESORIOS P/TV",
"TV 86 PULG",
"TV 85 PULG",
"TV 32 PULG",
"TV 98 PULG",
"TV 77 PULG"
            ],
            videoP:"video/servicio1.mp4",
            map: null,
            cliente:{
              nombre:'',
              cedula:'',
              direccion:''
            },
            metodoSelect:'',
            modelProd:null,
            metodos: ["Delivery","Retiro En tienda"],
            tiendas: ['Agencia Valencia',"Agencia Valencia Centro", "agencia San Diego","agencia puerto la cruz", "agencia porlamar","agencia Maracay","agencia MAracay Centro","agencia yaracuy"],
            tileLayer: null,
            layers: [],
            carrito: [],
            menus: [

            ],
            icons: [
              'mdi-facebook',
              'mdi-twitter',
              'mdi-whatsapp',
              'mdi-instagram',
            ],
            items: [
                {
                    src: 'img/banner/1.png',
                },

                {
                    src: 'img/banner/4.png',
                },
                {
                    src: 'img/banner/5.png',
                },

            ],
            articulos: [],
            categoriaico:{},
            buscador: '',
            drawer: false,
        }

    },
    computed: {
        totalCarro: function () {
            let total = 0;
            this.carrito.forEach((item) => {
                total = total + item.precio;
            })
            return total
        }

    },

    async mounted() {
        let that = this;
        /*
     
        
        window.addEventListener('load', function() {
           
            that.initLayers();
        });*/

        document.body.onload = function () {
            let loading = document.getElementById('loads')
            setTimeout(function(){
  loading.setAttribute("class", "hides");
},"2000")
            
        }
       
        
      
        let res = await fetch('/producto/list')
        res = await res.json()
        this.articulos = res.list
        let cant = res.cant
        if(cant == 0 ){
          cant = 1;
        }
        this.pag.cant = cant
    },


    methods: {
      setvideo(a){
        this.videoP = a
      },
        getcoordenate(){
               
           let coord =[0,0]
                if (!"geolocation" in navigator) {
                    return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
                }
            
                const onUbicacionConcedida = ubicacion => {
                 coord =  ubicacion.coords
                   
                }
              
                const onErrorDeUbicacion = err => {
                    console.log("Error obteniendo ubicación: ", err);
                }
            
                const opcionesDeSolicitud = {
                    enableHighAccuracy: true, // Alta precisión
                    maximumAge: 0, // No queremos caché
                    timeout: 5000 // Esperar solo 5 segundos
                };
                // Solicitar
                   navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
            
            return coord
        },

       async createMap(){
        
        let coord =[ 0,0]
        if (!"geolocation" in navigator) {
            return alert("Tu navegador no soporta el acceso a la ubicación. Intenta con otro");
        }
    
        const onUbicacionConcedida = ubicacion => {
            
            console.log('sucess')
            useGeographic()
         coord =  ubicacion.coords
         console.log(coord)
         const point = new Point([-68.00,10.18] );//[-68.00216736,10.18169075]);
         const map = new Map({
           view: new View({
             center: [coord.longitude,coord.latitude] ,
             zoom: 12,
           }),
           layers: [
             new TileLayer({
               source: new OSM(),
             }),
             new VectorLayer({
                source: new VectorSource({
                  features: [new Feature(point)],
                }),
                style: {
                  'circle-radius': 9,
                  'circle-fill-color': 'yellow',
                },
              }),
              new VectorLayer({
                source: new VectorSource({
                  features: [new Feature([-67.96484355,10.21192094])],
                }),
                style: {
                  'circle-radius': 9,
                  'circle-fill-color': 'yellow',
                },
              })
           ],
           target: 'map',
         });
         const element = document.getElementById('popup');

const popup = new Overlay({
  element: element,
  stopEvent: false,
});
map.addOverlay(popup);
const layer = new TileLayer({
    source: new StadiaMaps({
      layer: 'stamen_toner',
    }),
  });
const image = new Circle({
    radius: 8,
    fill: new Fill({color: 'rgb(255, 153, 0)'}),
  });
  
  const style = new Style({
    image: image,
  });
  let geometries = [];
  geometries.push(new Point([-67.96484355,10.21192094]));
  map.render();
  layer.on('postrender', function (event) {
    const vectorContext = getVectorContext(event);
  
    for (let i = 0; i < n; ++i) {
      const importance = upAndDown(Math.pow((n - i) / n, 0.15));
      if (importance < 0.1) {
        continue;
      }
      image.setOpacity(importance);
      image.setScale(importance);
      vectorContext.setStyle(style);
      vectorContext.drawGeometry(geometries[i]);
    }
  
    
    geometries.shift();
    map.render();
  });
map.on('moveend', function () {
  const view = map.getView();
  const center = view.getCenter();
  
});

let popover;
map.on('click', function (event) {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
  const feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (!feature) {
    return;
  }
  const coordinate = feature.getGeometry().getCoordinates();
  popup.setPosition([
    coordinate[0] + Math.round(event.coordinate[0] / 360) * 360,
    coordinate[1],
  ]);

  
});

map.on('pointermove', function (event) {
  const type = map.hasFeatureAtPixel(event.pixel) ? 'pointer' : 'inherit';
  map.getViewport().style.cursor = type;
});
           
        }
      
        const onErrorDeUbicacion = err => {
     console.log('error',err)
            useGeographic()
            
            const map = new Map({
              view: new View({
                center: [-68.00,10.24] ,
                zoom: 1,
              }),
              layers: [
                new TileLayer({
                  source: new OSM(),
                }),
              ],
              target: 'map',
            });
        }
    
        const opcionesDeSolicitud = {
            enableHighAccuracy: true, // Alta precisión
            maximumAge: 0, // No queremos caché
            timeout: 5000 // Esperar solo 5 segundos
        };
        // Solicitar
           navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud);
    
          },
         
        async openModal(a,b) {

            if (a == 'quienes') {
                this.modal.quienes = true
               if(!this.init){
                this.createMap()
                this.init = true;
               }
            } 
            if (a == 'servicios') {
                this.modal.servicios = true
            }
            if (a == 'producto') {

              if(typeof b == "string"){
                let p = await fetch('/producto/getproducto/' + b)
    
                p = await p.json()
                console.log(p)
                b = p
              }
             
              this.modelProd = b
              let res = await fetch('/producto/caracterisctica/'+b.sap)
              res = await res.json()
              console.log(res)
              this.modelProd['caracteristica'] = res.valor
              this.categoriaico = res.ico
              this.modal.producto = true
              console.log(this.categoriaico)
          }
        },
        colorPromo(a) {
            if (a == 'PROMO') {
                return "#143E8F"
            }
        },
       
        SendWhs() {
     
            let total = 'Hola '+this.cliente.nombre+"%0A%0A Bienvenido(a) a tiendas daka %0A";
            total += 'Direccion:'+this.cliente.direccion+'%0A';
            total += 'cedula:'+this.cliente.cedula+'%0A%0A';
            total += 'PRODUCTO %0A';
            this.carrito.forEach((item) => {
                total = total + " %0A " +item.sap+' - '+ item.descripcion;
            })
            total += ' %0A %0AEl monto total a cancelar es de '+this.totalCarro+'$.';
          
            let msm = 'https://api.whatsapp.com/send/?phone=584160289275&text=' + total + '&type=phone_number&app_absent=0'
            location.href = msm
        },
        menuSelect(a) {
            this.articulos.forEach(element => {
                if (element.familia == a) {
                    element.view = true;
                } else {
                    element.view = false;
                }
            })
        },
        async nextp(tipo){
          let res 
          if(tipo == 'up'){
            console.log(tipo)
            this.pag.inicio = this.pag.inicio+20
            this.pag.fin = this.pag.fin+20
             res = await fetch(this.pag.ruta+this.pag.inicio+'/'+this.pag.fin)
          }
          if(tipo == 'down'){
            console.log(tipo)
            this.pag.inicio = this.pag.inicio-20
            this.pag.fin = this.pag.fin-20
             res = await fetch(this.pag.ruta+ this.pag.inicio +'/'+this.pag.fin)
          }

          if(tipo == 'click'){
            console.log(tipo)
            this.pag.inicio = (this.pag.actual*20)-20
            this.pag.fin = this.pag.actual*20
            res = await fetch(this.pag.ruta+ this.pag.inicio +'/'+this.pag.fin)
          }
         
          res = await res.json()

          this.articulos = res

        },

       async filtro(a) {
            let categoria = [];
console.log(this.buscador.toUpperCase())
            let res = await fetch('/producto/list_des/'+this.buscador.toUpperCase()+'/0/20')
            this.pag.inicio = 0
            this.pag.fin = 20
            this.pag.ruta = '/producto/list_des/'+this.buscador.toUpperCase()
            this.pag.actual = 1
             res = await res.json()
             console.log(res)
            this.articulos = res
           
           
        },
       async filtroC(a) {

          let res = await fetch('/producto/list/'+a)
           
          res = await res.json()
         
         this.articulos = res

          let categoria = [];
          this.articulos.forEach(element => {
          
            if(element.categoria == a){
               console.log(element)
               console.log(categoria)
              element.view = true; 
              categoria.push(element)
            }else {
              element.view = false;
          }
        
        this.menus = categoria
    
          });

      },
        RemoveCarrito(articulo) {
            articulo['carrito'] = false;
            var index = this.carrito.findIndex(e => e == articulo);
            if (index == 0) {
                this.carrito = [];
                return;
            }
            this.carrito.splice(index, index);
            console.log(index)
        },
        addCarrito(articulo) {
            articulo['carrito'] = true;
            this.carrito.push(articulo)
            if(this.modal.producto){
              this.modal.producto =false
            }
        },
        async getinfo(articulo, tipo) {

            let res = await fetch('/producto/getproducto/' + articulo.sap)

            res = await res.json()
            articulo[tipo] = await res[tipo];
            return articulo[tipo]
        }
    },

})
