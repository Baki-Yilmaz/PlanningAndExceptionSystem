using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Migrations
{
    /// <inheritdoc />
    public partial class PlanAndActualUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Actions_ExceptionActions_ExceptionActionId",
                table: "Actions");

            migrationBuilder.DropForeignKey(
                name: "FK_Actions_Users_ApprovedById",
                table: "Actions");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Products_ProductId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Shops_ShopId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ExceptionActions_PlanningExceptions_PlanningExceptionId",
                table: "ExceptionActions");

            migrationBuilder.DropForeignKey(
                name: "FK_ExceptionActions_Users_CreatedById",
                table: "ExceptionActions");

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
                name: "FK_salesPlans_Users_UserId",
                table: "salesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_planningWeeks_PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_Shops_Countries_CountryId",
                table: "Shops");

            migrationBuilder.DropPrimaryKey(
                name: "PK_salesPlans",
                table: "salesPlans");

            migrationBuilder.DropIndex(
                name: "IX_salesPlans_PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_planningWeeks",
                table: "planningWeeks");

            migrationBuilder.DropIndex(
                name: "IX_planningWeeks_SeasonId",
                table: "planningWeeks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Actions",
                table: "Actions");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "salesPlans");

            migrationBuilder.RenameTable(
                name: "salesPlans",
                newName: "SalesPlans");

            migrationBuilder.RenameTable(
                name: "planningWeeks",
                newName: "PlanningWeeks");

            migrationBuilder.RenameTable(
                name: "Actions",
                newName: "ActionApprovals");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "SalesPlans",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_salesPlans_UserId",
                table: "SalesPlans",
                newName: "IX_SalesPlans_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_salesPlans_ProductId",
                table: "SalesPlans",
                newName: "IX_SalesPlans_CategoryId");

            migrationBuilder.RenameColumn(
                name: "TotalAmaout",
                table: "ActualSales",
                newName: "TotalAmount");

            migrationBuilder.RenameIndex(
                name: "IX_Actions_ExceptionActionId",
                table: "ActionApprovals",
                newName: "IX_ActionApprovals_ExceptionActionId");

            migrationBuilder.RenameIndex(
                name: "IX_Actions_ApprovedById",
                table: "ActionApprovals",
                newName: "IX_ActionApprovals_ApprovedById");

            migrationBuilder.AddColumn<int>(
                name: "PlanningWeekId",
                table: "Seasons",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "TargetProfit",
                table: "SalesPlans",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "PlanningWeekId",
                table: "PlanningWeeks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlanningWeekId",
                table: "ActualSales",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "Profit",
                table: "ActualSales",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SalesPlans",
                table: "SalesPlans",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlanningWeeks",
                table: "PlanningWeeks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActionApprovals",
                table: "ActionApprovals",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Seasons_PlanningWeekId",
                table: "Seasons",
                column: "PlanningWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_PlanningWeekId",
                table: "PlanningWeeks",
                column: "PlanningWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualSales_PlanningWeekId",
                table: "ActualSales",
                column: "PlanningWeekId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActionApprovals_ExceptionActions_ExceptionActionId",
                table: "ActionApprovals",
                column: "ExceptionActionId",
                principalTable: "ExceptionActions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActionApprovals_Users_ApprovedById",
                table: "ActionApprovals",
                column: "ApprovedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_PlanningWeeks_PlanningWeekId",
                table: "ActualSales",
                column: "PlanningWeekId",
                principalTable: "PlanningWeeks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_Products_ProductId",
                table: "ActualSales",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_Shops_ShopId",
                table: "ActualSales",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ExceptionActions_PlanningExceptions_PlanningExceptionId",
                table: "ExceptionActions",
                column: "PlanningExceptionId",
                principalTable: "PlanningExceptions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ExceptionActions_Users_CreatedById",
                table: "ExceptionActions",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningExceptions_ExceptionRules_ExceptionRuleId",
                table: "PlanningExceptions",
                column: "ExceptionRuleId",
                principalTable: "ExceptionRules",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningExceptions_SalesPlans_SalesPlanId",
                table: "PlanningExceptions",
                column: "SalesPlanId",
                principalTable: "SalesPlans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlanningWeeks_SalesPlans_PlanningWeekId",
                table: "PlanningWeeks",
                column: "PlanningWeekId",
                principalTable: "SalesPlans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products",
                column: "BrandId",
                principalTable: "Brands",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesPlans_Categories_CategoryId",
                table: "SalesPlans",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesPlans_Users_UserId",
                table: "SalesPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Seasons_PlanningWeeks_PlanningWeekId",
                table: "Seasons",
                column: "PlanningWeekId",
                principalTable: "PlanningWeeks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Shops_Countries_CountryId",
                table: "Shops",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActionApprovals_ExceptionActions_ExceptionActionId",
                table: "ActionApprovals");

            migrationBuilder.DropForeignKey(
                name: "FK_ActionApprovals_Users_ApprovedById",
                table: "ActionApprovals");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_PlanningWeeks_PlanningWeekId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Products_ProductId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_Shops_ShopId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_ExceptionActions_PlanningExceptions_PlanningExceptionId",
                table: "ExceptionActions");

            migrationBuilder.DropForeignKey(
                name: "FK_ExceptionActions_Users_CreatedById",
                table: "ExceptionActions");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanningExceptions_ExceptionRules_ExceptionRuleId",
                table: "PlanningExceptions");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanningExceptions_SalesPlans_SalesPlanId",
                table: "PlanningExceptions");

            migrationBuilder.DropForeignKey(
                name: "FK_PlanningWeeks_SalesPlans_PlanningWeekId",
                table: "PlanningWeeks");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Brands_BrandId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_Categories_CategoryId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesPlans_Categories_CategoryId",
                table: "SalesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesPlans_Users_UserId",
                table: "SalesPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_Seasons_PlanningWeeks_PlanningWeekId",
                table: "Seasons");

            migrationBuilder.DropForeignKey(
                name: "FK_Shops_Countries_CountryId",
                table: "Shops");

            migrationBuilder.DropIndex(
                name: "IX_Seasons_PlanningWeekId",
                table: "Seasons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SalesPlans",
                table: "SalesPlans");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlanningWeeks",
                table: "PlanningWeeks");

            migrationBuilder.DropIndex(
                name: "IX_PlanningWeeks_PlanningWeekId",
                table: "PlanningWeeks");

            migrationBuilder.DropIndex(
                name: "IX_ActualSales_PlanningWeekId",
                table: "ActualSales");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActionApprovals",
                table: "ActionApprovals");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "Seasons");

            migrationBuilder.DropColumn(
                name: "TargetProfit",
                table: "SalesPlans");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "PlanningWeeks");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "ActualSales");

            migrationBuilder.DropColumn(
                name: "Profit",
                table: "ActualSales");

            migrationBuilder.RenameTable(
                name: "SalesPlans",
                newName: "salesPlans");

            migrationBuilder.RenameTable(
                name: "PlanningWeeks",
                newName: "planningWeeks");

            migrationBuilder.RenameTable(
                name: "ActionApprovals",
                newName: "Actions");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "salesPlans",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_SalesPlans_UserId",
                table: "salesPlans",
                newName: "IX_salesPlans_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SalesPlans_CategoryId",
                table: "salesPlans",
                newName: "IX_salesPlans_ProductId");

            migrationBuilder.RenameColumn(
                name: "TotalAmount",
                table: "ActualSales",
                newName: "TotalAmaout");

            migrationBuilder.RenameIndex(
                name: "IX_ActionApprovals_ExceptionActionId",
                table: "Actions",
                newName: "IX_Actions_ExceptionActionId");

            migrationBuilder.RenameIndex(
                name: "IX_ActionApprovals_ApprovedById",
                table: "Actions",
                newName: "IX_Actions_ApprovedById");

            migrationBuilder.AddColumn<int>(
                name: "PlanningWeekId",
                table: "salesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_salesPlans",
                table: "salesPlans",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_planningWeeks",
                table: "planningWeeks",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Actions",
                table: "Actions",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_salesPlans_PlanningWeekId",
                table: "salesPlans",
                column: "PlanningWeekId");

            migrationBuilder.CreateIndex(
                name: "IX_planningWeeks_SeasonId",
                table: "planningWeeks",
                column: "SeasonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Actions_ExceptionActions_ExceptionActionId",
                table: "Actions",
                column: "ExceptionActionId",
                principalTable: "ExceptionActions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Actions_Users_ApprovedById",
                table: "Actions",
                column: "ApprovedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

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
                name: "FK_ExceptionActions_PlanningExceptions_PlanningExceptionId",
                table: "ExceptionActions",
                column: "PlanningExceptionId",
                principalTable: "PlanningExceptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ExceptionActions_Users_CreatedById",
                table: "ExceptionActions",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Categories_CategoryId",
                table: "Inventories",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Inventories_Shops_ShopId",
                table: "Inventories",
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
                name: "FK_salesPlans_Users_UserId",
                table: "salesPlans",
                column: "UserId",
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
    }
}
