(()=>{"use strict";const t={radians:6370997/(2*Math.PI),degrees:2*Math.PI*6370997/360,ft:.3048,m:1,"us-ft":1200/3937},i=class{constructor(t){this.code_=t.code,this.units_=t.units,this.extent_=void 0!==t.extent?t.extent:null,this.worldExtent_=void 0!==t.worldExtent?t.worldExtent:null,this.axisOrientation_=void 0!==t.axisOrientation?t.axisOrientation:"enu",this.global_=void 0!==t.global&&t.global,this.canWrapX_=!(!this.global_||!this.extent_),this.getPointResolutionFunc_=t.getPointResolution,this.defaultTileGrid_=null,this.metersPerUnit_=t.metersPerUnit}canWrapX(){return this.canWrapX_}getCode(){return this.code_}getExtent(){return this.extent_}getUnits(){return this.units_}getMetersPerUnit(){return this.metersPerUnit_||t[this.units_]}getWorldExtent(){return this.worldExtent_}getAxisOrientation(){return this.axisOrientation_}isGlobal(){return this.global_}setGlobal(t){this.global_=t,this.canWrapX_=!(!t||!this.extent_)}getDefaultTileGrid(){return this.defaultTileGrid_}setDefaultTileGrid(t){this.defaultTileGrid_=t}setExtent(t){this.extent_=t,this.canWrapX_=!(!this.global_||!t)}setWorldExtent(t){this.worldExtent_=t}setGetPointResolution(t){this.getPointResolutionFunc_=t}getPointResolutionFunc(){return this.getPointResolutionFunc_}},e=6378137,a=Math.PI*e,o=[-a,-a,a,a],n=[-180,-85,180,85],s=e*Math.log(Math.tan(Math.PI/2));class r extends i{constructor(t){super({code:t,units:"m",extent:o,global:!0,worldExtent:n,getPointResolution:function(t,i){return t/Math.cosh(i[1]/e)}})}}const c=[new r("EPSG:3857"),new r("EPSG:102100"),new r("EPSG:102113"),new r("EPSG:900913"),new r("http://www.opengis.net/def/crs/EPSG/0/3857"),new r("http://www.opengis.net/gml/srs/epsg.xml#3857")];const l=[-180,-90,180,90],h=6378137*Math.PI/180;class u extends i{constructor(t,i){super({code:t,units:"degrees",extent:l,axisOrientation:i,global:!0,metersPerUnit:h,worldExtent:l})}}const d=[new u("CRS:84"),new u("EPSG:4326","neu"),new u("urn:ogc:def:crs:OGC:1.3:CRS84"),new u("urn:ogc:def:crs:OGC:2:84"),new u("http://www.opengis.net/def/crs/OGC/1.3/CRS84"),new u("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new u("http://www.opengis.net/def/crs/EPSG/0/4326","neu")];let p={},g={};function m(t,i,e){const a=t.getCode(),o=i.getCode();a in g||(g[a]={}),g[a][o]=e}function w(t,i){if(void 0!==i)for(let e=0,a=t.length;e<a;++e)i[e]=t[e];else i=t.slice();return i}function f(t){!function(t,i){p[t]=i}(t.getCode(),t),m(t,t,w)}function A(t){!function(t){t.forEach(f)}(t),t.forEach((function(i){t.forEach((function(t){i!==t&&m(i,t,w)}))}))}var E,S,P;A(c),A(d),E=c,S=function(t,i,o){const n=t.length;o=o>1?o:2,void 0===i&&(i=o>2?t.slice():new Array(n));for(let r=0;r<n;r+=o){i[r]=a*t[r]/180;let o=e*Math.log(Math.tan(Math.PI*(+t[r+1]+90)/360));o>s?o=s:o<-s&&(o=-s),i[r+1]=o}return i},P=function(t,i,o){const n=t.length;o=o>1?o:2,void 0===i&&(i=o>2?t.slice():new Array(n));for(let s=0;s<n;s+=o)i[s]=180*t[s]/a,i[s+1]=360*Math.atan(Math.exp(t[s+1]/e))/Math.PI-90;return i},d.forEach((function(t){E.forEach((function(i){m(t,i,S),m(i,t,P)}))})),new Vue({el:"#app",vuetify:new Vuetify,data:()=>({modal:{servicios:!1,quienes:!1,producto:!1},datosG:{estado:null,municipio:null,parroquia:null},pag:{cant:0,inicio:0,ruta:"/producto/list",fin:0,actual:1},zoom:2,MenuCategoria:[{Nombre:"Linea Digital",producto:["LD-00000027"]},{Nombre:"Linea Blanca",producto:["LB-00000001"]},{Nombre:"Linea Marron",producto:["LM-00000023"]},{Nombre:"Linea Hogar",producto:["LH-00000006"]}],comprar:!0,titulo:"",init:!1,servicios:[{nombre:"Instalacion",url:"video/intalacion.mp4",ico:"mdi-tools"},{nombre:" Servicio Tecnico",url:"video/gg.mp4",ico:"mdi-cube-send"},{nombre:"Garantia",url:"video/garantia.mp4",ico:"mdi-ballot-recount"},{nombre:"Envio Gratis",url:"video/envio.mp4",ico:"mdi-van-utility"}],catselect:"",Pdestacado:[{sap:"LB-00000478"},{sap:"LB-00001048"},{sap:"LB-00000632"},{sap:"LB-00000972"}],categoria:["MICROONDAS","CAMPANAS","HORNOS","SECADORAS PAREJAS","REFRIGERADORES PAREJA","CONGELADORES VERTICALES","LAVAVAJILLAS","AIRES COMERCIALES","LAVADORAS AUTOMATICAS","HORNOS DOBLES","TOPES ELECTRICOS","TOPES A GAS","COCINAS A GAS","REFRIGERADORES","LAVADORAS/SECADORAS","AIRES SPLITS 12 MIL","DISPENSADORES DE AGUA","CONGELADORES DOMESTICOS","AIRES PORTATILES","AIRES VENTANA 12 MIL","AIRES VENTANA 05 MIL","SECADORAS","COCINAS ELECTRICAS","LAVADORAS SEMIAUTOMATICAS","FABRICADORES DE HIELO COMPACTOS","NEVERAS EJECUTIVAS","MANTAS","CORNETAS","TV 55 PULG","TV 65 PULG","TV 58 PULG","TV 50 PULG","TV 70 PULG","TV 75 PULG","TV 43 PULG","ACCESORIOS P/TV","TV 86 PULG","TV 85 PULG","TV 32 PULG","TV 98 PULG","TV 77 PULG"],videoP:"video/servicio1.mp4",map:null,cliente:{nombre:"",cedula:"",estado:"",municipio:"",parroquia:"",direccion:""},metodoSelect:"",banner:!0,modelProd:null,metodos:["Delivery","Retiro En tienda"],tiendas:[],tileLayer:null,layers:[],carrito:[],menus:[],icons:[{url:"https://www.instagram.com/tiendasdaka/",ico:"mdi-instagram"},{url:"https://www.facebook.com/TiendasDakaOficial",ico:"mdi-facebook"},{url:"https://x.com/tiendasdaka?mx=2",ico:"mdi-twitter"},{url:"https://www.tiktok.com/@tiendasdaka",ico:"mdi-music-note"}],items:[{src:"img/banner/1.png"},{src:"img/banner/4.png"},{src:"img/banner/5.png"}],articulos:[],categoriaico:{},buscador:"",drawer:!1}),computed:{totalCarro:function(){let t=0;return this.carrito.forEach((i=>{t+=i.precio})),t}},async mounted(){this.ProductoDestacado(),this.ProductoLinea(),this.getTiendas(),this.getstado(),document.body.onload=function(){let t=document.getElementById("loads");setTimeout((function(){t.setAttribute("class","hides")}),"2000")},this.getproducto()},methods:{async getstado(){let t=await fetch("/direccion/getestado");t=await t.json(),this.datosG.estado=t},async getTiendas(){let t=await fetch("/direccion/gettienda");t=await t.json();for(let i of t)this.tiendas.push(i.nombre)},async getmunicipio(t){let i=await fetch("/direccion/getmunicipio/"+this.cliente.estado.cod_entidad);i=await i.json(),this.datosG.municipio=i},async getparroquia(t){let i=await fetch("/direccion/getparroquia/"+this.cliente.municipio.cod_mun+"/"+this.cliente.estado.cod_entidad);i=await i.json(),this.datosG.parroquia=i},setvideo(t){this.videoP=t},async getpromo(){let t=await fetch("/producto/promo/0/20");t=await t.json(),this.pag.ruta="/producto/promo/0/20",this.articulos=t.valor;let i=t.n;0==i&&(i=1),this.pag.cant=i},async getproducto(){let t=await fetch("/producto/list");t=await t.json(),this.articulos=t.valor;let i=t.n;0==i&&(i=1),this.pag.cant=i},async Getlinea(t){let i=await fetch("/producto/list_linea/"+t+"/0/20");this.pag.inicio=0,this.pag.fin=20,this.pag.ruta="/producto/list_linea/"+t,this.pag.actual=1,i=await i.json(),this.articulos=i.valor,this.pag.cant=i.cand,this.banner=!1,this.titulo=t},async ProductoDestacado(){let t=await fetch("/producto/destacado");t=await t.json(),this.Pdestacado=await t},async ProductoLinea(t){let i=[];for(let t in this.MenuCategoria){let e=await fetch("/producto/lineas/"+this.MenuCategoria[t].Nombre);e=await e.json(),i=await e,this.MenuCategoria[t].producto=i}},async openModal(t,i){if("quienes"==t&&(this.modal.quienes=!0,this.init||(this.init=!0)),"servicios"==t&&(this.modal.servicios=!0),"producto"==t){if("string"==typeof i){let t=await fetch("/producto/getproducto/"+i);t=await t.json(),i=t}this.modelProd=i;let t=await fetch("/producto/caracterisctica/"+i.sap);t=await t.json(),this.modelProd.caracteristica=t.valor,this.categoriaico=t.ico,this.modal.producto=!0}},colorPromo(t){if("PROMO"==t)return"#143E8F"},SendWhs(){let t="Hola "+this.cliente.nombre+"%0A%0A Bienvenido(a) a tiendas daka %0A";"Delivery"==this.metodoSelect?(t+="Direccion del Envio : %0A",t+="Estado:"+this.cliente.estado.nombre+" ,  Municipio:"+this.cliente.municipio.nombre+" , Parroquia:"+this.cliente.parroquia.nombre+"%0A",t+="Direccion:"+this.cliente.direccion+"%0A"):t+="Tienda a Retirar:"+this.cliente.direccion+"%0A",t+="Cedula:"+this.cliente.cedula+"%0A%0A",t+="PRODUCTO %0A",this.carrito.forEach((i=>{t=t+" %0A "+i.sap+" -"+i.precio+" $ - "+i.descripcion})),t+=" %0A %0AEl monto total a cancelar es de "+this.totalCarro+"$.";let i="https://api.whatsapp.com/send/?phone=584244624218&text="+t+"&type=phone_number&app_absent=0";location.href=i},menuSelect(t){this.articulos.forEach((i=>{i.familia==t?i.view=!0:i.view=!1}))},async nextp(t){let i;"up"==t&&(this.pag.inicio=this.pag.inicio+20,this.pag.fin=this.pag.fin+20,i=await fetch(this.pag.ruta+"/"+this.pag.inicio+"/"+this.pag.fin)),"down"==t&&(this.pag.inicio=this.pag.inicio-20,this.pag.fin=this.pag.fin-20,i=await fetch(this.pag.ruta+"/"+this.pag.inicio+"/"+this.pag.fin)),"click"==t&&(this.pag.inicio=20*this.pag.actual-20,this.pag.fin=20*this.pag.actual,i=await fetch(this.pag.ruta+"/"+this.pag.inicio+"/"+this.pag.fin)),i=await i.json(),this.articulos=i.valor},async filtro(t){if("inicio"==t)return this.buscador="",this.banner=!0,this.pag.ruta="/producto/list",this.pag.inicio=0,this.pag.fin=20,this.pag.actual=1,this.getproducto(),0;let i=await fetch("/producto/list_des/"+this.buscador.toUpperCase()+"/0/20");this.pag.inicio=0,this.pag.fin=20,this.pag.ruta="/producto/list_des/"+this.buscador.toUpperCase(),this.pag.actual=1,i=await i.json(),this.banner=!1,this.articulos=i.valor,this.pag.cant=i.n,this.titulo=this.buscador},async filtroC(t){this.banner=!1;let i=await fetch("/producto/list/"+t+"/0/20");this.pag.inicio=0,this.pag.fin=20,i=await i.json(),this.articulos=[],this.articulos=i.valor,this.pag.cant=i.n,this.pag.ruta="/producto/list/"+t,this.pag.actual=1;let e=[];this.articulos.forEach((i=>{i.categoria==t?(i.view=!0,e.push(i)):i.view=!1,this.menus=e})),this.titulo=t},RemoveCarrito(t){t.carrito=!1;var i=this.carrito.findIndex((i=>i==t));0!=i?this.carrito.splice(i,i):this.carrito.splice(i,1)},addCarrito(t){t.carrito=!0,this.carrito.push(t),this.modal.producto&&(this.modal.producto=!1)},async getinfo(t,i){let e=await fetch("/producto/getproducto/"+t.sap);return e=await e.json(),t[i]=await e[i],t[i]}}})})();