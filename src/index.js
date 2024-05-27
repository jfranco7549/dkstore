
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
              ruta:'/producto/list',
              fin:0,
              actual:1,

            },
            zoom: 2,
            MenuCategoria:[
              {
                Nombre:"Linea Digital",
                producto:["LD-00000027"]
              },
              {
                Nombre:"Linea Blanca",
                producto:["LB-00000001"]
              },
              {
                Nombre:"Linea Marron",
                producto:["LM-00000023"]
              },
              {
                Nombre:"Linea Hogar",
                producto:["LH-00000006"]
              }
              
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
            banner:true,
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
        this.ProductoDestacado()
         this.ProductoLinea()
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
       
        this.getproducto()
      
    },


    methods: {
      setvideo(a){
        this.videoP = a
      },
      async getproducto(){

        let res = await fetch('/producto/list')
        res = await res.json()
        this.articulos = res.valor
        let cant = res.n
        if(cant == 0 ){
          cant = 1;
        }
        this.pag.cant = cant
      },
       
     async Getlinea(a){

        let categoria = [];
    
                    let res = await fetch('/producto/list_linea/'+a+'/0/20')
                    this.pag.inicio = 0
                    this.pag.fin = 20
                    this.pag.ruta = '/producto/list_linea/'+a
                    this.pag.actual = 1
                    res = await res.json()
                    this.articulos = res.valor
                    this.banner = false;
      },
        async ProductoDestacado(){
          let consul = await fetch('/producto/destacado')
          consul = await consul.json()
          console.log(consul)
          this.Pdestacado = await  consul
         },

         async ProductoLinea(a){
          let res =[]
          for(let linea in this.MenuCategoria){
             let consul = await fetch('/producto/lineas/'+this.MenuCategoria[linea].Nombre)
          consul = await consul.json()
          res = await consul
          this.MenuCategoria[linea].producto = res
         console.log(res)
  
          }
         
    
         

          
         },
        async openModal(a,b) {

            if (a == 'quienes') {
                this.modal.quienes = true
               if(!this.init){
                //this.createMap()
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
              
                total = total + " %0A " +item.sap+' -'+item.precio+' $ - '+ item.descripcion;
            })
            total += ' %0A %0AEl monto total a cancelar es de '+this.totalCarro+'$.';
          
            let msm = 'https://api.whatsapp.com/send/?phone=584244624218&text=' + total + '&type=phone_number&app_absent=0'
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
             res = await fetch(this.pag.ruta+"/"+this.pag.inicio+'/'+this.pag.fin)
          }
          if(tipo == 'down'){
            console.log(tipo)
            this.pag.inicio = this.pag.inicio-20
            this.pag.fin = this.pag.fin-20
             res = await fetch(this.pag.ruta +"/"+ this.pag.inicio +'/'+this.pag.fin)
          }

          if(tipo == 'click'){
            console.log(tipo,this.pag.actual)
            this.pag.inicio = (this.pag.actual*20)-20
            console.log(this.pag)
            this.pag.fin = this.pag.actual*20
            res = await fetch(this.pag.ruta+"/"+ this.pag.inicio +'/'+this.pag.fin)
          }
         
          res = await res.json()

          this.articulos = res.valor

        },

       async filtro(a) {
        if(a == 'inicio'){
          console.log('inicio')
          this.buscador = ''
          this.banner = true
          this.pag.ruta = '/producto/list'
          this.pag.inicio = 0
          this.pag.fin = 20
          this.getproducto()
          return 0;
        }
            let categoria = [];
console.log(this.buscador.toUpperCase())
            let res = await fetch('/producto/list_des/'+this.buscador.toUpperCase()+'/0/20')
            this.pag.inicio = 0
            this.pag.fin = 20
            this.pag.ruta = '/producto/list_des/'+this.buscador.toUpperCase()
            this.pag.actual = 1
             res = await res.json()
             
            this.articulos = res.valor
            this.pag.cant = res.n
           
        },
       async filtroC(a) {
     

          let res = await fetch('/producto/list/'+a+'/0/20')
          this.pag.inicio = 0
          this.pag.fin = 20
          res = await res.json()
          this.articulos = []
         this.articulos = res.valor
         this.pag.cant =res.n
         this.pag.ruta = '/producto/list/'+a
         this.pag.actual = 1
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
              this.carrito.splice(index, 1);
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
