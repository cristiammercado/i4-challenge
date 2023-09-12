FROM azul/zulu-openjdk-alpine:17-jre-headless

# Set working directory
WORKDIR /app

# Copy files to working dir
COPY build/libs/api.jar ./

# Entry command
CMD ["java", "-jar", "./api.jar"]
