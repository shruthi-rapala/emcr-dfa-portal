
    public class ClaimAppealRepositoryTests(IClaimAppealRepository repository)
    {
        [Fact]
        public void Query()
        {
            var query = new ClaimAppealQuery();
            query.ClaimId = new Guid("d9dd7bde-d781-f011-b85a-00505683fbf4");
            var results = repository.GetWorkflow(query);
        }
    }

