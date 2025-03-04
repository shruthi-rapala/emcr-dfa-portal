﻿namespace EMBC.DFA.PUBLIC.API.Services.S3
{
    public class S3StorageProviderSettings
    {
        public string Url { get; set; } = null!;
        public string AccessKey { get; set; } = null!;
        public string SecretKey { get; set; } = null!;
        public string BucketName { get; set; } = null!;
    }
}
