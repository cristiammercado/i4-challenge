# I4 - Prueba Desarrollador Fullstack #

Este es el repositorio para la prueba de desarrollador fullstack de I4 Digital para la Gobernación de Antioquia. Puede ver la descripción del reto en la ruta [extras/RETO.md](extras/RETO.pdf).

API REST construida en Java versión 17 como un microservicio usando como base el framework Spring Boot, implementando programación reactiva con Webflux y compilada a un archivo de tipo fat-jar. Las intermediaciones con servicios de almacenamiento de datos como MySQL se hacen a través de R2DBC.

----------
- **Autor:** Cristiam Mercado - <cristiammercadoj@gmail.com>
----------

#### **REQUERIMIENTOS MÍNIMOS** ####

- Git
- Java JDK 17 LTS
- Gradle 8
- Docker

No olvide configurar las variables del sistema:

- `JAVA_HOME`: apuntando a la carpeta de instalación del JDK.
- Agregar en el path del sistema operativo la carpeta `bin` de la instalación de Gradle.

#### **CONFIGURACIÓN INICIAL** ####

El código fuente se encuentra en un proyecto de tipo Gradle usando el DSL de Kotlin que puede ser abierto con cualquier IDE que soporte este tipo de proyectos (recomendado *IntelliJ IDEA*).

Para iniciar a codificar, recuerde que se usa [GitHub Flow](https://guides.github.com/introduction/flow/) para el manejo de las ramas de `Git`, por lo cual asegúrese de que esté ubicado en la rama `develop` antes de realizar cualquier cambio, realizar un `git pull` para actualizar su repositorio local y posteriormente crear una rama `feature/{nombre-cambio}` a partir de `develop` en dónde realizar los cambios correspondientes.

No haga cambios directamente sobre la rama `develop` ni tampoco sobre `main`, siempre cree una nueva rama `feature` y una vez realizado `git push` al servidor con sus cambios, cree un pull request con los cambios hacia `develop` para que otra persona del equipo o en su defecto usted mismo, revise y apruebe el PR.

##### **Gradle** #####

Tenga en cuenta instalar Gradle de manera global en su sistema operativo para mayor comodidad. Para saber si se instaló correctamente de manera global, basta con abrir una consola de comandos y ejecutar:

```bash
gradle -v
```

Esto debería dar como respuesta algo similar a lo mostrado a continuación (ejemplo en `Ubuntu`):

```
------------------------------------------------------------
Gradle 8.3
------------------------------------------------------------

Build time:   2023-08-17 07:06:47 UTC
Revision:     8afbf24b469158b714b36e84c6f4d4976c86fcd5

Kotlin:       1.9.0
Groovy:       3.0.17
Ant:          Apache Ant(TM) version 1.10.13 compiled on January 4 2023
JVM:          17.0.8 (Azul Systems, Inc. 17.0.8+7-LTS)
OS:           Linux 6.2.0-32-generic amd64

```

Sin embargo, también es posible usar el wrapper que viene integrado en la raíz del proyecto haciendo uso del archivo `gradlew.bat` en Windows o `./gradlew` en sistemas Linux/Unix.

##### **Base de datos** #####

Para instalar el motor de bases de datos relacional `MySQL` de manera local debe instalar `Docker`. Si está en Windows, se recomienda usar la integración de Docker Desktop con WSL 2 para que la ejecución de los comandos a continuación sea compatible, puede instalar por ejemplo Ubuntu LTS desde la tienda de Microsoft. Para sistemas Linux/Unix, puede instalar docker desde su documentación.

Ejecute los siguientes comandos para arrancar `MySQL` en un contenedor de docker:

```bash
cd extras
docker compose -f mysql.yml up -d
```

Después de unos segundos, arrancará `MySQL` con el usuario por defecto `root` y con clave `mysql-password`. Ya este contenedor de docker viene configurado para desarrollo, codificación de textos y zona horaria UTC.

El anterior comando también por defecto crea una base de datos llamada `i4-challenge`. De igual manera crea un cliente basado en PHP llamado adminer con el cual puede conectarse a la base de datos. Para acceder a este cliente, abra su navegador web y vaya a la dirección [http://localhost:8088](http://localhost:8088).

 - Motor de base de datos: MySQL
 - Servidor: i4-challenge-mysql
 - Usuario: root
 - Contraseña: mysql-password
 - Base de datos: i4-challenge

Tenga en cuenta que las credenciales de acceso para ingresar al servidor MySQL anteriormente mencionadas son para el ambiente de desarrollo. Para ambiente de pruebas y productivo debe rescribirse las propiedades acordes a las variables de entorno usadas en el archivo `src/main/resources/application.properties`.

#### **EJECUCIÓN** ####

Puede ejecutar el proyecto de dos maneras: directamente desde el comando de Gradle específico para esto, o desde el archivo compilado en formato `jar`.

##### **Gradle** #####

Para ejecutar el código fuente desde Gradle, simplemente ejecuta el comando:

```bash
gradlew.bat clean bootRun # Windows
```

```bash
./gradlew clean bootRun # Linux/Unix
```

##### **JAR** #####

Para ejecutar el código fuente desde el archivo jar, debe primero compilar el proyecto con el siguiente comando:

```bash
gradlew.bat clean build # Windows
```

```bash
./gradlew clean build # Linux/Unix
```

Una vez compilado proyecto, se generará un archivo en el directorio `build/libs` llamado `api.jar`. Este archivo ya debe ejecutarlo con el JRE instalado en su computador. La manera sencilla de hacerlo sería:

```bash
cd build/libs
java -jar api.jar
```

Este comando iniciaría la aplicación con la configuración por defecto (LOCAL). Si quiere reescribir las variables de configuración o el ambiente de ejecución tenga en cuenta como se hace declarando variables de entorno.

#### **PRUEBAS** ####

Para ejecutar las pruebas e2e, ejecute el siguiente comando:

```bash
gradlew.bat clean test # Windows
```

```bash
./gradlew clean test # Linux/Unix
```

Eso generará un reporte del resultado de las pruebas en HTML en la carpeta `build/reports/tests/test/index.html`.

##### **Cobertura** #####

Se usa Jacoco como herramienta de análisis de cobertura de código. El análisis de cobertura se realiza una vez son ejecutadas todas las pruebas. Puedes encontrar el reporte de cobertura en la carpeta `build/reports/jacoco/test/html/index.html`.
