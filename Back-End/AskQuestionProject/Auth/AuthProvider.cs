using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AskQuestionProject.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" }); // Farklı domainlerden istek sorunu yaşamamak için

            //Burada kendi authentication yöntemimizi belirleyebiliriz.Veritabanı bağlantısı vs...
            var userservice = new userService();
            var user = userservice.userSingIn(context.UserName, context.Password);
            List<string> userAuths = new List<string>();

            if (user != null)
            {
                string authority = "";
                if (user.userIsAdmin == 1)
                {
                    authority = "Admin";

                }
                else
                {
                    authority = "User";
                }
                userAuths.Add(authority);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, authority));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, user.userId.ToString()));

                AuthenticationProperties propert = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "userId", user.userId.ToString() },
                    { "userName", user.userName },
                    { "photo", user.photo },
                    { "userAuths",Newtonsoft.Json.JsonConvert.SerializeObject(userAuths) }

               });
                AuthenticationTicket ticket = new AuthenticationTicket(identity, propert);


                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek", "Hatalı kullanıcı bilgisi");
            }



        }
        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}
