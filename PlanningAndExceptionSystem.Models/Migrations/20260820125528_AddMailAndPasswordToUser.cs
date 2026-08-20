using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Models.Migrations
{
    public partial class AddMailAndPasswordToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Sadece Users tablosuna eksik olan sütunları ekliyoruz
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Geri almak istersek (Rollback) eklenen sütunları düşürürüz
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Users");
        }
    }
}