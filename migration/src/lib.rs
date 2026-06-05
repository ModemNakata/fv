pub use sea_orm_migration::prelude::*;

mod m20260605_131004_users;
mod m20260605_131007_content;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20260605_131004_users::Migration),
            Box::new(m20260605_131007_content::Migration),
        ]
    }
}
