﻿using emcr_dfa_poc18.Models.AppSettings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace emcr_dfa_poc18.Services
{
    public class PdfRequestService : IPdfRequestService
    {

        public string BaseUri { get; set; } = "";

        private HttpClient _client;
        private readonly ILogger<PdfRequestService> _logger;

        public PdfRequestService(HttpClient httpClient, 
            IOptions<AppWebDefaults> webDefaults,
            IConfiguration configuration, 
            ILogger<PdfRequestService> logger)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            // configure the HttpClient that is used for our direct REST calls.
            _client = httpClient;
            _client.Timeout = TimeSpan.FromMinutes(5);
            AppWebDefaults appWebSettings = webDefaults?.Value ?? new AppWebDefaults();

            _client.DefaultRequestHeaders.Add("Accept", "application/json");
            string serviceUri = appWebSettings.PDFServiceUri;
            string serviceSecret = appWebSettings.PDFServiceSecret;
            string serviceToken = appWebSettings.PDFServiceToken;

            if (!string.IsNullOrEmpty(serviceUri))
            {
                BaseUri = serviceUri;
                if (!string.IsNullOrEmpty(serviceSecret))
                {
                    // do a handshake with the REST service to get a token.
                    string token = GetToken(serviceSecret).GetAwaiter().GetResult();
                    if (token != null)
                    {
                        // remove the expires from the end.
                        if (token.IndexOf(" Expires") != -1)
                        {
                            token = token.Substring(0, token.IndexOf(" Expires"));
                            token = token.Replace("\"", "");
                        }
                        _client.DefaultRequestHeaders.Add("Authorization", $"Bearer {token}");
                    }
                }
            }
            // legacy method
            else if (!string.IsNullOrEmpty(serviceToken))
            {
                string bearer_token = $"Bearer {serviceToken}";
                _client.DefaultRequestHeaders.Add("Authorization", bearer_token);
            }
        }


        /// <summary>
        /// Gets a PDF file from the supplied inputs.
        /// </summary>
        /// <param name="parameters">Object holding the data to pass to the template for rendering a PDF file</param>
        /// <param name="template">The template to render as PDF (e.g. "cannabis_licence")</param>
        /// <returns>Binary data representing the PDF file</returns>
        public async Task<byte[]> GetPdf(Dictionary<string, object> parameters, string template)
        {
            byte[] result = null;

            var saniPath = BaseUri + "/api/pdf/GetPdf/";
            _logger.LogInformation($"Test harness calling PDF Service with: {saniPath}");


            HttpRequestMessage endpointRequest =
                new HttpRequestMessage(HttpMethod.Post, saniPath + template);

            //HttpRequestMessage endpointRequest =
            //    new HttpRequestMessage(HttpMethod.Get, BaseUri + "/api/pdf/GetTestPDF");


            string jsonString = JsonConvert.SerializeObject(parameters);
            StringContent strContent = new StringContent(jsonString, Encoding.UTF8);
            strContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
            endpointRequest.Content = strContent;

            try
            {
                // make the request.
                var response = await _client.SendAsync(endpointRequest);
                HttpStatusCode _statusCode = response.StatusCode;

                if (_statusCode == HttpStatusCode.OK)
                {
                    result = await response.Content.ReadAsByteArrayAsync();
                }
                else
                {
                    throw new Exception($"PDF service did not return OK result. Result={_statusCode.ToString()}");
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return result;
        }

        /// <summary>
        /// Gets a hash of the generated PDF so that consumer code can determine whether to re-download the same file or not.
        /// </summary>
        /// <param name="parameters">Object holding the data to pass to the template for rendering a PDF file</param>
        /// <param name="template">The template to render as PDF (e.g. "cannabis_licence")</param>
        /// <returns>A string with the hash value</returns>
        public async Task<string> GetPdfHash(Dictionary<string, string> parameters, string template)
        {
            string result = null;

            HttpRequestMessage endpointRequest =
                new HttpRequestMessage(HttpMethod.Post, BaseUri + "/api/pdf/GetHash/" + template);

            string jsonString = JsonConvert.SerializeObject(parameters);
            StringContent strContent = new StringContent(jsonString, Encoding.UTF8);
            strContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
            endpointRequest.Content = strContent;

            // make the request.
            var response = await _client.SendAsync(endpointRequest);
            var _statusCode = response.StatusCode;

            if (_statusCode == HttpStatusCode.OK)
            {
                var json = await response.Content.ReadAsStringAsync();
                var dict = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);
                result = dict["hash"];
            }
            else
            {
                throw new Exception("PDF service did not return OK result.");
            }

            return result;
        }

        /// <summary>
        /// GetToken
        /// </summary>
        /// <param name="secret"></param>
        /// <returns></returns>
        public async Task<string> GetToken(string secret)
        {
            string result = null;
            HttpRequestMessage endpointRequest =
                new HttpRequestMessage(HttpMethod.Get, BaseUri + "/api/authentication/token/" + HttpUtility.UrlEncode(secret));

            // make the request.
            try
            {
                var response = await _client.SendAsync(endpointRequest);
                HttpStatusCode _statusCode = response.StatusCode;

                if (_statusCode == HttpStatusCode.OK)
                {
                    result = await response.Content.ReadAsStringAsync();
                }
            }
            catch (Exception)
            {
                // ignore the authentication issue.
                result = null;
            }

            return result;

        }
    }
}
