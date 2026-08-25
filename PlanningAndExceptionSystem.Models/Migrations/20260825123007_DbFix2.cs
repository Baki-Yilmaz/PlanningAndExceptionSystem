using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Models.Migrations
{
    /// <inheritdoc />
    public partial class DbFix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. ActualSales tablosundaki haftalık bağı ve sütunu kaldır
            migrationBuilder.DropForeignKey(
                name: "FK_ActualSales_PlanningWeeks_PlanningWeekId",
                table: "ActualSales");

            migrationBuilder.DropIndex(
                name: "IX_ActualSales_PlanningWeekId",
                table: "ActualSales");

            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "ActualSales");

            // 2. SalesPlans tablosundaki haftalık sütununu kaldır (Constraint'i olmadığı için direkt siliyoruz)
            migrationBuilder.DropColumn(
                name: "PlanningWeekId",
                table: "SalesPlans");

            // 3. SalesPlans tablosundaki gereksiz TargetQuantity sütununu kaldır
            migrationBuilder.DropColumn(
                name: "TargetQuantity",
                table: "SalesPlans");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Geri alma (rollback) senaryosu için sadece TargetQuantity'yi bırakabilirsin
            migrationBuilder.AddColumn<int>(
                name: "TargetQuantity",
                table: "SalesPlans",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}