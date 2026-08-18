using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Migrations
{
    /// <inheritdoc />
    public partial class NameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_Users_UserID",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "CountrId",
                table: "Shops");

            migrationBuilder.DropColumn(
                name: "UserIs",
                table: "salesPlans");

            migrationBuilder.DropColumn(
                name: "ExeptionActionId",
                table: "Actions");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "salesPlans",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_salesPlans_UserID",
                table: "salesPlans",
                newName: "IX_salesPlans_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_salesPlans_Users_UserId",
                table: "salesPlans",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_salesPlans_Users_UserId",
                table: "salesPlans");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "salesPlans",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_salesPlans_UserId",
                table: "salesPlans",
                newName: "IX_salesPlans_UserID");

            migrationBuilder.AddColumn<int>(
                name: "CountrId",
                table: "Shops",
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
                name: "ExeptionActionId",
                table: "Actions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_salesPlans_Users_UserID",
                table: "salesPlans",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
