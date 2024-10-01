using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Newtonsoft.Json;
using OpenTelemetry.Contrib.Instrumentation.GrpcCore;
using Xrm.Tools.WebAPI.Requests;

namespace EMBC.DFA.API.ConfigurationModule.Models.PDF.PDFService
{
    public class PDFServiceHandler
    {
        private HttpClient httpClient = null;

        private CRMWebAPIConfig crmWebAPIConfig;

        public PDFServiceHandler(CRMWebAPIConfig crmWebAPIConfig)
        {
           this.crmWebAPIConfig = crmWebAPIConfig;
           if (crmWebAPIConfig.NetworkCredential != null)
            {
                httpClient = new HttpClient(new HttpClientHandler
                {
                    Credentials = crmWebAPIConfig.NetworkCredential
                });
            }
            else
            {
                httpClient = new HttpClient();
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", crmWebAPIConfig.AccessToken);
            }

           SetHttpClientDefaults(crmWebAPIConfig.CallerID);
        }
        public async Task<byte[]> GetFileDataAsync(PdfApplicationData pdfApplicationData)
        {
            byte[] fileBytes = null;
            //await CheckAuthToken();
            string url = "https://localhost:53091/api/PDF/GetPDF/dfa_application_demo";
            //string downloadPath = @"C:\path\to\save\file.zip"; // Local path to save the file
            using (HttpClient client = new HttpClient())
            {
                // Create your POST request content (if any)
                var content = new StringContent(JsonConvert.SerializeObject(pdfApplicationData)); // Add appropriate content if needed
                try
                {
                    // Send the POST request
                    HttpResponseMessage response = await client.PostAsync(url, content);
                    // Ensure the request was successful
                    response.EnsureSuccessStatusCode();
                    // Read the content as a byte array
                    fileBytes = await response.Content.ReadAsByteArrayAsync();
                    // Save the file to the specified location
                    //await File.WriteAllBytesAsync(downloadPath, fileBytes);
                    Console.WriteLine("File downloaded successfully.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"An error occurred: {ex.Message}");
                }
            }
            return fileBytes;
        }
        private void SetHttpClientDefaults(Guid callerID)
        {
            httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
            httpClient.DefaultRequestHeaders.Add("OData-MaxVersion", "4.0");
            httpClient.DefaultRequestHeaders.Add("OData-Version", "4.0");
            if (callerID != Guid.Empty)
            {
                httpClient.DefaultRequestHeaders.Add("MSCRMCallerID", callerID.ToString());
            }

            httpClient.Timeout = new TimeSpan(0, 2, 0);
        }
    }
}
