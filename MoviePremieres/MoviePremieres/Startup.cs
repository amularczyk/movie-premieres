using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.CosmosDBRepositories;
using MoviePremieres.Domain;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Services;
using MoviePremieres.EFRepositories;
using MoviePremieres.ListRepositories;
using MoviePremieres.StorageTableRepositories;

namespace MoviePremieres
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile("appsettings.local.json", true, true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddOptions();

            RegisterServices(services);
            RegisterRepositories(services);
            RegisterMappings();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        private void RegisterMappings()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.AddProfile<CosmosDBRepositories.Mappers.MovieProfile>();
                cfg.AddProfile<StorageTableRepositories.Mappers.MovieProfile>();
            });
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddTransient<IMoviesService, MoviesService>();
        }

        private void RegisterRepositories(IServiceCollection services)
        {
            services.RegisterListRepositories();
            //services.RegisterEFRepositories(Configuration);
            //services.RegisterAzureStorageRepositories(Configuration);
            //services.RegisterAzureCosmosDBRepositories(Configuration);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer("start");
                }
            });

            app.SeedData();
        }
    }
}