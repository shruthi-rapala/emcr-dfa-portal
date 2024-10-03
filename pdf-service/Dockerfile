FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["pdf-service.csproj", "./"]
RUN dotnet restore "pdf-service.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "pdf-service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "pdf-service.csproj" -c Release -o /app/publish


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /opt/app-root/app
#ENV ASPNETCORE_URLS=http://*:8080
ENV ASPNETCORE_URLS=http://*:8080

ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENV DOTNET_gcServer=1
ENV LD_LIBRARY_PATH=/usr/lib:/usr/local/lib:$LD_LIBRARY_PATH
ARG VERSION
ENV VERSION=$VERSION
USER 0
RUN \
    apt-get update && apt-get install -y \
    libgdiplus \
    libx11-dev \
    libxcursor1 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libjpeg62-turbo \
    libfontconfig1 \
    libxrender1 \
    xfonts-75dpi \
    xfonts-base \
    libssl1.1 \
    libstdc++6 \
    zlib1g \
    libfreetype6 \
    libpng16-16\
    libxcb1 \
    libx11-xcb1 \
    wkhtmltopdf \
    && rm -rf /var/lib/apt/lists/* \
    && mkdir /usr/local/bin/Linux \
    && echo $'#!/usr/bin/env sh\n    /usr/local/bin/wkhtmltopdf --zoom 1.3 $@ \n    ' > /usr/local/bin/Linux/wkhtmltopdf     \
    && chmod +x /usr/local/bin/Linux/wkhtmltopdf
USER 1001

EXPOSE 8080

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "pdf-service.dll"]


