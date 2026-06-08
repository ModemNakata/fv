use actix_web::web;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .service(super::auth::auth_check)
            .service(super::auth::sign_up)
            .service(super::auth::sign_in)
            .service(super::auth::sign_out),
    );
}
