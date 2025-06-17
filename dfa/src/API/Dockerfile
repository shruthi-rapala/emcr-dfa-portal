FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
ENV ASPNETCORE_FORWARDEDHEADERS_ENABLED=true
ENV DOTNET_gcServer=1
ARG VERSION
ENV VERSION=$VERSION

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy all directories at once
COPY ["dfa/src/API/", "dfa/src/API/"]
COPY ["shared/src/", "shared/src/"]

# Build and publish
WORKDIR /src/dfa/src/API
RUN dotnet sln EMBC.DFA.sln remove /src/shared/src/EMBC.Database.Test/EMBC.Database.Test.csproj || true
RUN dotnet restore EMBC.DFA.sln
RUN dotnet publish "EMBC.DFA.API/EMBC.DFA.API.csproj" -c Release -o /app/publish --runtime linux-musl-x64 --no-self-contained

# Final stage
FROM base
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "EMBC.DFA.API.dll"]
