using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddShopToInventory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "Inventories",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_ShopId",
                table: "Inventories",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Shops_ShopId",
                table: "Inventories",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inventories_Shops_ShopId",
                table: "Inventories");

            migrationBuilder.DropIndex(
                name: "IX_Inventories_ShopId",
                table: "Inventories");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "Inventories");
        }
    }
}
