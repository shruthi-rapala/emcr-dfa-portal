using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Teams;
using EMBC.Utilities.Caching;
using Microsoft.AspNetCore.Http;

namespace EMBC.DFA.API;

// 2024-05-27 EMCRI-217 waynezen: imported from EMBC.Responders
public interface IUserService
{
    Task<ClaimsPrincipal> GetPrincipal(ClaimsPrincipal sourcePrincipal = null);

    Task<TeamMember> GetTeamMember(string userName = null);
}

// 2024-05-27 EMCRI-217 waynezen: imported from EMBC.Responders
public class UserService : IUserService
{
    private readonly IHttpContextAccessor httpContext;
    private readonly ICache cache;

    private ClaimsPrincipal currentPrincipal => httpContext.HttpContext?.User;

    private static string GetCurrentUserName(ClaimsPrincipal principal) => principal.FindFirstValue("bceid_username");

    public UserService(ICache cache, IHttpContextAccessor httpContext)
    {
        this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
        this.httpContext = httpContext ?? throw new ArgumentNullException(nameof(httpContext));
    }

    [Obsolete("Messaging API removed")]
    // 2024-06-24 EMCRI-282 waynezen: Function obsolete due to removed Messaging API
    public async Task<ClaimsPrincipal> GetPrincipal(ClaimsPrincipal sourcePrincipal = null)
    {
        if (sourcePrincipal == null) sourcePrincipal = currentPrincipal;
        var userName = GetCurrentUserName(sourcePrincipal);

        var cacheKey = $"user:{userName}";
        var teamMember = await cache.GetOrSet(cacheKey, async () => await GetTeamMember(userName), TimeSpan.FromMinutes(10));
        if (teamMember == null) return sourcePrincipal;

        Claim[] essClaims =
        {
            new Claim("user_id", teamMember.Id),
            new Claim("user_role", teamMember.Role),
            new Claim("user_team", teamMember.TeamId)
        };

        return new ClaimsPrincipal(new ClaimsIdentity(sourcePrincipal.Identity, sourcePrincipal.Claims.Concat(essClaims)));
    }

    // 2024-06-24 EMCRI-282 waynezen: Function obsolete due to removed Messaging API
    public async Task<TeamMember> GetTeamMember(string? userName = null)
    {
        TeamMember teamMember = null;
        return await Task.FromResult(teamMember);
    }
}
