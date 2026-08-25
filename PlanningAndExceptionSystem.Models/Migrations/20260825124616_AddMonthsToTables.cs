using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Models.Migrations
{
    /// <inheritdoc />
    public partial class AddMonthsToTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlanningMonthsId",
                table: "SalesPlans",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlanningMonthsId",
                table: "ActualSales",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SalesPlans_PlanningMonthsId",
                table: "SalesPlans",
                column: "PlanningMonthsId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualSales_PlanningMonthsId",
                table: "ActualSales",
                column: "PlanningMonthsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualSales_PlanningMonths_PlanningMonthsId",
                table: "ActualSales",
                column: "PlanningMonthsId",
                principalTable: "PlanningMonths",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SalesPlans_PlanningMonths_PlanningMonthsId",
                table: "SalesPlans",
                column: "PlanningMonthsId",
                principalTable: "PlanningMonths",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_PlanningMonths_PlanningMonthsId",
                table: "ActualSales");

            migrationBuilder.DropForeignKey(
                name: "FK_SalesPlans_PlanningMonths_PlanningMonthsId",
                table: "SalesPlans");

            migrationBuilder.DropIndex(
                name: "IX_SalesPlans_PlanningMonthsId",
                table: "SalesPlans");

            migrationBuilder.DropIndex(
                name: "IX_ActualSales_PlanningMonthsId",
                table: "ActualSales");

            migrationBuilder.DropColumn(
                name: "PlanningMonthsId",
                table: "SalesPlans");

            migrationBuilder.DropColumn(
                name: "PlanningMonthsId",
                table: "ActualSales");
        }
    }
}
