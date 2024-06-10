using System;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using EMBC.DFA.API.ConfigurationModule.Models.Dynamics;
using EMBC.DFA.API.Services;
using EMBC.Utilities.Configuration;
using EMBC.Utilities.Telemetry;
using IdentityModel.AspNetCore.OAuth2Introspection;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.AspNetCore;
using NSwag.Generation.Processors.Security;
using Xrm.Tools.WebAPI;
using Xrm.Tools.WebAPI.Requests;
using ITokenProvider = EMBC.DFA.API.Services.ITokenProvider;

namespace EMBC.DFA.API
{
    public class Configuration : IConfigureComponentServices, IConfigureComponentPipeline
    {
        public void ConfigureServices(ConfigurationServices configurationServices)
        {
            var services = configurationServices.Services;
            var configuration = configurationServices.Configuration;

            services.Configure<JsonOptions>(opts =>
            {
                opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            });
            // 2024-05-27 EMCRI-217 waynezen:
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    RequireSignedTokens = true,
                    RequireAudience = true,
                    RequireExpirationTime = true,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromSeconds(60),
                    NameClaimType = ClaimTypes.Upn,
                    RoleClaimType = ClaimTypes.Role,
                    ValidateActor = true,
                    ValidateIssuerSigningKey = true,
                };

                configurationServices.Configuration.GetSection("jwt").Bind(options);

                options.Events = new JwtBearerEvents
                {
                    OnTokenValidated = async c =>
                    {
                        var userService = c.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        c.Principal = await userService.GetPrincipal(c.Principal);
                    }
                };
                options.Validate();
            })
             //reference tokens handling
             .AddOAuth2Introspection("introspection", options =>
             {
                 options.EnableCaching = true;
                 options.CacheDuration = TimeSpan.FromMinutes(20);
                 configuration.GetSection("auth:introspection").Bind(options);
                 options.Events = new OAuth2IntrospectionEvents
                 {
                     OnTokenValidated = async ctx =>
                     {
                         await Task.CompletedTask;
                         var logger = ctx.HttpContext.RequestServices.GetRequiredService<ITelemetryProvider>().Get<OAuth2IntrospectionEvents>();
                         var userInfo = ctx.Principal?.FindFirst("userInfo");
                         logger.LogDebug("{0}", userInfo);
                     },
                     OnAuthenticationFailed = async ctx =>
                     {
                         await Task.CompletedTask;
                         var logger = ctx.HttpContext.RequestServices.GetRequiredService<ITelemetryProvider>().Get<JwtBearerEvents>();
                         logger.LogError(ctx?.Result?.Failure, "Introspection authantication failed");
                     }
                 };
             });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(JwtBearerDefaults.AuthenticationScheme, policy =>
                {
                    policy
                    .RequireAuthenticatedUser()
                    .AddAuthenticationSchemes("jwt")
                    .RequireClaim("scope", "dfa-portal-api");
                });

                options.DefaultPolicy = options.GetPolicy(JwtBearerDefaults.AuthenticationScheme) ?? null!;
            });

            services.Configure<OpenApiDocumentMiddlewareSettings>(options =>
            {
                options.Path = "/api/openapi/{documentName}/openapi.json";
                options.DocumentName = "DFA Portal API";
                options.PostProcess = (document, req) =>
                {
                    document.Info.Title = "DFA Portal API";
                };
            });

            services.Configure<SwaggerUiSettings>(options =>
            {
                options.Path = "/api/openapi";
                options.DocumentTitle = "DFA Portal API Documentation";
                options.DocumentPath = "/api/openapi/{documentName}/openapi.json";
            });

            services.AddOpenApiDocument(document =>
            {
                document.AddSecurity("bearer token", Array.Empty<string>(), new OpenApiSecurityScheme
                {
                    Type = OpenApiSecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "paste token here",
                    In = OpenApiSecurityApiKeyLocation.Header
                });

                document.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("bearer token"));
                //document.GenerateAbstractProperties = true;
            });

            services.AddTransient<IEvacuationSearchService, EvacuationSearchService>();
            services.AddTransient<IProfileInviteService, ProfileInviteService>();
            services.AddTransient<IConfigurationHandler, Handler>();
            services.AddTransient<IDynamicsGateway, DynamicsGateway>();
            services.Configure<ADFSTokenProviderOptions>(configuration.GetSection("Dynamics:ADFS"));
            services.AddADFSTokenProvider();
            services.AddHttpClient("captcha");
            services.AddScoped(sp =>
            {
                var dynamicsApiEndpoint = configuration.GetValue<string>("Dynamics:DynamicsApiEndpoint");
                var tokenProvider = sp.GetRequiredService<ITokenProvider>();
                return new CRMWebAPI(new CRMWebAPIConfig
                {
                    APIUrl = dynamicsApiEndpoint,
                    GetAccessToken = async (s) => await tokenProvider.AcquireToken()
                });
            });
            services.AddCors(opts => opts.AddDefaultPolicy(policy =>
            {
            //policy.AllowAnyHeader();
            //policy.AllowAnyMethod();
            //policy.AllowAnyOrigin();

            //policy.WithOrigins("https://dfa-portal-dev.apps.silver.devops.gov.bc.ca",
            //                "https://dfa-landing-page-dev.apps.silver.devops.gov.bc.ca");

            //try to get array of origins from section array
            var corsOrigins = configuration.GetSection("cors:origins").GetChildren().Select(c => c.Value).ToArray();
            // try to get array of origins from value
            if (!corsOrigins.Any()) corsOrigins = configuration.GetValue("cors:origins", string.Empty).Split(',');
            corsOrigins = corsOrigins.Where(o => !string.IsNullOrWhiteSpace(o)).ToArray();
            if (corsOrigins.Any())
            {
                policy.WithOrigins(corsOrigins);
            }
            }));
        }

        public void ConfigurePipeline(PipelineServices services)
        {
            var app = services.Application;
            var env = services.Environment;

            if (!env.IsProduction())
            {
                IdentityModelEventSource.ShowPII = true;
            }
            if (!env.IsProduction())
            {
                app.UseOpenApi();
                app.UseSwaggerUi();
            }
            app.UseCors();
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}
