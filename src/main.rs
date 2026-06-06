use actix_session::{SessionMiddleware, storage::CookieSessionStore};
use actix_web::{App, HttpServer, cookie::Key, middleware, web};
use sea_orm::{Database, DatabaseConnection};
use std::env;

mod auth;
mod entity;

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
            .service(auth::auth_check)
            .service(auth::sign_up)
            .service(auth::sign_in)
            .wrap(SessionMiddleware::new(
                CookieSessionStore::default(),
                Key::generate(),
            ))
            .wrap(middleware::Logger::default())
    })
    .bind(("0.0.0.0", 9291))?
    .run()
    .await
}
