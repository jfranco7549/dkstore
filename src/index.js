
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
                quienes: false
            },
            zoom: 2,
            init:false,
            servicios: [
                {
                    nombre: "Instalacion",
                },
                {
                    nombre: "Tecnico",
                },
                {
                    nombre: "Garantia",
                },
                {
                    nombre: "Envio Gratis",
                }
            ],
            map: null,
            tileLayer: null,
            layers: [],
            carrito: [],
            menus: [

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

            loading.setAttribute("class", "hides");
        }
       

        let res = await fetch('/producto/list')
        res = await res.json()
        this.articulos = res
    },


    methods: {
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
         
        openModal(a) {

            if (a == 'quienes') {
                this.modal.quienes = true
               if(!this.init){
                this.createMap()
                this.init = true;
               }
            } else {
                this.modal.servicios = true
            }
        },
        colorPromo(a) {
            if (a == 'PROMO') {
                return "#143E8F"
            }
        },
        SendWhs() {
            let total = 'lista:';
            this.carrito.forEach((item) => {
                total = total + " - " + item.sap;
            })

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
        filtro(a) {
            let categoria = [];
            this.articulos.forEach(element => {

                if (element.descripcion.search(this.buscador.toUpperCase()) == -1) {

                    element.view = false;
                } else {
                    categoria.push(element.familia)
                    element.view = true;
                }
                let result = categoria.filter((item, index) => {
                    return categoria.indexOf(item) === index;
                })
                this.menus = result
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
        },
        async getinfo(articulo, tipo) {

            let res = await fetch('/producto/getproducto/' + articulo.sap)

            res = await res.json()
            articulo[tipo] = await res[tipo];
            return articulo[tipo]
        }
    },

})
