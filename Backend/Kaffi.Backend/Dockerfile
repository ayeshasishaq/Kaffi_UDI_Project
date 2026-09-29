FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

WORKDIR /src
COPY . ./
# Pass på restore med flere prosjekter aka testing. Det kan ødelegge, Legg til når vi skal lage et test prosjekt
RUN dotnet restore
RUN dotnet publish -o out


FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
WORKDIR /app
COPY --from=build /src/out .
EXPOSE 8080

ENTRYPOINT ["dotnet", "Kaffi.Backend.dll"]
