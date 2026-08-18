using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanningAndExceptionSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddActionApprovalTAble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExceptionActions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlanningExceptionId = table.Column<int>(type: "int", nullable: false),
                    ActionType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedById = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExceptionActions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ExceptionActions_PlanningExceptions_PlanningExceptionId",
                        column: x => x.PlanningExceptionId,
                        principalTable: "PlanningExceptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ExceptionActions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Actions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ExeptionActionId = table.Column<int>(type: "int", nullable: false),
                    ExceptionActionId = table.Column<int>(type: "int", nullable: false),
                    ApprovedById = table.Column<int>(type: "int", nullable: false),
                    ApprovalStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Actions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Actions_ExceptionActions_ExceptionActionId",
                        column: x => x.ExceptionActionId,
                        principalTable: "ExceptionActions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Actions_Users_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Actions_ApprovedById",
                table: "Actions",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_Actions_ExceptionActionId",
                table: "Actions",
                column: "ExceptionActionId");

            migrationBuilder.CreateIndex(
                name: "IX_ExceptionActions_CreatedById",
                table: "ExceptionActions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ExceptionActions_PlanningExceptionId",
                table: "ExceptionActions",
                column: "PlanningExceptionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Actions");

            migrationBuilder.DropTable(
                name: "ExceptionActions");
        }
    }
}
