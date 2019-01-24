using System.Reflection;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MoviePremieres.CosmosDBRepositories.Profiles;
using MoviePremieres.Domain;
using MoviePremieres.Domain.Services;
using MoviePremieres.Filters;
using MoviePremieres.ListRepositories;
using MoviePremieres.Cache;
using MoviePremieres.Domain.Services.Interfaces;

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
            services.AddAutoMapper(GetAssembliesForAutoMapper());

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
        }

        private static Assembly[] GetAssembliesForAutoMapper()
        {
            return new[]
            {
                typeof(ListRepositories.StartupConfiguration).GetTypeInfo().Assembly,
                typeof(StorageTableRepositories.StartupConfiguration).GetTypeInfo().Assembly
            };
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

            services.RegisterAzureRedisCache(Configuration);
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