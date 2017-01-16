using System;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace WebAPIApplication
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            // Auth0 configuration
            services.Configure<Auth0Settings>(Configuration.GetSection(Auth0Settings.SectionKey));
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<Auth0Settings> settings)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            var logger = loggerFactory.CreateLogger("Auth0");
            var bytes = Encoding.UTF8.GetBytes(settings.Value.ClientSecret);
            var base64 = Convert.ToBase64String(bytes);
            var keyAsBytes = Convert.FromBase64String(base64);
            var options = new JwtBearerOptions
            {
                Audience = settings.Value.ClientId,
                Authority = $"https://{settings.Value.Domain}/",
                TokenValidationParameters =
                {
                    IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes)
                },
                Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        logger.LogError("Authentication failed.", context.Exception);
                        return Task.FromResult(0);
                    },
                    OnTokenValidated = context =>
                    {
                        var claimsIdentity = context.Ticket.Principal.Identity as ClaimsIdentity;
                        // E.g. get the user's ID
                        //string userId = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                        return Task.FromResult(0);
                    }
                }
            };
            app.UseJwtBearerAuthentication(options);
            app.UseMvc();
        }
    }
}
