namespace WebAPIApplication
{
    public class Auth0Settings
    {
        public const string SectionKey = "auth0";
        public string Domain { get; set; }
        public string ClientId { get; set; }
        public string ClientSecret { get; set; }
    }
}
