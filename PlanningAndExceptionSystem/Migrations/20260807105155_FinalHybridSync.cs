using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Migrations
{
    /// <inheritdoc />
    public partial class FinalHybridSync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountrId",
                table: "Shops",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CountryId",
                table: "Shops",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlanningWeekId",
                table: "salesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "salesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "salesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserIs",
                table: "salesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BrandId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SeasonId",
                table: "planningWeeks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExceptionRuleId",
                table: "PlanningExceptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SalesPlanId",
                table: "PlanningExceptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "ActualSales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "ActualSales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Shops_CountryId",
                table: "Shops",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_salesPlans_PlanningWeekId",
                table: "salesPlans",
                column: "PlanningWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_salesPlans_ProductId",
                table: "salesPlans",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_salesPlans_UserID",
                table: "salesPlans",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_Products_BrandId",
                table: "Products",
                column: "BrandId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_planningWeeks_SeasonId",
                table: "planningWeeks",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningExceptions_ExceptionRuleId",
                table: "PlanningExceptions",
                column: "ExceptionRuleId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningExceptions_SalesPlanId",
                table: "PlanningExceptions",
                column: "SalesPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualSales_ProductId",
                table: "ActualSales",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualSales_ShopId",
                table: "ActualSales",
                column: "ShopId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventories_CategoryId",
                table: "Inventories",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_Products_ProductId",
                table: "ActualSales",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_Shops_ShopId",
                table: "ActualSales",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningExceptions_ExceptionRules_ExceptionRuleId",
                table: "PlanningExceptions",
                column: "ExceptionRuleId",
                principalTable: "ExceptionRules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningExceptions_salesPlans_SalesPlanId",
                table: "PlanningExceptions",
                column: "SalesPlanId",
                principalTable: "salesPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_planningWeeks_Seasons_SeasonId",
                table: "planningWeeks",
                column: "SeasonId",
                principalTable: "Seasons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_salesPlans_Products_ProductId",
                table: "salesPlans",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_salesPlans_Users_UserID",
                table: "salesPlans",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_salesPlans_planningWeeks_PlanningWeekId",
                table: "salesPlans",
                column: "PlanningWeekId",
                principalTable: "planningWeeks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Shops_Countries_CountryId",
                table: "Shops",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Products_ProductId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Shops_ShopId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanningExceptions_ExceptionRules_ExceptionRuleId",
                table: "PlanningExceptions");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanningExceptions_salesPlans_SalesPlanId",
                table: "PlanningExceptions");

            migrationBuilder.DropForeignKey(
                name: "FK_planningWeeks_Seasons_SeasonId",
                table: "planningWeeks");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_Products_ProductId",
                table: "salesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_Users_UserID",
                table: "salesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_planningWeeks_PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_Shops_Countries_CountryId",
                table: "Shops");

            migrationBuilder.DropTable(
                name: "Brands");

            migrationBuilder.DropTable(
                name: "Inventories");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Shops_CountryId",
                table: "Shops");

            migrationBuilder.DropIndex(
                name: "IX_salesPlans_PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.DropIndex(
                name: "IX_salesPlans_ProductId",
                table: "salesPlans");

            migrationBuilder.DropIndex(
                name: "IX_salesPlans_UserID",
                table: "salesPlans");

            migrationBuilder.DropIndex(
                name: "IX_Products_BrandId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_CategoryId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_planningWeeks_SeasonId",
                table: "planningWeeks");

            migrationBuilder.DropIndex(
                name: "IX_PlanningExceptions_ExceptionRuleId",
                table: "PlanningExceptions");

            migrationBuilder.DropIndex(
                name: "IX_PlanningExceptions_SalesPlanId",
                table: "PlanningExceptions");

            migrationBuilder.DropIndex(
                name: "IX_ActualSales_ProductId",
                table: "ActualSales");

            migrationBuilder.DropIndex(
                name: "IX_ActualSales_ShopId",
                table: "ActualSales");

            migrationBuilder.DropColumn(
                name: "CountrId",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "UserIs",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "BrandId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "SeasonId",
                table: "planningWeeks");

            migrationBuilder.DropColumn(
                name: "ExceptionRuleId",
                table: "PlanningExceptions");

            migrationBuilder.DropColumn(
                name: "SalesPlanId",
                table: "PlanningExceptions");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "ActualSales");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "ActualSales");
        }
    }
}
