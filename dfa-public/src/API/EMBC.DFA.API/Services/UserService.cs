using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Teams;
using EMBC.Utilities.Caching;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace EMBC.DFA.API;

// 2024-07-02 EMCRI-363 waynezen: created
public interface IUserService
{
    /// <summary>
    /// Gets the BCeID Guid from the current user.
    /// </summary>
    /// <returns>The user's BCeID Guid or <see cref="Guid.Empty"/> if not set.</returns>
    string GetBCeIDUserId();
    string GetBCeIDBusinessId();
}

// 2024-05-27 EMCRI-217 waynezen: imported from EMBC.Responders
public class UserService : IUserService
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly ILogger<UserService> logger;

    public UserService(IHttpContextAccessor httpContextAccessor, ILogger<UserService> logger)
    {
        this.httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public string GetBCeIDBusinessId()
    {
        var principal = GetPrincipal();
        var userid = GetClaim(principal, "bceid_business_guid");

        if (Guid.TryParse(userid.Value, out Guid id))
        {
            return id.ToString("d"); // format with dashes : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        }

        logger.LogInformation($"Current user's bceid_business_guid cannot be parsed as a valid guid: {userid?.Value}");

        return string.Empty;
    }

    public string GetBCeIDUserId()
    {
        var principal = GetPrincipal();
        var userid = GetClaim(principal, "bceid_user_guid");

        if (Guid.TryParse(userid.Value, out Guid id))
        {
            return id.ToString("d"); // format with dashes : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        }

        logger.LogInformation($"Current user's bceid_user_guid cannot be parsed as a valid guid: {userid?.Value}");

        return string.Empty;
    }

    private ClaimsPrincipal GetPrincipal()
    {
        ClaimsPrincipal result = null;

        var context = httpContextAccessor.HttpContext;
        if (context is null)
        {
            logger.LogInformation("HttpContext is null. Service may be been called outside of a api request");
            return result;
        }

        result = context.User;
        return result;
    }

    private Claim? GetClaim(ClaimsPrincipal principal, string claimName)
    {
        Claim? result = null;

        if (principal != null)
        {
            Claim? userid = principal.Claims.SingleOrDefault(_ => _.Type == claimName);
            if (userid is null)
            {
                logger.LogInformation($"Current user does not have a {claimName} claim");
                return result;
            }
            else
            {
                result = userid;
            }
        }

        return result;
    }
}
