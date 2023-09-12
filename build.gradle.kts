import java.util.*

group = "com.cm"
version = readVersion()
description = "I4 Challenge"

plugins {
    java
    idea
    application
    jacoco

    id("org.springframework.boot") version "3.1.3"
    id("io.spring.dependency-management") version "1.1.3"
    id("com.github.ben-manes.versions") version "0.48.0"
}

idea {
    module {
        name = "I4 Challenge"
        isDownloadSources = true
        isDownloadJavadoc = true
    }
}

repositories {
    mavenCentral()
    gradlePluginPortal()
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-webflux")
    implementation("org.springframework.boot:spring-boot-starter-data-r2dbc")
    implementation("org.springframework.boot:spring-boot-starter-validation")

    implementation("io.asyncer:r2dbc-mysql:1.0.2")
    implementation("org.flywaydb:flyway-core:9.22.0")
    implementation("org.mapstruct:mapstruct:1.5.5.Final")

    compileOnly("org.projectlombok:lombok:1.18.28")
    annotationProcessor("org.projectlombok:lombok:1.18.28")
    annotationProcessor("org.mapstruct:mapstruct-processor:1.5.5.Final")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("io.projectreactor:reactor-test:3.5.9")
    testImplementation("com.h2database:h2:2.2.222")
    testImplementation("io.r2dbc:r2dbc-h2:1.0.0.RELEASE")
}

application {
    mainClass.set("com.cm.challenge.ChallengeApplication")
    applicationDefaultJvmArgs = mutableListOf("-Duser.timezone=UTC")
}

tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs = listOf("-Xlint:unchecked", "-Xlint:deprecation", "-Xmaxerrs", "1000")
}

tasks.withType<Test> {
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

tasks.withType<JacocoReport> {
    reports {
        xml.required.set(true)
        html.required.set(true)
    }

    afterEvaluate {
        classDirectories.setFrom(files(classDirectories.files.map {
            fileTree(it).apply {
                exclude( "**/config/**", "**/AppointmentTypeMapperImpl**")
            }
        }))
    }
}

jacoco {
    toolVersion = "0.8.8"
}

tasks.bootJar {
    archiveFileName.set("api.jar")
}

fun readVersion(): String {
    val version = File("VERSION").readText(Charsets.UTF_8).trim()

    if (Objects.equals(System.getenv("GITHUB_REF_NAME"), "main")) {
        return version
    }

    if (Objects.equals(System.getenv("GITHUB_REF_NAME"), "beta")) {
        return "$version-beta.0"
    }

    return "$version-alpha.0"
}
