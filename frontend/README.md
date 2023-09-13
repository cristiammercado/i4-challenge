# I4 - Prueba Desarrollador Fullstack #

Este es el repositorio para la prueba de desarrollador fullstack de I4 Digital para la Gobernación de Antioquia. Puede ver la descripción del reto en la ruta [extras/RETO.md](../extras/RETO.pdf).

Single Page Application (SPA) construida con [React](https://react.dev/) versión 18.

----------
- **Autor:** Cristiam Mercado - <cristiammercadoj@gmail.com>
----------

#### **REQUERIMIENTOS MÍNIMOS** ####

 - Git
 - NodeJS v18.17.1 LTS
 - npm v10.1.0
 - I4 - API REST

#### **CONFIGURACIÓN INICIAL** ####

El código fuente se encuentra en un proyecto de tipo Gradle usando el DSL de Kotlin que puede ser abierto con cualquier IDE que soporte este tipo de proyectos (recomendado *IntelliJ IDEA*).

Para iniciar a codificar, recuerde que se usa [GitHub Flow](https://guides.github.com/introduction/flow/) para el manejo de las ramas de `Git`, por lo cual asegúrese de que esté ubicado en la rama `develop` antes de realizar cualquier cambio, realizar un `git pull` para actualizar su repositorio local y posteriormente crear una rama `feature/{nombre-cambio}` a partir de `develop` en dónde realizar los cambios correspondientes.

No haga cambios directamente sobre la rama `develop` ni tampoco sobre `main`, siempre cree una nueva rama `feature` y una vez realizado `git push` al servidor con sus cambios, cree un pull request con los cambios hacia `develop` para que otra persona del equipo o en su defecto usted mismo, revise y apruebe el PR.

##### **npm** #####

Localmente, ejecute `npm install` para descargar las dependencias de la aplicación después de haber realizado un `git pull`. Además de descargar, también realiza una serie de procedimientos automáticos de acuerdo al entorno de desarrollo en el que se ejecuta. Nunca ejecute `npm update`. Si quiere subir la versión de una dependencia, edite la versión de dicha dependencia en el archivo `package.json` directamente, y luego ejecute nuevamente `npm install`.

#### **ncu** #####

Si quiere actualizar la versión de alguna dependencia, le recomendamos instalar [npm-check-updates](https://github.com/raineorshine/npm-check-updates) con el comando:

```
npm i -g npm-check-updates
```

Al ejecutar el comando `ncu` podrá ver qué dependencias del proyecto tienen una versión más actualizada. Tenga en cuenta hacer pruebas generales si ha actualizado una dependencia, sobre todo si la actualización ha sido `major`.

##### **Servidor local** #####

Ejecute `npm run dev` para arrancar el servidor de la aplicación. Abra en su navegador `http://localhost:3000/`. La aplicación se recargará automáticamente si realiza algún cambio en los archivos de código fuente.

#### **COMPILACIÓN** ####

Ejecute `npm run build` para compilar el proyecto. Los artefactos de compilación serán almacenados en el directorio `frontend/dist`. En el archivo `package.json` actualmente ya existen tareas para ejecutar estos comandos.
