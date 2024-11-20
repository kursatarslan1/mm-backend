# Temel Node.js imajını kullan
FROM node:16

# Java'yı yüklemek için gerekli komutlar
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk

# JAVA_HOME ortam değişkenini ayarla
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# Çalışma dizini
WORKDIR /app

# Proje dosyalarını kopyala
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Uygulamanı başlat
CMD ["npm", "start"]
