using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Kaffi.Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "continent",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_continent", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "flavour",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_flavour", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "variety",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_variety", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "country",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    continentid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_country", x => x.id);
                    table.ForeignKey(
                        name: "fk_country_continent_continentid",
                        column: x => x.continentid,
                        principalTable: "continent",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "coffee",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    countryid = table.Column<int>(type: "integer", nullable: false),
                    varietyid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_coffee", x => x.id);
                    table.ForeignKey(
                        name: "fk_coffee_country_countryid",
                        column: x => x.countryid,
                        principalTable: "country",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_coffee_variety_varietyid",
                        column: x => x.varietyid,
                        principalTable: "variety",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "coffee_flavours",
                columns: table => new
                {
                    coffeeid = table.Column<int>(type: "integer", nullable: false),
                    flavourid = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_coffee_flavours", x => new { x.coffeeid, x.flavourid });
                    table.ForeignKey(
                        name: "fk_coffee_flavours_coffee_coffeeid",
                        column: x => x.coffeeid,
                        principalTable: "coffee",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_coffee_flavours_flavour_flavourid",
                        column: x => x.flavourid,
                        principalTable: "flavour",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_coffee_countryid",
                table: "coffee",
                column: "countryid");

            migrationBuilder.CreateIndex(
                name: "ix_coffee_varietyid",
                table: "coffee",
                column: "varietyid");

            migrationBuilder.CreateIndex(
                name: "ix_coffee_flavours_flavourid",
                table: "coffee_flavours",
                column: "flavourid");

            migrationBuilder.CreateIndex(
                name: "ix_country_continentid",
                table: "country",
                column: "continentid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "coffee_flavours");

            migrationBuilder.DropTable(
                name: "coffee");

            migrationBuilder.DropTable(
                name: "flavour");

            migrationBuilder.DropTable(
                name: "country");

            migrationBuilder.DropTable(
                name: "variety");

            migrationBuilder.DropTable(
                name: "continent");
        }
    }
}
