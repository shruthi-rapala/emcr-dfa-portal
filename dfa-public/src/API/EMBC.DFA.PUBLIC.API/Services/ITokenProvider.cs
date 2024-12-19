using System.Threading.Tasks;

namespace EMBC.DFA.API.Services
{
    public interface ITokenProvider
    {
        Task<string> AcquireToken();
    }
}
