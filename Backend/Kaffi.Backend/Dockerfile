FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src
COPY . ./
RUN dotnet restore
RUN dotnet publish -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
COPY --from=build /src/out .
EXPOSE 8080

ENTRYPOINT ["dotnet", "Kaffi.Backend.dll"]
