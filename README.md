# ⚛ React 🔥 Firebase - CRUD Firestore

### Example Project to [React Workshops](https://www.youtube.com/playlist?list=PLPvHukATGjeOpYti5TgY70Qbn8h7eDQZx)

### Firebase Hosting [App URL](https://crud-react-firebase-8f4ee.web.app/login)

### Author

Ariel Duarte
(c)2021

### Project was created with:

- React
- Firebase
- Redux
- Material UI
- Redux-thunk
- Yup
- React Hook Form
- Lodash
- Font-awesome

### Setup

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Creamos una react app para conectar con el firestore

```
npx create-react-app crud-firestore
cd crud-firestore
code .
npm start
```

### CRUD Firestore

Si no conoces Firestore no te preocupes, aquí viene un ejemplo para practicar. Firestore es un servicio de Firebase (creado por Google) para almacenar collection (base de datos no relacionales) y utilizarlas de forma gratuita.

### Crear Proyecto en Firebase

Dirigete a https://firebase.google.com/

accede con alguna cuenta de Gmail y listo!

    1. Pinchamos en añadir proyecto le di el nombre de `crud-react-firebase`
    2. Nos vamos a Cloud Firestore, le crear base de datos
    3. Seleccionamos iniciar en modo de prueba y la ubicacion por defecto le damos HABILITAR
    4. Listo ✔
    5. Creamos una coleccion llamada `tareas`
    6. ID del documento: Seleccionamos ID Automatico
    7. Creamos 3 campos `name`, `status` todos de tipo String y le agregamos valores aleatorios, le damos GUARDAR

[![firebase-collection.jpg](https://i.postimg.cc/jdrRkfM4/firebase-collection.jpg)](https://postimg.cc/XXQMrrSr)

### Configurar Firebase en React

En este ejemplo utilizaremos un proyecto limpio de React, pero es importante instalar Firebase con:

```
npm i firebase
```

### Registar la aplicación en Firebase

1. Dentro de Firebase vamos a `Configuración del proyecto`, es el icono de una tuerca ⚙ que se encuentra a la derecha de 🏚 Información General
2. Vamos a la sección de `Tus aplicaciones` y seleccionamos el boton de enlace **</>**
3. En la seccion **Añadir Firebase a tu aplicación web**, le damos un apodo a nuestra aplicación por ejemplo `my-crud-react-app`
4. Le damos el botón de Registrar Aplicación y no envia a la seccion de **Añadir SDK de Firebase**
5. de aca necesitamos el apiKey, pero antes vamos a crear un archivo en la carpeta `src` llamado `fireabase.js`
6. Copiamos los datos de configuración de firebase para nuestra app y el contentido del archivo `fireabase.js` tiene que quedar algo asi;

```js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "crud-react-firebase-xxxx.firebaseapp.com",
  databaseURL: "https://crud-react-firebase-xxxx.firebaseio.com",
  projectId: "crud-react-firebase-xxxx",
  storageBucket: "crud-react-firebase-xxxx.appspot.com",
  messagingSenderId: "232074208526",
  appId: "1:232074208526:web:5987846963050ccd03235f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export { firebase };
```

### Bootstrap

En la carpeta public vamos a ir al index.html y cargamos este enlace a bootstrap para usar sus clases en el proyecto dentro del <head>

```html
<head>
  <title>React App</title>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous"
  />
</head>
```

### LEER documentos

https://firebase.google.com/docs/firestore/quickstart?authuser=0#read_data

```js
import { firebase } from "./firebase";

React.useEffect(() => {
  const obtenerDatos = async () => {
    const db = firebase.firestore();
    try {
      const data = await db.collection("tareas").get();
      const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(arrayData);
    } catch (error) {
      console.log(error);
    }
  };
  obtenerDatos();
}, []);
```

#### Si queremos mostrarlo en el html usamos el useState

```js
import React, { useState, useEffect } from "react";
import { firebase } from "./fireabase";
```

```js
const [tareas, setTareas] = useState([]);

useEffect(() => {
  const obtenerDatos = async () => {
    const db = firebase.firestore();
    try {
      const data = await db.collection("tareas").get();
      const arrayData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log(arrayData);
      setTareas(arrayData);
    } catch (error) {
      console.log(error);
    }
  };
  obtenerDatos();
}, []);
```

```html
<div className="container mb-2">
  <div className="row">
    <div className="col-md-6">
      <h3>Lista de Tareas</h3>
      <ul className="list-group">
        { tareas.map(item => (
        <li className="list-group-item" key="{item.id}">
          <span>{item.name}</span>
          <button className="btn btn-danger btn-sm float-right">
            Eliminar
          </button>
          <button className="btn btn-warning btn-sm float-right mr-2">
            Editar
          </button>
        </li>
        )) }
      </ul>
    </div>
    <div className="col-md-6">formulario</div>
  </div>
</div>
```

### AGREGAR documentos

https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

```js
import React, { useState, useEffect } from "react";
import { firebase } from "./fireabase";
```

```js
const agregar = async (e) => {
  e.preventDefault();
  if (!tarea.trim()) {
    console.log("sin texto");
    return;
  }
  console.log(tarea);

  // Llamada a la api para agregar con .add()
  try {
    const db = firebase.firestore();
    const nuevaTarea = {
      name: tarea,
      status: "TODO",
    };
    const data = await db.collection("tareas").add(nuevaTarea);
    setTareas([...tareas, { id: data.id, ...nuevaTarea }]);
    setTarea("");
  } catch (error) {
    console.log(error);
  }
};
```

```html
<h3>Formulario</h3>
<form onSubmit="{agregar}">
  <input type="text" className="form-control mb-2" placeholder='Ingrese Tarea'
  value={tarea} onChange={e => setTarea(e.target.value)} />
  <button type="submit" className="btn btn-dark btn-block btn-sm">
    Agregar
  </button>
</form>
```

### ELIMINAR documentos

```html
<button
    className="btn btn-danger btn-sm float-right"
    onClick={() => eliminar(item.id)}
>
    Eliminar
</button>

```

```js
const eliminar = async (id) => {
  try {
    const db = firebase.firestore();
    await db.collection("tareas").doc(id).delete();
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    setTareas(arrayFiltrado);
  } catch (error) {
    console.log(error);
  }
};
```

### EDITAR documentos

https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#update-data

```js
const [modoEdicion, setModoEdicion] = useState(false);
const [id, setId] = useState("");
```

```html
<div className="col-md-6">
    <h3>
    {
        modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
    }
    </h3>
    <form onSubmit={agregar}>
    <input
        type="text"
        className="form-control mb-2"
        placeholder='Ingrese Tarea'
        value={tarea}
        onChange={e => setTarea(e.target.value)}
    />
    <button
        type='submit'
        className={
        modoEdicion ? 'btn btn-warning btn-block btn-sm' :
        'btn btn-dark btn-block btn-sm'
        }
    >
        {
        modoEdicion ? 'Editar' : 'Agregar'
        }
    </button>
    </form>
</div>
```

```html
<button
    className="btn btn-warning btn-sm float-right mr-2"
    onClick={() => activarEdicion(item)}
>
    Editar
</button>
```

```js
const activarEdicion = (item) => {
  setModoEdicion(true);
  setTarea(item.name);
  setId(item.id);
};
```

```html
<form onSubmit="{modoEdicion" ? editar : agregar}></form>
```

```js
const editar = async (e) => {
  e.preventDefault();
  if (!tarea.trim()) {
    console.log("vacio");
    return;
  }
  try {
    const db = firebase.firestore();
    await db.collection("tareas").doc(id).update({
      name: tarea,
    });
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: item.id, status: item.status, name: tarea } : item
    );
    setTareas(arrayEditado);
    setModoEdicion(false);
    setId("");
    setTarea("");
  } catch (error) {
    console.log(error);
  }
};
```

#### Código completo del App.js

```js
import React, { useState, useEffect } from "react";
import { firebase } from "./fireabase";

function App() {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = React.useState("");

  const agregar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("sin texto");
      return;
    }
    console.log(tarea);

    // Llamada a la api para agregar con .add()
    try {
      const db = firebase.firestore();
      const nuevaTarea = {
        name: tarea,
        status: "TODO",
      };
      const data = await db.collection("tareas").add(nuevaTarea);
      setTareas([...tareas, { id: data.id, ...nuevaTarea }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).delete();
      const arrayFiltrado = tareas.filter((item) => item.id !== id);
      setTareas(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("vacio");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("tareas").doc(id).update({
        name: tarea,
      });
      const arrayEditado = tareas.map((item) =>
        item.id === id
          ? { id: item.id, status: item.status, name: tarea }
          : item
      );
      setTareas(arrayEditado);
      setModoEdicion(false);
      setId("");
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const db = firebase.firestore();
      try {
        const data = await db.collection("tareas").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, []);

  return (
    <div className="container mb-2">
      <div className="row">
        <div className="col-md-6">
          <h3>Lista de Tareas</h3>
          <ul className="list-group">
            {tareas.map((item) => (
              <li className="list-group-item" key={item.id}>
                <span>{item.name}</span>
                <button
                  className="btn btn-danger btn-sm float-right"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-right mr-2"
                  onClick={() => activarEdicion(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>{modoEdicion ? "Editar Tarea" : "Agregar Tarea"}</h3>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
            />
            <button
              type="submit"
              className={
                modoEdicion
                  ? "btn btn-warning btn-block btn-sm"
                  : "btn btn-dark btn-block btn-sm"
              }
            >
              {modoEdicion ? "Editar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
```

### Deployamos nuestro CRUD al Hosting Firebase

1. Corremos este comando para generar la carpeta `build` del proyecto

```js
npm run build
```

2. Vamos a Firebase en el dashboard y buscamos el menu `Hosting`

3. En Hosting le damos al botón `Empezar` y no manda a la seccion de `Configurar Firebase Hosting`

4. Aca hacemos los pasos para instalar Instalar CLI de Firebase en el equipo de forma global; copiamos el comando y lo corremos en al terminal

```js
npm install -g firebase-tools
```

5. Una vez instalado el `firebase-tools` le damos `Siguiente` y nos manda a la seccion `Inicializar tu proyecto` y hacemos lo que nos dice las instrucciones;

#### Inicia sesión en Google

Abre una ventana de terminal y accede al directorio "principal" de la aplicación web serial el nuestro \crud-firestore y corremos el comando login el cual no abre la ventana de autenticación de google y nos logueamos con nuestra cuenta de google que esta asociada al Firebase.

```js
firebase login
```

al final si todo esta bien le muestra esta ventana y ya tiene conectado firebase con su react app

[![firebase-collection.jpg](https://i.postimg.cc/MHwk3LCw/firebase-collection.jpg)](https://postimg.cc/PpSFPSfV)

#### Inicia tu proyecto

Ejecuta este comando desde el directorio "principal" de tu aplicación:

```js
firebase init
```

Nos muestra;

```
* You are currently outside your home directory
? Are you ready to proceed? (Y/n)`
```

le damos Y y Enter y nos muestra;

```
? Are you ready to proceed? Yes
? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
 ( ) Database: Deploy Firebase Realtime Database Rules
 (*) Firestore: Deploy rules and create indexes for Firestore
 ( ) Functions: Configure and deploy Cloud Functions
>(*) Hosting: Configure and deploy Firebase Hosting sites
 ( ) Storage: Deploy Cloud Storage security rules
 ( ) Emulators: Set up local emulators for Firebase features
 ( ) Remote Config: Get, deploy, and rollback configurations for Remote Config
```

Con la tecla ESPACIO seleccionamos las opciones `Firestore: Deploy...` y `Hosting: Configure and deploy....` y le damos a ENTER y nos muestra;

```
=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: (Use arrow keys)
> Use an existing project
  Create a new project
  Add Firebase to an existing Google Cloud Platform project
  Don't set up a default project
```

Seleccionamos `Use an existing project` y ENTER y nos muestra;

```
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: (Use arrow keys)
> crud-react-firebase-xxxx (crud-react-firebase)
```

Y seleccionamos nuestro proyecto y le damos ENTER nos muestra;

```
=== Firestore Setup

Firestore Security Rules allow you to define how and when to allow
requests. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore Rules? (firestore.rules)
```

Le damos a ENTER para crear el rules file y nos muestra;

```
Firestore indexes allow you to perform complex queries while
maintaining performance that scales with the size of the result
set. You can keep index definitions in your project directory
and publish them with firebase deploy.

? What file should be used for Firestore indexes? (firestore.indexes.json)
```

Y le damos ENTER para crear el indexes file y nos muestra;

```
=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? (public)
```

Aca nos pide el directorio donde se compilo nuestra app y lo tenemos todo en la carpeta `build`, por tanto escribimos "build" y le damos ENTER

```
? Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
```

y nos pregunta si esto es un single page applicaction y escribimos `y` y ENTER

```
Set up automatic builds and deploys with GitHub? (y/N)
```

Aca le damos N ya que no estamos trabajando con GitHub todavia y ENTER

```
File build/index.html already exists. Overwrite? (y/N)
```

Nos pregunta si queremos sobrecribir el index.html y le damos que no (N) y ENTER y nos muestra un resumen de todo lo que hicimos.

importante que al final nos diga `Firebase initialization complete!` ( ͡🔥 ͜ʖ ͡🔥)✊

```
=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? build
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No
? File build/index.html already exists. Overwrite? No
i  Skipping write of build/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!
```

#### Desplegar en Firebase Hosting

Volvemos a Firebase le damos `Siguiente` y nos mueve a la seccion de `Desplegar en Firebase Hosting` donde copiamos el comando y ejecutamos desde el directorio "principal" de la aplicación:

```js
firebase deploy
```

Nos muestra el siguiente mensaje si todo salio OK en donde lo mas importante es el `Hosting URL: https://crud-react-firebase-xxxx.web.app`
que es de donde podemos acceder a la app ツ

```
=== Deploying to 'crud-react-firebase-xxxx'...

i  deploying firestore, hosting
i  firestore: reading indexes from firestore.indexes.json...
i  cloud.firestore: checking firestore.rules for compilation errors...
+  cloud.firestore: rules file firestore.rules compiled successfully
+  firestore: deployed indexes in firestore.indexes.json successfully
i  firestore: latest version of firestore.rules already up to date, skipping upload...
i  hosting[crud-react-firebase-xxxx]: beginning deploy...
i  hosting[crud-react-firebase-xxxx]: found 16 files in build
+  hosting[crud-react-firebase-xxxx]: file upload complete
+  firestore: released rules firestore.rules to cloud.firestore
i  hosting[crud-react-firebase-xxxx]: finalizing version...
+  hosting[crud-react-firebase-xxxx]: version finalized
i  hosting[crud-react-firebase-xxxx]: releasing new version...
+  hosting[crud-react-firebase-xxxx]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/crud-react-firebase-xxxx/overview
Hosting URL: https://crud-react-firebase-xxxx.web.app
```

[![00-crud-app-firebase.jpg](https://i.postimg.cc/wvKVYR95/00-crud-app-firebase.jpg)](https://postimg.cc/2qwv46b3)
