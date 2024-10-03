using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace EMBC.DFA.API.ConfigurationModule.Models.PDF.PDFService
{
    public class PDFServiceHandler
    {
        public async Task<byte[]> GetFileDataAsync(PdfReuest pdfReuest)
        {
            byte[] fileBytes = null;
            //await CheckAuthToken();
            string url = "https://localhost:53091/api/PDF/GetPDF";
            //string downloadPath = @"C:\path\to\save\file.zip"; // Local path to save the file
            using (HttpClient client = new HttpClient())
            {
                // Create your POST request content (if any)
                try
                {
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    var content = new StringContent(JsonConvert.SerializeObject(pdfReuest), Encoding.UTF8, "application/json");
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
    }
}
