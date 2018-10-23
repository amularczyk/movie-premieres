using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.CosmosDBRepositories.Mappers;
using MoviePremieres.Domain;
using MoviePremieres.Domain.Interfaces;
using MoviePremieres.Domain.Services;
using MoviePremieres.Filters;
using MoviePremieres.ListRepositories;

namespace MoviePremieres
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => { options.Filters.Add(new GlobalExceptionFilter()); })
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

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
                cfg.AddProfile<MovieProfile>();
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