import { MigrationInterface, QueryRunner } from 'typeorm';

export class script1621442710719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO todo(priority, content, isCompleted) VALUES ('1', 'test content', TRUE)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM test.todo WHERE content='test content'`,
    );
  }
}
