using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Teams;
using EMBC.Utilities.Caching;
using EMBC.Utilities.Messaging;
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
    private readonly IMessagingClient messagingClient;
    private readonly IHttpContextAccessor httpContext;
    private readonly ICache cache;

    private ClaimsPrincipal currentPrincipal => httpContext.HttpContext?.User;

    private static string GetCurrentUserName(ClaimsPrincipal principal) => principal.FindFirstValue("bceid_username");

    public UserService(IMessagingClient messagingClient, ICache cache, IHttpContextAccessor httpContext)
    {
        this.messagingClient = messagingClient ?? throw new ArgumentNullException(nameof(messagingClient));
        this.cache = cache ?? throw new ArgumentNullException(nameof(cache));
        this.httpContext = httpContext ?? throw new ArgumentNullException(nameof(httpContext));
    }

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

    public async Task<TeamMember> GetTeamMember(string? userName = null)
    {
        if (string.IsNullOrEmpty(userName)) userName = GetCurrentUserName(currentPrincipal);

        return (await messagingClient.Send(new TeamMembersQuery { UserName = userName, IncludeActiveUsersOnly = true })).TeamMembers.SingleOrDefault();
    }
}
