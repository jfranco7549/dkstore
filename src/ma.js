

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    
    data() {
        return {
          dialog:false,
          marcas:null,
          marca:[
            
          ],
          Iespecial:false,
        vista:{
          terminoC:true,
          garantia:false,
          pregunta:false
        },
        preguntas:[
          { 
            pregunta:"¿Donde puedo acudir para activar una garantía?",
            repuesta:"En todas nuestras sucursales a nivel nacional, a partir de las 8:00 am hasta el cierre de la tienda, cualquier día del año  o por el WhatsApp 0424-4624218, selecciona la opción (2) Garantía, Envíos y Servicio Técnico"
        },
        { 
          pregunta:"¿Cómo puedo activar la garantía de mi producto instalado?",
          repuesta:"Una vez reportado y validada la información proporcionada por el cliente,  en un tiempo no máximo a 72 horas se le contactara y se enviará  un  técnico aliado a su domicilio para dar respuesta a la activación de la garantía."
      },
      { 
        pregunta:"¿En cuanto tiempo tengo respuesta sobre mi caso, luego que se activo mi garantía?",
        repuesta:" Tiendas Daka tiene un tiempo estimado de cuatro  (4) a cinco (5) días hábiles para dar respuesta a la solicitud de activación de  garantía."
    },
    {
      pregunta:"¿Mi producto de Venta Especial (producto reacondicionado o con detalle) tiene cambio inmediato ?",
      repuesta:"Los productos de Venta Especial poseen Garantía Daka por el tiempo que indica la factura. Estos casos no son aplicables bajo la modalidad de cambio inmediato."
    },
    {
      pregunta:"¿Qué cosas  debo conservar mientras  la garantía de mi producto esta en vigencia ?",
      repuesta:"      Factura de compra Original,Caja del producto (aplica para línea hogar, marrón y digital) y   Accesorios partes y piezas.       "
    }
            
        ],
          TerminoYCondiciones:[
            {
              nombre:"Mercancía de Venta Ordinaria",
              imagen:"img/MD/normal.png",
              status:false
            },
            {
              nombre:"Mercancía de Venta Especial",
              imagen:"img/MD/especial.jpg",
              status:false
            }
           
          ],
          vista1:'card1',
          model: null,
        }

    },
    computed: {
      

    },

    async mounted() {
      let marca = await fetch('/producto/marca')
      marca = await marca.json()
    console.log(marca[45])
    this.marca = marca
     document.getElementById('loading').style.display = "none" 
     
    this.dialog = true;
  },


    methods: {
      Activ(a){
        console.log('corrio ',a)
for (let clave in this.vista){
  this.vista[clave] = false
}
console.log(this.vista)
this.vista[a]= true ;
console.log(this.vista)
      },
      eclick(a,b){
        a()
      if(b.status){
        console.log(b.status)
        
        b.status =  false
        console.log(b.status)
      }else{
        console.log(b.status)
        this.TerminoYCondiciones.forEach((item) => item.status = false );
        b.status =  true
        console.log(b.status)
      }
        
      }
        
    },

})
