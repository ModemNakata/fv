use actix_web::{HttpResponse, get};
use serde::Serialize;

#[derive(Serialize)]
pub struct AuthCheckResponse {
    pub authed: bool,
}

#[get("/auth/check")]
pub async fn auth_check() -> HttpResponse {
    HttpResponse::Ok().json(AuthCheckResponse { authed: false })
}
