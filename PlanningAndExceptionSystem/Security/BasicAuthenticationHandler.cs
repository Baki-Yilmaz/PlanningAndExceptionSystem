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

                var user = await _userService.Where(u => u.Name == username && u.Password == password).FirstOrDefaultAsync();

                if (user == null)
                    return AuthenticateResult.Fail("Geçersiz Kullanıcı Adı veya Şifre!");

                var claims = new[] { new Claim(ClaimTypes.Name, username) };
                var identity = new ClaimsIdentity(claims, Scheme.Name);
                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return AuthenticateResult.Success(ticket);
            }

            catch
            {
                return AuthenticateResult.Fail("Geçersiz Authorization Formatı!");
            }
        }
    }
}