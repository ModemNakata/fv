use actix_web::{App, HttpResponse, HttpServer, get, middleware, web};
use sea_orm::{ConnectionTrait, Database, DatabaseConnection, DbBackend, Statement};
use serde::Serialize;
use std::env;
use std::time::Instant;

#[derive(Debug, Clone)]
struct AppState {
    conn: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    dotenvy::dotenv().ok();
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL is not set in .env file");

    let conn = Database::connect(&db_url).await.unwrap();

    let state = AppState { conn };

    log::info!("starting HTTP server");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .wrap(middleware::Logger::default())
    })
    .bind(("0.0.0.0", 9291))?
    .run()
    .await
}
