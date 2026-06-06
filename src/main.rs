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

    let session_key = match env::var("SESSION_SECRET") {
        Ok(hex_key) => {
            let bytes = hex::decode(hex_key.trim())
                .expect("SESSION_SECRET must be a valid hex string");
            Key::from(&bytes)
        }
        Err(_) => {
            log::warn!("SESSION_SECRET not set, using ephemeral key (sessions will invalidate on restart)");
            Key::generate()
        }
    };

    log::info!("starting HTTP server");

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .service(auth::auth_check)
            .service(auth::sign_up)
            .service(auth::sign_in)
            .service(auth::sign_out)
            .wrap(SessionMiddleware::new(
                CookieSessionStore::default(),
                session_key.clone(),
            ))
            .wrap(middleware::Logger::default())
    })
    .bind(("0.0.0.0", 9291))?
    .run()
    .await
}
