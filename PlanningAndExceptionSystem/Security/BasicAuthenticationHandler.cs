using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using PlanningAndExceptionSystem.Services.Interfaces;
using DevExpress.Xpo;

namespace PlanningAndExceptionSystem.Security
{
    public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private readonly IUserService _userService;

        public BasicAuthenticationHandler (
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IUserService userService)
            : base(options, logger, encoder, clock)
        {
            _userService = userService;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return AuthenticateResult.Fail("Authorization Başlığı Bulunamadı!");
            string username = " ";
            try
            {
                var authHeader =
                    AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
                var byteBuffer = Convert.FromBase64String(authHeader.Parameter);
                var credentials = Encoding.UTF8.GetString(byteBuffer).Split(':');
                username = credentials[0];
                var password = credentials[1];

                System.Diagnostics.Debug.WriteLine($"---> Gelen Username: '{username}', Gelen Password: '{password}'");

                var user = _userService.Where(u => (u.Name == username || u.Email == username) && u.Password == password).FirstOrDefault();

                if (user == null)
                {
                    System.Diagnostics.Debug.WriteLine("---> Veritabanında bu kullanıcı adı ve şifreye uygun kayıt bulunamadı!");
                    return AuthenticateResult.Fail("Geçersiz Kullanıcı Adı veya Şifre!");
                }

                System.Diagnostics.Debug.WriteLine($"---> Kullanıcı bulunud! Rolü: '{user.Role}'");

                var claims = new[]
                { 
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role, user.Role?? "Staff")
                };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }

            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"---> Auth Hata Oluştu: {ex.Message}");
                return AuthenticateResult.Fail("Geçersiz Authorization Formatı!");
            }
        }
    }
}