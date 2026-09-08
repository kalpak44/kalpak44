# Java 25 (LTS). The tag pins the JDK deliberately — see the maven `ignore` entry in
# homelab-infra's terraform/github/kalpak44/dependabot.yml, which keeps Dependabot from
# walking this onto a non-LTS Java.
FROM maven:3.9.16-eclipse-temurin-25 AS pdf-builder

WORKDIR /app

# Resolve dependencies against the POM alone first, so editing src/ or data/ reuses this
# layer instead of re-downloading the world on every build.
COPY cv-pdf-generator/pom.xml ./cv-pdf-generator/
RUN mvn -B -Dmaven.repo.local=/tmp/mvn-repo -f cv-pdf-generator/pom.xml \
    dependency:go-offline

COPY cv-pdf-generator/src ./cv-pdf-generator/src
COPY cv-pdf-generator/data ./cv-pdf-generator/data

# Tests run here on purpose. This stage is what actually produces the shipped PDF, so
# skipping them meant the image could be built from code whose tests fail — and they are
# the only thing asserting that the PDF renders at all. They add about three seconds.
RUN RESUME_DATA_DIR=cv-pdf-generator/data \
    mvn -B -Dmaven.repo.local=/tmp/mvn-repo -f cv-pdf-generator/pom.xml \
    verify exec:java \
    -Dexec.mainClass=online.pavelusanli.resume.ResumeApp \
    -Dexec.args="build /tmp/resume.pdf"

# A zero-byte or missing PDF would otherwise be copied into the site and served as a
# broken download; the build must fail here instead.
RUN test -s /tmp/resume.pdf && head -c 5 /tmp/resume.pdf | grep -q '^%PDF-'

FROM node:26-slim AS web-builder

WORKDIR /app/web-page-app

COPY web-page-app/package.json web-page-app/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY web-page-app/src ./src
COPY web-page-app/public ./public
COPY web-page-app/index.html web-page-app/vite.config.js web-page-app/eslint.config.js ./
COPY --from=pdf-builder /tmp/resume.pdf ./public/assets/resume.pdf

RUN npx vite build

FROM nginx:1.31-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=web-builder /app/web-page-app/dist /usr/share/nginx/html
COPY web-page-app/docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
