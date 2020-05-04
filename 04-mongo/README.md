## MongoDB

MongoDB es una base de datos `open-source` no relacional de alta performance, y que puede escalar fácilmente.

Mongo es una base de datos basadas en documentos, cada documento es una estructura de datos que contiene varios pares key-values. Son muy similares a un objeto de javascript literal, o JSON:

```javascript
{
  nombre: 'Juan',
  edad:   25,
  estado: 'Inscripto',
  hobbies: ['futbol', 'videojuegos']
}
```

Las ventajas de usar una base de datos que tenga documentos como esta son:

* Los documentos tienen una notación que puede ser usada de forma nativa en lenguajes como Javascript, por lo tanto nos va a resultar fácil manejar los datos desde la aplicación.
* Cada documento contiene datos y estructura, es decir que podriamos guardar relaciones dentro de ellos de manera sencilla.
* Es la base de datos más usada para trabajar con Node, por lo tanto hay muchas librerías e información disponible.

> :pineapple: Para instalar MongoDb sigan las instrucciones para su sistema operativo [acá](https://docs.mongodb.com/manual/installation/).

Una vez instalado Mongo, vamos a levantar el servicio corriendo el comando `mongod`.
Ahora en otra consola, o sea sin cerrar el servicio que acabamos de levantar, vamos a entrar al `REPL` de mongo a través del comando `mongo`. Esta interfaz la vamos a usar para ver que está pasando con nuestros datos, mayormente pare debugear o guiarnos un poco, muy parecido a la consola de desarrolladores del browser.

Antes de empezar, definamos algunos conceptos básicos en mongo:

* _Documents_: Un documento es el registro mínimo que utiliza mongo, es la unidad básica de almacenamiento, ya hemos visto arriba la forma de un documento en Mongo.
* _Collection_: Es una colección de documentos, nos sirven para agrupar documentos que sean de la misma naturaleza, por ejemplo, podemos tener una colleción _Usuarios_ y cada documento tiene información de un _Usuario_.
* _Data Base_: Las colecciones están agrupadas dentro de una base de datos. Es la jerarquía más alta en mongo. Por ejemplo, podríamos tener distintas databases para cada aplicación que mantengamos en el mismo servidor Mongo.

### Comando básicos

Veamos algunos comandos básicos del Shell de mongo que nos van a ayudar. En la siguiente tabla vemos algunos métodos y comando y qué hacen:

|Métodos y comandos |Descripción |
|-------------------|------------|
|help |Muestra la ayuda.|
|db.help()|Muestra la ayuda de los métodos de la base de datos.|
|db.<collection>.help() | Muestra la ayuda de los métodos de las colleciones, <collection> puede ser existente o no.|
|show dbs | Imprime una lista de todas las dbs en el servidor.|
|use <db> | Selecciona a  <db> como la base de datos seleccionada. Si no existe, la crea.|
|show collections | Imprime la lista de colecciones de la base de datos seleccionada.|
|show users| Imprimi una lista de usuarios de la base de datos seleccionada.|
|show roles |Imprime una lista de roles de la base de datos selecionada.|
|show profile|  Imprime las 5 operaciones más reciente que tardaron 1 milisegundo o más.|
|show databases | Imprime una lista de todas las bases de datos disponibles.|
|load() |Executa un archivo javascript.|

### CRUD ( Create, Read, Update, Delete)

Veamos como podemos hacer estas operaciones en mongo. Empezemos creando una nueva db llamada `test` con `use test`.
Dentro de ella vamos a insertar un alumno dentro de la colección `alumnos`.

```
db.alumnos.insert({nombre: 'Guille', curso: 'bootcamp'})
```

> La colección se crea automáticamente cuando ingresamos el primer registro (documento).

Si recibimos `WriteResult({ "nInserted" : 1 })` como output, entonces la operación fue existosa.
Bien, ahora veamos si realmente se escribió ese documento y está guardado, para hacerlo vamos a usar el método `find()`, si usamos esa función sin pasarle parámetros, entonces le resultado va a ser la lista de _todos_ los documentos de la colección.

```
db.alumnos.find()
```

Como output nos imprimió por pantalla lo siguiente:
`{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }`, como vemos están los datos que habiamos guardado del alumno y además Mongodb le agregó un ID, que va a ser único para cada registro y que le va a ayudar a Mongo a buscar más rápidamente entre los registros.
Ahora probemos meter más alumnos, luego listar todos de nuevo, y finalmente buscar por alguna condición:

```
db.alumnos.insert({nombre: 'Guille', curso: 'bootcamp'})
db.alumnos.insert({nombre: 'Juan', curso: 'bootcamp'})
db.alumnos.insert({nombre: 'Santi', curso: 'codeRamp'})
db.alumnos.insert({nombre: 'Toni', curso: 'codeRamp'})
```

Hacemos un `find()` y obtenemos:
```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "nombre" : "Juan", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

:+1: Joya! nos listó todos los que habiamos insertado. Ahora intentemos listar _sólo_ los alumnos del curso __codeRamp__. Para eso vamos a usar la misma función pero pasandole parámetros:
`db.alumnos.find({curso:'codeRamp'})`.

Output:
```
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

:kissing_cat:

`db.alumnos.find({nombre:'Santi', curso:'codeRamp'})`

Output:
```
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
```

Como vemos, le pasamos a `find()`, las llaves y valores que queremos que tengan los documentos que buscamos y mongo se encargá de encontrarlos y listarlos para nosotros!.

Ahora intentemos _updatead_ un documento, para eso tenemos que seleccionar el o los documentos que queremos moficiar y también decir qué nuevos valores queremos que tenga. Vamos a usar la función `update()`, veamos un ejemplo:

Vamos a hacer que el alumno Juan (que estaba en el Bootcamp) pase al curso codeRamp: `db.alumnos.update({nombre:'Juan'},{curso:'codeRamp'})`.

Veamos el output de `find()`:

```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

Como vemos, se hicieron los cambios en documento donde estaba _Guille_, pero se perdió su nombre. Esto es porque el `update` por defecto reemplaza el documento por lo que le estamos pasando, veamos como cambiar ese comportamiento. Para eso, vamos a pasar un objeto que tenga la propiedad `$set` y en ella lo que queremos agregar al documento, si ya existia una propiedad va a sobreescribila:
`db.alumnos.update({nombre:'Santi'},{$set: {curso:'BOOTCAMP'}})`

Output de `db.alumnos.find()`:
```
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b748ef20fe32edc8ec4ef6"), "curso" : "codeRamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "BOOTCAMP" }
{ "_id" : ObjectId("57b7491020fe32edc8ec4ef8"), "nombre" : "Toni", "curso" : "codeRamp" }
```

Como vemos, ahora sí hicimos que el alumnos `Santi` pase del codeRamp al Bootcamp! :smile:

Por último, para borrar tenemos que usar la función `remove()` y le pasamos un objeto de búsqueda, todo lo que encuentre con esos valores será ~~DESTRUIDO~~ borrado. Probemos: `db.alumnos.remove({curso:'codeRamp'})`

Output:
```
WriteResult({ "nRemoved" : 2 })

--> db.alumnos.find()
{ "_id" : ObjectId("57b7463020fe32edc8ec4ef5"), "nombre" : "Guille", "curso" : "bootcamp" }
{ "_id" : ObjectId("57b7490e20fe32edc8ec4ef7"), "nombre" : "Santi", "curso" : "BOOTCAMP" }
```

:+1: Genial! se borrarón dos registros y sólo quedaron los alumnos que _NO_ iban al `codeRamp`.


Ahora veamos como interactuar con Mongo, pero no desde el `mongo shell` si no desde `Node`.

## Mongoose

Podemos interactuar con mongo desde Node, pero deberíamos codear nuestra propia herramienta para hacerlo, ya que nos tenemos que conectar a través del SO, o sea deberíamos trabajar con código de bajo nivel. Pero como nos podemos imaginar, alquien ya hizo ese trabajo por nosotros! Vamos a ver una herramienta llamada 'mongoose'.
mongoose es una herramienta (librería), que podemos bajar de `npm` y que está hecha para interactuar con `mongo` de una manera intuitiva. No es la única librería que existe para hacer esto, pero es una de las más utilizadas.

### Instalación y pruebas

Vamos a empezar por instalar _mongoose_ (en su proyecto ya creado o en uno nuevo), haciendo `npm --install mongoose`. Ahora veamos como hacer una pequeña prueba desde javascript, para eso vamos a crear un nuevo archivo `pruebamon.js`, dentro de ese archivo vamos a agregar una serie de alumnos en nuestra base de datos de Mongo:

```javascript
var mongoose = require('mongoose'); // Importamos el módulo Mongoose.
mongoose.connect("mongodb://localhost/alumnos") // Connect se conecta a la bd
                                                //tenemos que especificar en qué host está y que base de datos queremos, en este caso alumnos. Si no existe la crea.

var alumnoModel = new mongoose.Schema({ // Antes de poder escribir en la DB, tenemos que especificar un modelo
    nombre: String,                     // para los datos, explicaremos esto más adelante en detalle
    edad: Number,                       // Básicamente, decime el nombre y el tipo de datos que vamos a necesitar
    interfaz: String
    });

var Alumno = mongoose.model('alumno', alumnoModel); // Creamos una clase Alumno basado en el modelo que definimos
                                                    // este objeto va a tener todo el comportamiento de mongoose

//Creamos un alumno usando la clase Alumno

var monica = new  Alumno({
            nombre: 'Monica',
            edad: 24,
            interfaz: 'moongose'
        });

var ayelen = new Alumno({
            nombre: 'Ayelén',
            edad: 21,
            interfaz: 'moongose'
        });

monica.save();  // Monica es clase alumno, que hereda el metodo save de mongoose
                // Este método nos deja guardar en la base de datos.

ayelen.save( (err, result) =>{  // save tambien puede recibir un callback para poder ver si se guarda bien
    if(err){                    // o bien hacer algo cuando termine
        console.log(err);       // este patrón va a aparece mucho en mongoose
    }else{                      // por ejemplo con .find() o .delete(), todas reciben un callback.
    console.log(result);
    }
});

//Ahora imprimamos por pantalla todos los alumnos que hay en la bd
Alumno.find({}, function(err, alumnos){
    if(err){
        console.log('hubo un error!');
    }else{
        console.log(alumnos);
    }
})
```

### Modelos

Como vimos en el ejemplo, en Moongoose tenemos que definir un `Schema`, que luego usaremos para crear nuestro `model` que finalmente va a ser el objeto que tiene toda la funcionalidad de mongoose, y cuyas instancias  van a ser los _documentos_ que terminen guardados en __Mongo__.
Seguramente se harán la pregunta de por qué hay schemas, si supuestamente `mongodb` era schemaless (o que no teníamos que definir una estructura antes de guardar datos). Si bien esto es cierto, a los desarrolladores en general les sirve tener algún tipo de esquema definido de cómo quieren que sean los objetos que trabajan y que finalmente se guardan en la bd, al tener un esquema bajamos las posibilidades que algún dato que no queremos se escriba en la BD. Por ejemplo, en el campo DNI llega un string con palabras, si tuvieramos definido un esquema diciendo que es tipo `entero` ese string nunca llegaría a la base de datos. De hecho, podemos especificar con bastante detalle cómo queremos que sean los datos:

```javascript
var personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    sex: { type: String, enum: ["M","F"] },
    country: { type: String, default: "Argentina" }
});
```

En el ejemplo de arriba estamos diciendo:

    * name: Es tipo String y no puede ser nulo.
    * age: es de tipo entero.
    * sex: Es tipo string y sólo puede tomar los valores "M" y "F"/
    * country:  Es tipo String y si no lo declaramos toda el valor por defecto "Argentina".

Existen todavía más restricciones o `constrains` que les podemos poder a nuestros schemas, podemos ver todo en la [documentación de mongoose](http://mongoosejs.com/docs/guide.html).

De todas formas, mongoose ofrece la funcionalidad de trabajar `schemaless`, para eso hay que declarar que un schema no es _estricto_ con el keyword `strict` seteado en false:

```javascript
var personSchema = new mongoose.Schema({ },{ "strict": false });
Persona =  mongoose.model( "Person", personSchema );
```

### CRUD ( Create, Read, Update, Delete) en Mongoose

En Mongoose, los _documentos_ son instancias de los _modelos_, crearlos y guardarlos es fácil:

```javascript
var santi = new Persona({ name: 'Santi', age : 29  });
santi.save(function (err) {
  if (err) return handleError(err);
  // Guardado!
})

// O

Persona.create({ name: 'Santi', age: 29 }, function (err, persona) {
  if (err) return handleError(err);
  // Guardado!
})
```

Para buscar, Mongoose nos ofrece varios sabores, vamos a usar una función distinta según si queremos buscar múltiples valores o un sólo registro:

```javascript
// Busca  Personas con nombre 'Ghost' y trae los campos _name_ y _age_
Persona.find({ 'name': 'Ghost' }, 'name age', function (err, person) {
  if (err) return handleError(err);
  console.log(person.name) 
})

//Busca una persona con nombre Ghost
Persona.findOne({ name: 'Ghost' }, function (err, person) {});

//Podemos Buscar por ID tambien
Persona.findById(id, function (err, person) {});
```

> En realidad esta no es la única forma de hacer queries con Mongoose, hay todo un capítulo en la documentacion [acá](http://mongoosejs.com/docs/queries.html)

Para eliminar un _documento_ vamos a usar un método que tienen los modelos llamado `remove()`, el cual elimina todos los documentos que matcheen con las condiciones que les pasamos:

```javascript
Persona.remove({ age: 29 }, function (err) {
  if (err) return handleError(err);
  // removed!
});
```

Para modificar un registro la sintaxis es muy parecida a la del Mongo CLI, vamos a usar la función `update`, y vamos a pasarle un query y lo que queremos modificar:

```javascript
Persona.update({ age: { $gt: 30 } }, { viejo: true }, fn);
```

Aca vamos a agregarle una variable booleana 'viejo' a todos las Personas que sean mayores de treinta. :smile:

> Para poder hacer queries específicas y usar operados más generales, como por ejemplo el _greater than_ vamos a referirnos a la documentación de __Mongo__ sobre el tema, [acá](https://docs.mongodb.com/getting-started/shell/query/) la podemos ver.

## Relaciones

En varias ocasiones cuando modelamos, nos damos cuenta que existen relaciones entre _entidades_, por ejemplo: Si estoy modelando una escuela y tengo las entidades __curso__ y __alumnos__ podemos imaginar que habrá un relacion entre los dos. De hecho, un __curso__ puede tener varios __alumnos__ dentro. Veamos como diagramar esto con __mongoose__:

```javascript
var mongoose = require("mongoose")

var AlumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true},
  apellido: { type: String, required: true},
  date: { type: Date, default: Date.now }
})

var CursoSchema = new mongoose.Schema({
  alumnos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alumnos"
    }],
  nombre: String,
  date: { type: Date, default: Date.now }
})
```

Como vemos en el ejemplo, el _Schema_ Alumnos lo hemos construido de manera normal, con los datos y validaciones necesarias. Ahora, para el de _Curso_ hemos agregado un tipo de datos nuevo llamado `ObjectID`, este tipo de datos no es _nativo_ de JavaScript por lo que lo vamos a encontrar en `mongoose.Schema.Types.ObjectId`, como se pueden imaginar este tipo de datos hace referencia a un `ID` de MongoDB. Además tenemos que aclarar a qué otro Schema hace referencia, eso lo hacemos escribiendo el nombre del mismo en la propiedad `ref`. Por lo tanto, y como lo encerramos entre `[]`, cada curso va a tener un arreglo de alumnos (definidos en su propio Schema).

Ahora veamos como hacer queries a esos datos.

## Population

No existen `joins` en MongoDb, pero a veces es necesario traer los datos de las relaciones de ciertos Schemas. Por ejemplo, yo quiero saber todos los nombres y apellidos de los _Alumnos_ del _Curso_ `1ero B`. Acá es donde aparece el concepto de __population__.

__Population__ es el proceso de reemplazar automáticamente los paths especificados en un _documento_ con los datos de otros _documentos_ de otras _colecciones_. 


```javascript

var Curso  = mongoose.model('Cursos', CursoSchema);
var Alumno = mongoose.model('Alumnos', AlumnoSchema);

var juan = new Alumno({  nombre: 'Juan', apellido: 'Perez' });
var martin = new Alumno({ nombre: 'Martin', apellido: 'Perez' });


var cur = new Curso({
    nombre: "1ero B",
    alumnos: [juan, martin]
  });

juan.save(function (err) {
  if (err) return handleError(err);
  martin.save(function (err) {
    if (err) return handleError(err);
    // listo!
    cur.save(function (err) {
        if (err) return handleError(err);
        // listo!
      });
  });

});
```

> El atributo __ref__ es el que le dice a Mongoose con qué _collection_ popular.

Por ahora sólo hemos creado dos _Alumnos_ y un _Curso_, ahora vamos a hacer un query para ver cómo funciona __population__.

```javascript
Curso.findOne({ nombre: '1ero B' }).populate('alumnos')
.exec(function (err, doc) {
          if (err) return handleError(err);
          console.log(doc)
        });
```

Como pueden ver en el output del `console.log`, tenemos todos los datos de los documentos tipo _Alumnos_. Justamente la función `populate` hace ese trabajo por nosotros, va a buscar en las demás colleciones y traernos todos los datos a los que estemos haciendo referencia.
